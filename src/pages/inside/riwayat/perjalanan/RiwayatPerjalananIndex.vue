<template>
  <div class="p-5 flex justify-center" v-if="isLoading">
    <button class="btn bg-transparent loading text-black border-none">
      Loading data...
    </button>
  </div>
  <section class="mt-4" v-else>
    <section class="flex justify-center">
      <side-to-side-stat :title1="'Total Perjalanan Bulan Ini'" :title2="'Total Perjalanan Bulan Lalu'"
        :data1="totalPerjalananBulanIni" :data2="totalPerjalananBulanLalu"></side-to-side-stat>
    </section>
    <section class="flex justify-center mt-4">
      <card class="shadow-lg w-11/12">
        <card-body>
          <base-bread-crumb :crumbs="crumbs"></base-bread-crumb>
          <p>
            <menu-title :path="{ path: '/' }">
              <template v-slot:default> Riwayat Perjalanan </template>
              <template v-slot:menuName>
                Daftar riwayat perjalanan angkot
              </template>
            </menu-title>
          </p>

          <base-alert v-if="alert.turn" :mode="alert.mode" :message="alert.message"></base-alert>

          <div class="overflow-x-auto mt-2">
            <data-table :columns="columns" :entries="filteredPerjalanan"></data-table>
          </div>
        </card-body>
      </card>
    </section>
  </section>
</template>

<script>
import moment from "moment";
export default {
  data() {
    return {
      isLoading: false,
      allPerjalanan: [],
      totalPerjalananBulanIni: 0,
      totalPerjalananBulanLalu: 0,
      columns: [
        {
          name: 'waktu', text: 'waktu'
        },
        {
          name: 'nama_supir', text: 'nama supir'
        },
        {
          name: 'plat_nomor', text: 'plat nomor'
        },
        {
          name: 'penumpang', text: 'penumpang'
        },
        {
          name: 'tempat_naik', text: 'tempat naik'
        },
        {
          name: 'tempat_turun', text: 'tempat turun'
        },
      ],
      alert: {
        turn: false,
        mode: "",
        message: "",
      },
      crumbs: [
        {
          title: "Perjalanan",
          link: {
            path: "/riwayatperjalanan",
          },
        },
      ],
    };
  },
  computed: {
    filteredPerjalanan() {
      return this.allPerjalanan.map(perjalanan => {
        perjalanan.waktu = this.changeDateFormat(perjalanan.created_at);
        perjalanan.nama_supir = perjalanan.user_supir.name;
        perjalanan.plat_nomor =
          perjalanan.vehicle == null
            ? "B 4466 US"
            : perjalanan.vehicle.plat_nomor;
        perjalanan.penumpang = perjalanan.user_penumpang.name;
        perjalanan.tempat_naik = perjalanan.nama_tempat_naik;
        perjalanan.tempat_turun = perjalanan.nama_tempat_turun;
        return perjalanan;
      })
    }
  },
  methods: {
    async getAllPerjalanan() {
      try {
        await this.$store.dispatch("perjalanan/getAllPerjalanan");
        this.allPerjalanan = this.$store.getters["perjalanan/getAllPerjalanan"];
      } catch (error) {
        this.errorMessage = error.message;
        this.turnOnAlert("error", false);
      }
    },
    async getTotalPerjalananBulanIni() {
      try {
        await this.$store.dispatch("chart/getTotalPerjalananBulanIni");
        this.totalPerjalananBulanIni = this.$store.getters["chart/getTotalPerjalananBulanIni"];
      } catch (error) {
        console.log(error.message);
      }
    },
    async getTotalPerjalananBulanLalu() {
      try {
        await this.$store.dispatch("chart/getTotalPerjalananBulanLalu");
        this.totalPerjalananBulanLalu = this.$store.getters["chart/getTotalPerjalananBulanLalu"];
      } catch (error) {
        console.log(error.message);
      }
    },
    changeDateFormat(date) {
      return moment(date, "YYYY-MM-DD").format("dddd, DD MMMM YYYY");
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
      await this.getAllPerjalanan();
      await this.getTotalPerjalananBulanIni();
      await this.getTotalPerjalananBulanLalu();
    }catch(error){
      console.log(error.message);
    }
    this.isLoading = false;
  },
};
</script>