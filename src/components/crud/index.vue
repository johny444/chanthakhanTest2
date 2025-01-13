<template>
  <v-container class="bg-green">
    <v-row>
      <v-col style="text-align: center">
        <h2>USER MANAGEMENT SYSTEM</h2>
      </v-col>
    </v-row>
    <v-table>
      <thead>
        <tr>
          <th>{{ $t("rowNum") }}</th>
          <th>{{ $t("FULLNAME") }}</th>
          <th>{{ $t("CONTRACTNO") }}</th>
          <th>{{ $t("DURATION") }}</th>
          <th>{{ $t("STARTDATE") }}</th>
          <th>{{ $t("ENDDATE") }}</th>
          <th>{{ $t("POSITION") }}</th>
          <th>{{ $t("DEPARTMENT") }}</th>
        </tr>
      </thead>
      <tbody>
        <template v-if="paginatedData.length > 0">
          <tr v-for="(item, i) in paginatedData" :key="item.name">
            <td width="2%" align="center">
              {{ (currentPage - 1) * perPage + i + 1 }}
            </td>
            <td width="15%">{{ item.EMPNAME }}</td>
            <td width="5%" align="center">{{ item.CONTRACTNO }}</td>
            <td width="5%" align="center">{{ item.DURATION }}</td>
            <td width="5%" align="center">
              {{ formatDateShow(item.STARTDATE) }}
            </td>
            <td width="5%" align="center">
              {{ item.ENDDATE ? formatDateShow(item.ENDDATE) : "-" }}
            </td>
            <td width="10%">{{ item.POSITION }}</td>
            <td width="20%">{{ item.DEP }}</td>
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
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      tableData: [], // Complete data from the API
      perPage: 10, // Number of rows per page
      currentPage: 1, // Current page
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
      return Math.ceil(this.tableData.length / this.perPage); // Calculate total pages
    },
    paginatedData() {
      if (!this.tableData) return []; // Handle undefined tableData
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
      // this.tableData = this.storeCRUD.userList;
      // console.log("tableData:", this.tableData);
      // this.total = this.storeCRUD.userList.length;
    },

    onSubmit() {
      console.log("start", this.formatDate(this.startDate));
      console.log("start", this.formatDate(this.endDate));

      let period = {
        start: this.formatDate(this.startDate),
        end: this.formatDate(this.endDate),
      };

      // console.log("date:", period);
      this.getList(period);
    },
  },
  async mounted() {
    this.loadingStore.openLoading();
    await this.getList(); // Updated to fetch data directly
    this.loadingStore.closeLoading();
  },
};
</script>

<style lang="scss" scoped>
</style>