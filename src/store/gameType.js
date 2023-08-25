import { defineStore } from 'pinia'
import { getDatabase, ref as dbRef, onValue, set, update, remove } from 'firebase/database'
import { firebaseApp } from '~/firebase/firebase.init'

const tictactoeDB = getDatabase(firebaseApp)

export const useGameTypeStore = defineStore('gameTypeStore', {
  state: () => {
    return {
      addResponse: '',
      dateToday: new Date(),
      gameTypes: [],
      gameType: {},
      editResponse: '',
      removeResponse: ''
    }
  },
  getters: {
    getAddResponse: (state) => state.addResponse,
    getGameTypes: (state) => state.gameTypes,
    getGameType: (state) => state.gameType,
    getEditResponse: (state) => state.editResponse,
    getRemoveResponse: (state) => state.removeResponse
  },
  actions: {
    setGameTypes(gameTypeId, gameType) {
      set(dbRef(tictactoeDB, 'tictactoe_game_types/' + gameTypeId), {
        id: gameTypeId,
        typeName: gameType.name,
        type: gameType.type,
        rows: gameType.rows,
        columns: gameType.columns,
        fillCount: gameType.fillCount,
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
    getGameTypeList() {
      const gameTypeRef = dbRef(tictactoeDB, 'tictactoe_game_types')

      onValue(gameTypeRef, (snapshot) => {
        this.gameTypes = snapshot.val()
      });
    },
    getGameTypeData(gameTypeId) {
      const gameTypeRef = dbRef(tictactoeDB, `tictactoe_game_types/${gameTypeId}`)

      onValue(gameTypeRef, (snapshot) => {
        this.gameType = snapshot.val()
      })
    },
    updateGameType(gameTypeId, gameType) {
      update(dbRef(tictactoeDB, `tictactoe_game_types/${gameTypeId}`), {
        typeName: gameType.name,
        type: gameType.type,
        rows: gameType.rows,
        columns: gameType.columns,
        dateModified: this.dateToday.toDateString()
      }).then(() => {
        this.editResponse = 'success'
      }).catch((error) => {
        console.log(error)
        this.editResponse = 'error'
      });
    },
    removeGameType(gameTypeId) {
      remove(dbRef(tictactoeDB, 'tictactoe_game_types/' + gameTypeId))
        .then(() => {
          this.removeResponse = 'success'
        }).catch((error) => {
          console.log(error)
          this.removeResponse = 'error'
        });
    }
  }
})