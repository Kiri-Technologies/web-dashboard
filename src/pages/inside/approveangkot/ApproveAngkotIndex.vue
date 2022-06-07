<template>
  <div class="p-5 flex justify-center" v-if="isLoading">
    <button class="btn bg-transparent loading text-black border-none">
      Loading data...
    </button>
  </div>
  <section class="flex justify-center mt-4" v-else>
    <card class="shadow-lg w-11/12">
      <card-body>
        <base-bread-crumb :crumbs="crumbs"></base-bread-crumb>
        <p>
          <menu-title :path="{ path: '/' }">
            <template v-slot:default> Approval Angkot </template>
            <template v-slot:menuName>
              Menampilkan list angkot yang akan disetujui untuk beroperasi
            </template>
          </menu-title>
        </p>

        <div class="tabs mt-5">
          <a v-for="tab in tabs" :key="tab" class="tab tab-bordered" :class="{ 'tab-active': currentTab == tab }"
            @click="currentTab = tab">{{ capitalizeFirstLetter(tab) }}</a>
        </div>

        <base-alert v-if="alert.turn" :mode="alert.mode" :message="alert.message"></base-alert>

        <div class="overflow-x-auto mt-4">
          <approve-angkot-data-table :entries="filteredAngkot" :currentTab="currentTab" v-if="currentTab == 'pending'"
            @updateStatusAngkot="updateStatusAngkot"></approve-angkot-data-table>
          <approve-angkot-data-table :entries="filteredAngkot" :currentTab="currentTab" v-if="currentTab == 'approved'">
          </approve-angkot-data-table>
          <approve-angkot-data-table :entries="filteredAngkot" :currentTab="currentTab" v-if="currentTab == 'declined'">
          </approve-angkot-data-table>
        </div>
      </card-body>
    </card>
  </section>
</template>

<script>
import ApproveAngkotDataTable from '../../../components/molecules/datatable/ApproveAngkotDataTable.vue';
export default {
  components: {
    ApproveAngkotDataTable,
  },
  data() {
    return {
      currentTab: "pending",
      tabs: ["pending", "approved", "declined"],
      allAngkot: [],
      isLoading: false,
      alert: {
        turn: false,
        mode: "",
        message: "",
      },
      crumbs: [
        {
          title: "Approve Angkot",
          link: {
            path: "/approveangkot",
          },
        },
      ],
    };
  },
  computed: {
    filteredAngkot() {
      return this.allAngkot.filter((angkot) => {
        return angkot.status == this.currentTab;
      });
    }
  },
  methods: {
    async getAllAngkot() {
      try {
        await this.$store.dispatch("angkot/getAllAngkot");
        this.allAngkot = this.$store.getters["angkot/getAllAngkot"];
      } catch (error) {
        this.turnOnAlert(error.message, false);
      }
    },
    async updateStatusAngkot(message, isSuccess) {
      try {
        await this.getAllAngkot();
        this.turnOnAlert(message, isSuccess)
      } catch (error) {
        this.turnOnAlert(error.message, false);
      }
    },
    capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    },
    turnOnAlert(message, isSucceed) {
      this.alert.turn = true;
      if (isSucceed) {
        this.alert.mode = "success";
        this.alert.message = message;
      } else if (!isSucceed) {
        this.alert.mode = "error";
        this.alert.message = message;
      }
      setTimeout(() => {
        this.alert.turn = false;
      }, 5000);
    },
  },
  async created() {
    this.isLoading = true;
    try {
      await this.getAllAngkot();
    } catch (error) {
      this.turnOnAlert(error.message, false);
    }
    this.isLoading = false;
  },
};
</script>