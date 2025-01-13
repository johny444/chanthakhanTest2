// @ts-ignore
import { defineStore } from "pinia";
import axios from "axios";
import { ref } from "vue";

export const useCrudStore = defineStore("TodoStore", {
  state: () => ({
    userList: ref([]),
  }),
  getters: {},
  actions: {
    async getUserList() {
      try {
        const response = await axios.get("https://reqres.in/api/users?page=1");
        this.userList = response.data.data;
        console.log("User List fetched:", this.userList);
      } catch (error) {
        console.error("Error fetching user list:", error);
      }
    },

    async updateUser(userId: any, updatedData: any) {
      try {
        const response = await axios.put(
          `https://reqres.in/api/users/${userId}`,
          updatedData
        );
        console.log("User updated successfully:", response.data);
        // Update the local userList if necessary
        const index = this.userList.findIndex((user) => user.id === userId);
        if (index !== -1) {
          this.userList[index] = { ...this.userList[index], ...updatedData };
        }
      } catch (error) {
        console.error("Error updating user:", error);
      }
    },

    async deleteUser(userId: any) {
      try {
        await axios.delete(`https://reqres.in/api/users/${userId}`);
        console.log(`User with ID ${userId} deleted successfully.`);
        this.userList = this.userList.filter((user) => user.id !== userId);
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    },
  },
});
