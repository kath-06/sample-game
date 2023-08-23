import { defineStore } from 'pinia'
import { getDatabase, ref as dbRef, onValue, set, update, remove } from 'firebase/database'
import { firebaseApp } from '~/firebase/firebase.init'

const tictactoeDB = getDatabase(firebaseApp)

export const usePlayerStore = defineStore('playerStore', {
  state: () => {
    return {
      addResponse: '',
      dateToday: new Date(),
      players: []
    }
  },
  getters: {
    getAddResponse: (state) => state.addResponse,
    getPlayers: (state) => state.players
  },
  actions: {
    setPlayers(playerId, player) {
      set(dbRef(tictactoeDB, 'tictactoe_players/' + playerId), {
        id: playerId,
        playerName: player.name,
        shapeReference: player.shape,
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
    getPlayerList() {
      const playerRef = dbRef(tictactoeDB, 'tictactoe_players')

      onValue(playerRef, (snapshot) => {
        this.players = snapshot.val()
      });
    }
  }
})