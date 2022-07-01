<template>
  <loading v-if="isLoading"></loading>
  <section class="mt-4" v-else>
    <section class="flex justify-center">
      <side-to-side-stat title1="Total Pendapatan Bulan Ini" title2="Total Pendapatan Bulan Kemarin"
        :data1="rupiahFormat(totalPendapatanBulanIni)" :data2="rupiahFormat(totalPendapatanBulanLalu)">
      </side-to-side-stat>
    </section>
    <section class="flex justify-center mt-4">
      <card class="shadow-lg w-11/12">
        <card-body>
          <base-bread-crumb :crumbs="crumbs"></base-bread-crumb>
          <p>
            <menu-title :path="{ path: '/' }">
              <template v-slot:default> Riwayat Pendapatan </template>
              <template v-slot:menuName>
                Daftar pendapatan yang telah dicatat
              </template>
            </menu-title>
          </p>

          <base-alert v-if="alert.turn" :mode="alert.mode" :message="alert.message"></base-alert>

          <div class="overflow-x-auto mt-2">
            <data-table :columns="columns" :entries="filteredListRiwayatSupirNarik"></data-table>
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
      listRiwayatSupirNarik: [],
      totalPendapatanBulanIni: 0,
      totalPendapatanBulanLalu: 0,
      columns: [
        {
          name: 'waktu', text: 'waktu'
        },
        {
          name: 'trayek', text: 'trayek'
        },
        {
          name: 'plat_nomor', text: 'plat nomor'
        },
        {
          name: 'nama_supir', text: 'nama supir'
        },
        {
          name: 'jumlah_pendapatan', text: 'jumlah pendapatan'
        },
      ],
      alert: {
        turn: false,
        mode: "",
        message: "",
      },
      crumbs: [
        {
          title: "Pendapatan",
          link: {
            path: "/riwayatpendapatan",
          },
        },
      ],
    };
  },
  computed: {
    filteredListRiwayatSupirNarik() {
      return this.listRiwayatSupirNarik.map(ls => {
        ls.waktu = this.changeDateFormat(ls.created_at);
        ls.trayek = ls.vehicle == null
          ? "Kebayoran - Ciputat"
          : ls.vehicle.route.titik_awal + " - " + ls.vehicle.route.titik_akhir;
        ls.plat_nomor = ls.vehicle == null ? "B 4433 US" : ls.vehicle.plat_nomor;
        ls.nama_supir = ls.supir.name;
        ls.jumlah_pendapatan = this.rupiahFormat(ls.jumlah_pendapatan);
        return ls;
      })
    }
  },
  methods: {
    async getAllRiwayatSupirNarik() {
      try {
        await this.$store.dispatch("riwayatSupirNarik/getAllRiwayatSupirNarik");
        this.listRiwayatSupirNarik =
          this.$store.getters["riwayatSupirNarik/getAllRiwayatSupirNarik"];
      } catch (error) {
        this.turnOnAlert(error.message, false);
      }
    },
    async getTotalPendapatanBulanIni() {
      try {
        await this.$store.dispatch("chart/getTotalPendapatanBulanIni");
        this.totalPendapatanBulanIni =
          this.$store.getters["chart/getTotalPendapatanBulanIni"];
      } catch (error) {
        this.turnOnAlert(error.message, false);
      }
    },
    async getTotalPendapatanBulanLalu() {
      try {
        await this.$store.dispatch("chart/getTotalPendapatanBulanLalu");
        this.totalPendapatanBulanLalu =
          this.$store.getters["chart/getTotalPendapatanBulanLalu"];
      } catch (error) {
        this.turnOnAlert(error.message, false);
      }
    },
    changeDateFormat(date) {
      return moment(date, "YYYY-MM-DD").format("dddd, DD MMMM YYYY");
    },
    rupiahFormat(number) {
      return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
      }).format(number);
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
      await this.getAllRiwayatSupirNarik();
      await this.getTotalPendapatanBulanIni();
      await this.getTotalPendapatanBulanLalu();
    }catch(error){
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