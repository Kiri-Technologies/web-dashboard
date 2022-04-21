<template>
  <section class="mt-4">
    <section class="flex justify-center">
      <side-to-side-stat
        title1="Total Pendapatan Bulan Ini"
        title2="Total Pendapatan Bulan Kemarin"
        :data1="rupiahFormat(totalPendapatanBulanIni)"
        :data2="rupiahFormat(totalPendapatanBulanLalu)"
      ></side-to-side-stat>
    </section>
    <section class="flex justify-center mt-4">
      <card class="shadow-lg w-11/12">
        <card-body>
          <base-bread-crumb :crumbs="crumbs"></base-bread-crumb>
          <p>
            <menu-title>
              <template v-slot:default> Riwayat Pendapatan </template>
              <template v-slot:menuName>
                Daftar pendapatan yang telah dicatat
              </template>
            </menu-title>
          </p>

          <base-alert
            v-if="alert.turn"
            :mode="alert.mode"
            :message="alert.message"
          ></base-alert>

          <div class="overflow-x-auto mt-2">
            <table class="table w-full" id="myTable">
              <!-- head -->
              <thead>
                <tr>
                  <th>Waktu</th>
                  <th>Trayek</th>
                  <th>Plat Nomor</th>
                  <th>Nama Supir</th>
                  <th>Jumlah Pendapatan</th>
                </tr>
              </thead>
              <tbody>
                <tr v-if="listRiwayatSupirNarik.length < 1">
                  <td colspan="100%" class="text-center text-gray-500">
                    Tidak ada riwayat pendapatan
                  </td>
                </tr>
                <tr v-else v-for="ls in listRiwayatSupirNarik" :key="ls.id">
                  <td>{{ changeDateFormat(ls.created_at) }}</td>
                  <td>
                    {{
                    ls.vehicle == null
                      ? "Kebayoran"
                      : ls.vehicle.route.titik_awal
                  }}
                  -
                  {{
                    ls.vehicle == null
                      ? "Ciputat"
                      : ls.vehicle.route.titik_akhir
                  }}
                  </td>
                  <td>
                    {{
                      ls.vehicle == null ? "B 4433 US" : ls.vehicle.plat_nomor
                    }}
                  </td>
                  <td>{{ ls.supir.name }}</td>
                  <td>{{ rupiahFormat(ls.jumlah_pendapatan) }}</td>
                </tr>
              </tbody>
            </table>
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
      listRiwayatSupirNarik: [],
      totalPendapatanBulanIni: 0,
      totalPendapatanBulanLalu: 0,
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
  created() {
    this.getAllRiwayatSupirNarik();
    this.getTotalPendapatanBulanIni();
    this.getTotalPendapatanBulanLalu();
  },
};
</script>

<style scoped>
.text-kiri-green {
  color: #39ac00;
}
</style>