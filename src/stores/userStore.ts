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
          this.user = response.data;
          this.islogin = true;
          localStorage.setItem("token", response.data.token);
          console.log("Login successful:", response.data);
        }
      } catch (error) {
        console.error("Error during login:", error);
        this.user = {};
        this.islogin = false;
      }
    },
    async register(payload: any) {
      try {
        const response = await axios.post(
          "https://reqres.in/api/register",
          payload
        );
        if (response && response.data) {
          this.user = response.data;
          console.log("Registration successful:", response.data);
        }
      } catch (error) {
        console.error("Error during registration:", error);
        this.user = {};
      }
    },
    logOut() {
      this.user = {};
      this.islogin = false;
      localStorage.removeItem("token");
      console.log("User logged out");
    },
  },
});
