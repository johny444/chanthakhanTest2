<template>
  <v-btn
    @click="onDel()"
    :ripple="false"
    variant="text"
    density="compact"
    icon="fa-solid fa-plus"
    size="medium"
  >
    <v-icon style="color: red" icon="fa-regular fa-trash-can" />
    <v-tooltip activator="parent" location="start">
      {{ $t("delete") }}
    </v-tooltip>
  </v-btn>
</template>
  
  <script>
export default {
  props: ["item"],
  emits: ["Delclass"],
  data() {
    return {
      crudStore: useCrudStore(),
      AlertStore: useAlertStore2(),
      loadingStore: useLoadingStore(),
    };
  },
  methods: {
    async onDel() {
      console.log("this props", this.item);
      this.AlertStore.openAlert("Q", this.$t("areYouSureToDelete")) // Open confirmation alert
        .then(async (res) => {
          this.loadingStore.openLoading(); // Open loading indicator

          let result = await this.crudStore.deleteUser(this.item); // Use deleteUser method
          console.log("rs", result);
          if (result.status == "204") {
            console.log("Emit");
            this.AlertStore.openAlert("S", this.$t("deleteDataSuccess")) // Success alert
              .then(async (r) => {
                this.$emit("Delclass", "Deled"); // Emit event
                console.log("Delclass success");
                this.loadingStore.closeLoading(); // Close loading
              });
          } else {
            this.loadingStore.closeLoading(); // Close loading if error
            this.AlertStore.openAlert("E", result.message); // Error alert
          }
        })
        .catch((err) => {
          console.log("Error:", err);
        });
    },
  },
};
</script>
    
  <style lang="scss" scoped></style>
  