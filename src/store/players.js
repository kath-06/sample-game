import { defineStore } from 'pinia'
import { getDatabase, ref as dbRef, onValue, set, update, remove } from 'firebase/database'
import { firebaseApp } from '~/firebase/firebase.init'

const tictactoeDB = getDatabase(firebaseApp)

export const usePlayerStore = defineStore('playerStore', {
  state: () => {
    return {
      addResponse: '',
      dateToday: new Date(),
      players: [],
      player: {},
      editResponse: ''
    }
  },
  getters: {
    getAddResponse: (state) => state.addResponse,
    getPlayers: (state) => state.players,
    getPlayer: (state) => state.player,
    getEditResponse: (state) => state.editResponse
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
    },
    getPlayerData(playerId) {
      const playerRef = dbRef(tictactoeDB, `tictactoe_players/${playerId}`)

      onValue(playerRef, (snapshot) => {
        this.player = snapshot.val()
      })
    },
    updatePlayer(playerId, player) {
      update(dbRef(tictactoeDB, `tictactoe_players/${playerId}`), {
        playerName: player.name,
        shapeReference: player.shape,
        dateModified: this.dateToday.toDateString()
      }).then(() => {
        this.editResponse = 'success'
      }).catch((error) => {
        console.log(error)
        this.editResponse = 'error'
      });
    },
  }
})