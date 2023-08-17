import { defineStore } from 'pinia'
import { getDatabase, ref as dbRef, onValue, set } from 'firebase/database'
import { firebaseApp } from '~/firebase/firebase.init'

const tictactoeDB = getDatabase(firebaseApp)

export const useTictactoeStore = defineStore('tictactoeStore', {
  state: () => {
    return {
      squares: [],
      shapes: [],
      addResponse: '',
      dateToday: new Date()
    }
  },
  getters: {
    getSquares: (state) => state.squares,
    getShapes: (state) => state.shapes,
    getAddResponse: (state) => state.addResponse
  },
  actions: {
    setSquares(squareCount, squareClass, squareText) {
      this.squares = []
      for (let i = 0; i < squareCount; i++) {
        this.squares.push({ keyIndex: i, text: squareText, class: squareClass })
      }
    },
    getShapeList() {
      const shapeRef = dbRef(tictactoeDB, 'tictactoe_shapes')

      onValue(shapeRef, (snapshot) => {
        this.shapes = snapshot.val()
      });
    },
    setShapes(shapeId, shape) {
      set(dbRef(tictactoeDB, 'tictactoe_shapes/' + shapeId), {
        shapeName: shape.name,
        shape: shape.character,
        shapeColor: shape.color,
        userReference: '',
        dateCreated: this.dateToday.toDateString(),
        dateModified: this.dateToday.toDateString()
      })
        .then(() => {
          this.addResponse = 'success'
        })
        .catch((error) => {
          console.log(error)
          this.addResponse = 'error'
        });
    }
  }
})