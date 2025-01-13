<template>
  <div class="Todo-container pa-2">
    <v-container class="containerCard pa-6">
      <div>
        <div class="labelPage my-5" align="center">
          <h1>Register page</h1>
        </div>
        <v-form @submit.prevent="onRegister" v-model="form">
          <v-row>
            <v-text-field
              :rules="[required]"
              label="Email"
              variant="outlined"
              density="comfortable"
              v-model="txtUserEmail"
              clearable=""
              prepend-inner-icon="fas fa-user"
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
          <v-row>
            <v-text-field
              :rules="[required]"
              label="Comfirm Password"
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
              :disabled="!form"
              class="ma-2 bg-light-blue-darken-2"
              type="submit"
            >
              Register
            </v-btn>
            <a
              href="/"
              class="font-italic my-4"
              style="text-decoration: underline"
            >
              go to login page
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
      txtUserEmail: "",
      txtUserpassword: "",
      txtUserpasswordCF: "",
      showPw: false,
      required(v) {
        return !!v || "Field is required";
      },
    };
  },
  methods: {
    onRegister() {
      if (this.itemInput.trim()) {
        this.ToDoItems.push({
          id: uuidv4(),
          label: this.itemInput,
          done: false,
        });
        this.itemInput = "";
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
    