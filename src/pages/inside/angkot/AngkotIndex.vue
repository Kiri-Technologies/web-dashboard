<template>
  <div class="p-5 flex justify-center" v-if="isLoading">
    <button class="btn bg-transparent loading text-black border-none">
      Loading data...
    </button>
  </div>
  <section class="mt-4" v-else>
    <section class="flex justify-center">
      <side-to-side-stat title1="Total Semua Angkot Terdaftar" title2="Total Angkot Mendaftar Bulan Ini"
        :data1="totalAngkotTerdaftar" :data2="totalAngkotMendaftarBulanIni"></side-to-side-stat>
    </section>
    <section class="flex justify-center mt-4">
      <card class="shadow-lg w-11/12">
        <card-body>
          <base-bread-crumb :crumbs="crumbs"></base-bread-crumb>
          <p>
            <menu-title :path="{ path: '/' }">
              <template v-slot:default> Angkot </template>
              <template v-slot:menuName> List Angkot yang Tersedia </template>
            </menu-title>
          </p>

          <base-alert v-if="alert.turn" :mode="alert.mode" :message="alert.message"></base-alert>

          <div class="overflow-x-auto mt-2">
            <angkot-data-table :entries="allAngkot"></angkot-data-table>
          </div>
        </card-body>
      </card>
    </section>
  </section>
</template>

<script>
import AngkotDataTable from '../../../components/molecules/datatable/AngkotDataTable.vue';
export default {
  components: {
    AngkotDataTable,
  },
  data() {
    return {
      allAngkot: [],
      isLoading: false,
      totalAngkotMendaftarBulanIni: 0,
      totalAngkotTerdaftar: 0,
      alert: {
        turn: false,
        mode: "",
        message: "",
      },
      crumbs: [
        {
          title: "Angkot",
          link: {
            path: "/angkot",
          },
        },
      ],
    };
  },
  methods: {
    async getAllAngkot() {
      try {
        await this.$store.dispatch("angkot/getAllAngkot");
        this.allAngkot = this.$store.getters["angkot/getAllAngkot"];
      } catch (error) {
        // call turnonalert function to turn on alert
        this.turnOnAlert(error.message, true);
      }
    },
    async getTotalAngkotMendaftarBulanIni() {
      try {
        await this.$store.dispatch("chart/getTotalAngkotMendaftarBulanIni");
        this.totalAngkotMendaftarBulanIni =
          this.$store.getters["chart/getTotalAngkotMendaftarBulanIni"];
      } catch (error) {
        this.turnOnAlert(error.message, false);
      }
    },
    async getTotalAngkotTerdaftar() {
      try {
        await this.$store.dispatch("chart/getTotalAngkotTerdaftar");
        this.totalAngkotTerdaftar =
          this.$store.getters["chart/getTotalAngkotTerdaftar"];
      } catch (error) {
        this.turnOnAlert(error.message, false);
      }
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
    },
  },
  async created() {
    this.isLoading = true;
    try {
      await this.getAllAngkot();
      await this.getTotalAngkotMendaftarBulanIni();
      await this.getTotalAngkotTerdaftar();
    } catch (error) {
      console.log(error.message);
    }
    this.isLoading = false;
  },
};
</script>

<style scoped>
.text-kiri-green {
  color: #39ac00;
}
</style>