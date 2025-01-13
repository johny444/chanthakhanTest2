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
              label="Confirm Password"
              variant="outlined"
              density="comfortable"
              v-model="txtUserpasswordCF"
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
import { useUserStore } from "@/stores/userStore";
import { ref } from "vue";

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
      alterStore: useAlertStore(),
      userStore: useUserStore(),
    };
  },
  methods: {
    async onRegister() {
      if (this.txtUserpassword !== this.txtUserpasswordCF) {
        console.error("Passwords do not match.");
        this.alterStore.openDialog(
          "E",
          "Passwords do not match.Please try again"
        );
        setTimeout(() => {
          this.alterStore.closeDialog();
        }, 2000);
        return;
      }
      const payload = {
        email: this.txtUserEmail,
        password: this.txtUserpassword,
      };
      await this.userStore.register(payload);
      this.alterStore.openDialog("S", "Registor successful");
      setTimeout(() => {
        this.alterStore.closeDialog();
      }, 2000);
      this.$router.push("/");
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
    