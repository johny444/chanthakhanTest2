<template>
  <v-container class="profile-container">
    <v-row no-gutters>
      <v-col align="end" cols="9">
        <v-avatar :image="user.avatar" size="120"></v-avatar>
      </v-col>
      <v-col align="end">
        <v-icon
          class="px-3"
          style="font-size: 20px"
          color="white"
          @click.stop="$emit('toggle-rail')"
          >fa-solid fa-circle-chevron-left</v-icon
        >
      </v-col>
    </v-row>
    <v-col class="d-flex flex-column align-center">
      <h3 class="text-center">{{ $t("info") }}</h3>
      <div>
        <p>{{ $t("name") }}: {{ user.first_name }}</p>
        <p>{{ $t("last name") }}: {{ user.last_name }}</p>
        <p>{{ $t("email") }}: {{ user.email }}</p>
        <!-- <p>{{ $t("birthday") }}: {{ user.birthday }}</p> -->
      </div>
    </v-col>
    <v-card-actions>
      <v-btn block @click="logout" class="bg-pink-darken-1">
        {{ $t("logOut") }}
      </v-btn>
    </v-card-actions>
  </v-container>
</template>

<script>
import { useCrudStore } from "@/stores/crudStore";
export default {
  name: "profile",
  data() {
    return {
      storeUser: useUserStore(),
      storeCRUD: useCrudStore(),
      user: {}, // Initialize user as an empty string or adjust as needed
    };
  },
  methods: {
    async getUserInfo(id) {
      await this.storeCRUD.getUserInfor(id);
      this.user = this.storeCRUD.user;
      console.log("user", this.user);
    },

    logout() {
      this.storeUser.logOut();
      try {
        this.$router.push("/");
      } catch (error) {
        console.error("Error during logout redirect:", error);
      }
    },
  },
  mounted() {
    this.getUserInfo(1);
  },
};
</script>


<style  scoped>
.profile-container {
  box-shadow: rgba(143, 140, 140, 0.56) 0px 22px 70px 4px;
}
</style>
