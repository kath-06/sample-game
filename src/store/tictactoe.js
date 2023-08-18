import { defineStore } from 'pinia'
import { getDatabase, ref as dbRef, onValue, set, update, child } from 'firebase/database'
import { firebaseApp } from '~/firebase/firebase.init'

const tictactoeDB = getDatabase(firebaseApp)

export const useTictactoeStore = defineStore('tictactoeStore', {
  state: () => {
    return {
      squares: [],
      shapes: [],
      shape: {},
      addResponse: '',
      editResponse: '',
      removeResponse: '',
      dateToday: new Date()
    }
  },
  getters: {
    getSquares: (state) => state.squares,
    getShapes: (state) => state.shapes,
    getShape: (state) => state.shape,
    getAddResponse: (state) => state.addResponse,
    getEditResponse: (state) => state.editResponse,
    getRemoveResponse: (state) => state.removeResponse
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
        id: shapeId,
        shapeName: shape.name,
        shape: shape.character,
        shapeColor: shape.color,
        userReference: '',
        dateCreated: this.dateToday.toDateString(),
        dateModified: this.dateToday.toDateString()
      }).then(() => {
        this.addResponse = 'success'
      }).catch((error) => {
        console.log(error)
        this.addResponse = 'error'
      });
    },
    getShapeData(shapeId) {
      const shapeRef = dbRef(tictactoeDB, `tictactoe_shapes/${shapeId}`)

      onValue(shapeRef, (snapshot) => {
        this.shape = snapshot.val()
      })
    },
    updateShape(shapeId, shape) {
      update(dbRef(tictactoeDB, `tictactoe_shapes/${shapeId}`), {
        shapeName: shape.name,
        shape: shape.character,
        shapeColor: shape.color,
        dateModified: this.dateToday.toDateString()
      }).then(() => {
        this.editResponse = 'success'
      }).catch((error) => {
        console.log(error)
        this.editResponse = 'error'
      });
    },
    removeShape(shapeId) {
      remove(dbRef(tictactoeDB, `tictactoe_shapes/${shapeId}`))
        .then(() => {
          this.removeResponse = 'success'
        }).catch((error) => {
          console.log(error)
          this.removeResponse = 'error'
        });
    }
  }
})