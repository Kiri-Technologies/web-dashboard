<template>
  <loading v-if="isLoading"></loading>
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
            <menu-title :path="{ path: '/' }" heading="Angkot" subHeading="List Angkot yang Tersedia"></menu-title>
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
        const angkot = this.$store.getters["angkot/getAllAngkot"];
        this.allAngkot = angkot.filter((angkot) => angkot.status === "approved");
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
    document.title = "List Angkot";
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