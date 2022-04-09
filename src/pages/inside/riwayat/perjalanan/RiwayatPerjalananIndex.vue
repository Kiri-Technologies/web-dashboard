<template>
  <section class="mt-4">
    <section class="flex justify-center">
      <side-to-side-stat
        :title1="'Total Perjalanan Bulan Ini'"
        :title2="'Total Perjalanan Bulan Kemarin'"
        :data1="'1,984,523'"
        :data2="'1,984,523'"></side-to-side-stat>
    </section>
    <section class="flex justify-center mt-4">
      <card class="shadow-lg w-11/12">
        <base-bread-crumb :crumbs="crumbs"></base-bread-crumb>
        <p>
          <menu-title>
            <template v-slot:default> Riwayat Perjalanan </template>
            <template v-slot:menuName>
              Daftar riwayat perjalanan angkot
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
                <th>Nama Supir</th>
                <th>Plat Nomor</th>
                <th>Trayek</th>
                <th>Penumpang</th>
                <th>Tempat Naik</th>
                <th>Tempat Turun</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="allPerjalanan.length < 1">
                <td colspan="100%" class="text-center text-gray-500">
                  Tidak ada riwayat perjalanan
                </td>
              </tr>
              <tr v-else v-for="perjalanan in allPerjalanan" :key="perjalanan.id">
                <td>{{ changeDateFormat(perjalanan.created_at) }}</td>
                <td>{{ perjalanan.user_supir.name }}</td>
                <td>{{ perjalanan.vehicle == null ? 'B 4466 US' : perjalanan.vehicle.plat_nomor }}</td>
                <td>{{ perjalanan.vehicle == null ? 'Kebayoran' : perjalanan.vehicle.route.titik_awal }} - {{ perjalanan.vehicle == null ? 'Ciledug' : perjalanan.vehicle.route.titik_akhir }}</td>
                <td>{{ perjalanan.user_penumpang.name }}</td>
                <td>{{ perjalanan.nama_tempat_naik }}</td>
                <td>{{ perjalanan.nama_tempat_turun }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </card>
    </section>
  </section>
</template>

<script>
import moment from "moment";
export default {
  data() {
    return {
      allPerjalanan: [],
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
  created() {
    this.getAllPerjalanan();
  },
};
</script>