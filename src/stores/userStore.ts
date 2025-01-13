// @ts-ignore
import { defineStore } from "pinia";
import axios from "axios";
export const useUserStore = defineStore("userStore", {
  state: () => ({
    user: ref([]),
    islogin: ref(false),
  }),
  getters: {
    getuserList: (state) => state.user,
    getLoginState: (state) => state.islogin,
  },
  actions: {
    async logIn(payload) {
      try {
        const response = await axios.post(
          "https://reqres.in/api/login",
          payload
        );
        if (response && response.data) {
          this.user = response.data; // Update user data on success
          this.islogin = true; // Set login state to true
          localStorage.setItem("token", response.data.token); // Save token in localStorage
          console.log("Login successful:", response.data);
        }
      } catch (error) {
        console.error("Error during login:", error);
        this.user = {}; // Clear user state on error
        this.islogin = false; // Reset login state
      }
    },
    aclogOut() {
      this.user = {}; // Clear user data
      this.islogin = false; // Reset login state
      localStorage.removeItem("token"); // Remove token from localStorage
      console.log("User logged out");
    },
  },
});
