<template>
  <section class="mt-4">
    <div>
      <div class="grid grid-cols-2 gap-4">
        <div>
          <div class="grid grid-cols-2">
            <div>Kode Trayek</div>
            <div class="text-gray-500">: {{ angkot.route.kode_trayek }}</div>
          </div>
          <div class="grid grid-cols-2">
            <div>Plat Nomor</div>
            <div class="text-gray-500">: {{ angkot.plat_nomor }}</div>
          </div>
        </div>
        <div>
          <div class="grid grid-cols-2">
            <div>Trayek Angkot</div>
            <div class="text-gray-500">: {{ angkot.route.titik_awal }} - {{ angkot.route.titik_akhir }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="overflow-x-auto mt-4">
      <table class="table w-full">
        <!-- head -->
        <thead>
          <tr>
            <th>Waktu</th>
            <th>Nama Supir</th>
            <th>Penumpang</th>
            <th>Tempat Naik</th>
            <th>Tempat Turun</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="perjalanan.length < 1">
            <td colspan="100%" class="text-center text-gray-500">
              Tidak ada riwayat perjalanan di angkot ini
            </td>
          </tr>
          <tr v-for="p in perjalanan" :key="p.id">
            <td>{{ changeDateFormat(p.created_at) }}</td>
            <td>{{ p.user_supir.name }}</td>
            <td>{{ p.user_penumpang.name }}</td>
            <td>{{ p.nama_tempat_naik }}</td>
            <td>{{ p.nama_tempat_turun }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>

<script>
import moment from "moment";

export default {
  data() {
    return {
      angkot: {
        route: {
          kode_angkot: "",
          titik_awal: "",
          titik_akhir: "",
        },
        plat_nomor: "",
      },
      perjalanan: [],
    };
  },
  methods: {
    async getAngkot() {
      try {
        await this.$store.dispatch("angkot/getAngkotById", {
          id: this.$route.params.id,
        });
        this.angkot = this.$store.getters["angkot/getAngkot"];
      } catch (error) {
        this.errorMessage = error.message;
        this.turnOnAlert("error", false);
      }
    },
    async getAllPerjalananByIdAngkot() {
      try {
        await this.$store.dispatch("perjalanan/getAllPerjalananByIdAngkot", {
          idAngkot: this.$route.params.id,
        });
        this.perjalanan = this.$store.getters[
          "perjalanan/getAllPerjalanan"
        ];
      } catch (error) {
        this.errorMessage = error.message;
        this.turnOnAlert("error", false);
      }
    },
    changeDateFormat(date) {
      return moment(date, "YYYY-MM-DD").format("dddd, DD MMMM YYYY HH:MM");
    },
  },
  created(){
    this.getAngkot();
    this.getAllPerjalananByIdAngkot();
  }
};
</script>