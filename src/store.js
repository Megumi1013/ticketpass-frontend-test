import { defineStore } from "pinia"

export const useStore = defineStore("auth", {

  state: () => {
    return {
      isLoggedIn: false,
      accessToken: null,
      refreshToken: null,
    }
  },

  persist: true,

})