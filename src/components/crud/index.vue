<template>
  <v-row no-gutters>
    <v-col cols="2" align-self="center" class="pa-2"> <Profile /></v-col>
    <v-col>
      <v-container class="mt-7">
        <v-row class="my-2">
          <v-col style="text-align: center">
            <h2>USER MANAGEMENT SYSTEM</h2>
          </v-col>
          <v-col>
            <v-text-field
              clearable
              density="comfortable"
              label="Search"
              prepend-inner-icon="fa-solid fa-magnifying-glass"
              variant="outlined"
              v-model="search"
            ></v-text-field>
          </v-col>
        </v-row>

        <v-table>
          <thead>
            <tr>
              <th>{{ $t("rowNum") }}</th>
              <th>{{ $t("NAME") }}</th>
              <th>{{ $t("LASTNAME") }}</th>
              <th>{{ $t("EMAIL") }}</th>
              <th>{{ $t("ACTION") }}</th>
            </tr>
          </thead>
          <tbody>
            <template v-if="paginatedData.length > 0">
              <tr v-for="(item, i) in paginatedData" :key="item.name">
                <td width="2%" align="center">
                  {{ (currentPage - 1) * perPage + i + 1 }}
                </td>
                <td width="5%">{{ item.first_name }}</td>
                <td width="5%" align="center">{{ item.last_name }}</td>
                <td width="5%" align="center">{{ item.email }}</td>
                <td width="5%" align="center">
                  <v-row justify="center" style="margin: 1rem">
                    <Update :data="item" @updateclass="receiveCUD" />
                    <v-spacer></v-spacer>
                    <Del :item="item.id" @Delclass="receiveCUD" />
                  </v-row>
                </td>
              </tr>
            </template>
            <template v-else>
              <td :colspan="9">
                <div style="margin-top: 1rem; text-align: center">
                  <NoData></NoData>
                </div>
              </td>
            </template>
          </tbody>
        </v-table>
        <div class="text-center">
          <v-container class="py-0">
            <v-row justify="center">
              <v-col cols="8">
                <v-container class="max-width">
                  <v-pagination
                    v-model="currentPage"
                    :length="totalPages"
                    rounded="circle"
                  ></v-pagination>
                  <span class="ml-2"
                    >Page {{ currentPage }} of {{ totalPages }}</span
                  >
                </v-container>
              </v-col>
            </v-row>
          </v-container>
        </div>
      </v-container></v-col
    >
  </v-row>
</template>

<script>
import { useCrudStore } from "@/stores/crudStore";
import { useLoadingStore } from "@/stores/loadingStore";
import { ref } from "vue";

export default {
  data() {
    return {
      tableData: [],
      perPage: 10,
      currentPage: 1,
      loading: true,
      storeCRUD: useCrudStore(),
      loadingStore: useLoadingStore(),
      search: "",
      total: 0,
      loading: false,
    };
  },
  computed: {
    filteredData() {
      const searchTerm = this.search.trim().toLowerCase();
      return this.tableData.filter((item) =>
        item.EMPNAME.toLowerCase().includes(searchTerm)
      );
    },
    totalPages() {
      return Math.ceil(this.tableData.length / this.perPage);
    },
    paginatedData() {
      if (!this.tableData) return [];
      const start = (this.currentPage - 1) * this.perPage;
      const end = start + this.perPage;
      return this.tableData.slice(start, end);
    },
    filterItem() {
      return this.paginatedData.filter((item) => {
        return (
          item.EMPNAME.toLowerCase().indexOf(this.search.toLowerCase()) > -1
        );
      });
    },
  },
  methods: {
    async getList() {
      await this.storeCRUD.getUserList();
      this.tableData = this.storeCRUD.userList;
      console.log("table", this.tableData);
    },

    onSubmit() {
      // console.log("start", this.formatDate(this.startDate));
      // console.log("start", this.formatDate(this.endDate));

      // let period = {
      //   start: this.formatDate(this.startDate),
      //   end: this.formatDate(this.endDate),
      // };

      this.getList(period);
    },
  },
  async mounted() {
    this.loadingStore.openLoading();
    await this.getList(); // Fetch data directly
    this.loadingStore.closeLoading();
  },
};
</script>
