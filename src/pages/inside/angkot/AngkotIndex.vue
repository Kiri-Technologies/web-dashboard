<template>
  <section class="mt-4">
    <section class="flex justify-center">
      <side-to-side-stat
        title1="Total Semua Angkot Terdaftar"
        title2="Total Angkot Mendaftar Bulan Ini"
        :data1="totalAngkotMendaftarBulanIni"
        :data2="totalAngkotMendaftarBulanIni"
      ></side-to-side-stat>
    </section>
    <section class="flex justify-center mt-4">
      <card class="shadow-lg w-11/12">
        <card-body>
          <base-bread-crumb :crumbs="crumbs"></base-bread-crumb>
          <p>
            <menu-title>
              <template v-slot:default> Angkot </template>
              <template v-slot:menuName> List Angkot yang Tersedia </template>
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
                  <th>Kode Trayek</th>
                  <th>Plat Nomor</th>
                  <th>Trayek Angkot</th>
                  <th>Pemilik Angkot</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr v-if="allAngkot.length < 1">
                  <td colspan="100%" class="text-center text-gray-500">
                    Data angkot kosong
                  </td>
                </tr>
                <tr v-for="angkot in allAngkot" :key="angkot.id">
                  <td>{{ angkot.route.kode_trayek }}</td>
                  <td>{{ angkot.plat_nomor }}</td>
                  <td>
                    {{ angkot.route.titik_awal }} -
                    {{ angkot.route.titik_akhir }}
                  </td>
                  <td>{{ angkot.user_owner.name }}</td>
                  <td>
                    <router-link
                      :to="{ name: 'detail angkot', params: { id: angkot.id } }"
                    >
                      <font-awesome-icon
                        icon="info-circle"
                        class="text-lg text-yellow-500"
                      />
                    </router-link>
                  </td>
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
export default {
  data() {
    return {
      allAngkot: [],
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
  created() {
    this.getAllAngkot();
    this.getTotalAngkotMendaftarBulanIni();
  },
};
</script>

<style scoped>
.text-kiri-green {
  color: #39ac00;
}
</style>