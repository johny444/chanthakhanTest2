<template>
  <v-row class="my-5">
    <v-col align="center">
      <h1>Chanthakhan test phase2</h1>
    </v-col>
  </v-row>
  <Login />
</template>

<script>
import Login from "@/components/Login.vue";
import { v4 as uuidv4 } from "uuid";

export default {
  data() {
    return {
      txtUserName: "",
      txtUserpassword: "",
      showPw: false,
    };
  },
  methods: {},
};
</script>

<style scoped>
.Todo-container {
  /* background-color: antiquewhite; */
  min-height: 50vh;
}
</style>
