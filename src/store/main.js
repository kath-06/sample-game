import { defineStore } from 'pinia'

export const useMainStore = defineStore('mainStore', {
    state: () => {
        return {
            loaded: false
        }
    },
    getters: {
        isAppLoaded: () => { return localStorage.getItem('loaded') ? true : false }
    },
    actions: {
        appLoaded () {
            this.loaded = true
            localStorage.setItem('loaded', this.loaded)
        }
    }
})