<template>
  <div>
    <v-dialog v-model="dialog" width="300">
      <template v-slot:activator="{ props }">
        <v-btn
          variant="text"
          :ripple="false"
          density="compact"
          icon="fa-solid fa-plus"
          size="medium"
          v-bind="props"
          @click="onOpen"
        >
          <v-icon
            style="color: rgb(16, 98, 212)"
            icon="fa-solid fa-file-pen"
          ></v-icon>
          <v-tooltip activator="parent" location="start">{{
            $t("edit")
          }}</v-tooltip>
        </v-btn>
      </template>
      <v-card>
        <v-form @submit.prevent="onSubmit">
          <v-card-title align="center" class="bg-light-blue-darken-4">
            <h2>{{ $t("edit user") }}</h2>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-text-field
                :label="$t('user name')"
                :rules="WarningTxT.s"
                class="my-2"
                density="compact"
                variant="outlined"
                v-model="name"
              ></v-text-field>
              <v-text-field
                :rules="WarningTxT.c"
                :label="$t('last name')"
                class="my-2"
                density="compact"
                variant="outlined"
                v-model="lastName"
              ></v-text-field>
            </v-container>
          </v-card-text>
          <v-divider :thickness="2"></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="blue-darken-1"
              variant="tonal"
              type="submit"
              @click="dialog = false"
            >
              <v-icon class="mx-1" icon="fa-regular fa-floppy-disk" />
              {{ $t("save") }}
            </v-btn>
            <v-btn color="red" variant="tonal" @click="dialog = false">
              <v-icon class="mx-1" icon="fa-solid fa-xmark" />
              {{ $t("cancel") }}
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: ["data"],
  emit: ["updateclass"],
  data() {
    return {
      loadingStore: useLoadingStore(),
      AlertStore: useAlertStore2(),
      crudStore: useCrudStore(),
      dialog: false,
      name: "",
      lastName: "",
      WarningTxT: {
        s: [
          (v) => {
            if (v) {
              return true;
            }
            return this.$t("pleaseEntersubject");
          },
        ],
        c: [
          (v) => {
            if (v) {
              return true;
            }
            return this.$t("pleaseEnterclass");
          },
        ],
      },
    };
  },
  methods: {
    onOpen() {
      console.log("user", this.data);
      this.name = this.data.subjectExam;
      this.lastName = this.data.classExam;
    },
    async onSubmit() {
      let body = {
        id: this.data.id,
        subjectExam: this.name,
        classExam: this.lastName,
        status: this.data.status,
        time: this.getTime(),
        teacherID: this.data.teacherID,
        ACTION: "UPDATE",
      };

      console.log("body", body);
      this.loadingStore.openLoading();
      var result = await this.crudStore.updateUser(this.data.id, body);
      // Handling the response
      if (result.status == "200") {
        console.log("result", result);
        this.AlertStore.openAlert("S", this.$t("updateDataSuccess")).then(
          () => {
            this.loadingStore.closeLoading();
            this.$emit("updateclass", "updated");
          }
        );
      } else {
        this.loadingStore.closeLoading();
        this.AlertStore.openAlert("E", result.status);
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
