<template>
  <div class="Todo-container pa-2">
    <v-container class="containerCard pa-6">
      <div>
        <div class="labelPage my-5" align="center">
          <h1>Login page</h1>
        </div>
        <v-form @submit.prevent="onLogin" v-model="form">
          <v-row>
            <v-text-field
              label="Email"
              variant="outlined"
              density="comfortable"
              v-model="txtUserEmail"
              clearable=""
              prepend-inner-icon="fas fa-user"
              :rules="[required]"
            ></v-text-field>
          </v-row>
          <v-row>
            <v-text-field
              :rules="[required]"
              label="Password"
              variant="outlined"
              density="comfortable"
              v-model="txtUserpassword"
              clearable=""
              prepend-inner-icon="fas fa-unlock"
              :append-inner-icon="showPw ? 'fas fa-eye' : 'fas fa-eye-slash'"
              :type="showPw ? 'text' : 'password'"
              @click:append-inner="showPw = !showPw"
            ></v-text-field>
          </v-row>
          <div class="btnAction d-flex flex-row-reverse">
            <v-btn
              class="ma-2 bg-teal-darken-1"
              type="submit"
              :disabled="!form"
            >
              Login
            </v-btn>
            <a
              href="/register"
              class="font-italic my-4"
              style="text-decoration: underline"
            >
              Registor now
            </a>
          </div>
        </v-form>
      </div>
    </v-container>
  </div>
</template>
  
  <script>
import { v4 as uuidv4 } from "uuid";

export default {
  data() {
    return {
      form: false,
      txtUserEmail: "eve.holt@reqres.in",
      txtUserpassword: "cityslicka",
      showPw: false,
      userStore: useUserStore(),
      required(v) {
        return !!v || "Field is required";
      },
      alterStore: useAlertStore(),
    };
  },
  methods: {
    async onLogin() {
      // Validate input fields
      if (!this.txtUserEmail || !this.txtUserpassword) {
        alert("Please enter both email and password.");
        return;
      }

      // Prepare request payload
      const body = {
        email: this.txtUserEmail, // Adjusted to match the API's expected payload
        password: this.txtUserpassword,
      };

      // Call the login action
      try {
        await this.userStore.logIn(body);

        // Check login status from the store
        if (this.userStore.islogin) {
          console.log("Login successful:", this.userStore.user);
          this.alterStore.openDialog("S", "Login successful");
          setTimeout(() => {
            this.alterStore.closeDialog();
          }, 2000);
          this.$router.push("/crud");
          // Redirect or perform additional actions after successful login
        } else {
          // alert("Login failed. Please check your credentials.")
          this.alterStore.openDialog(
            "E",
            "Login failed. Please check your credentials."
          );
          setTimeout(() => {
            this.alterStore.closeDialog();
          }, 2000);
        }
      } catch (error) {
        console.error("Error during login:", error);

        this.alterStore.openDialog(
          "E",
          "An error occurred. Please try again later."
        );
        setTimeout(() => {
          this.alterStore.closeDialog();
        }, 2000);
      }
    },

    toggleTaskStatus(itemID) {
      const task = this.ToDoItems.find((item) => item.id === itemID);
      console.log("task before", task);
      if (task) {
        task.done = !task.done;
        console.log("task after", task);
      }
    },
    deleteTask(itemID) {
      this.ToDoItems = this.ToDoItems.filter((item) => item.id !== itemID);
    },
  },
};
</script>
  
  <style scoped>
.labelPage {
  /* background-color: red; */
  min-height: 30vh;
  max-width: 50vw;
}
.containerCard {
  background-color: white;
  max-width: 30vw;
  min-height: 30vh;
  box-shadow: rgba(0, 0, 0, 0.56) 0px 22px 70px 4px;
}
.Todo-container {
  /* background-color: antiquewhite; */
  min-height: 70vh;
}
</style>
  