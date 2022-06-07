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
      <div class="p-5 flex justify-center" v-if="isLoading">
        <button class="btn bg-transparent loading text-black border-none">
          Loading data...
        </button>
      </div>
      <data-table :columns="columns" :entries="filteredListRiwayatSupirNarik" v-else></data-table>
    </div>
  </section>
</template>

<script>
import moment from "moment";

export default {
  data() {
    return {
      isLoading: false,
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
      angkot: {
        route: {
          kode_angkot: "",
          titik_awal: "",
          titik_akhir: "",
        },
        plat_nomor: "",
      },
      listRiwayatSupirNarik: [],
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
    async getAllRiwayatSupirNarik() {
      try {
        await this.$store.dispatch(
          "riwayatSupirNarik/getAllRiwayatSupirNarikByAngkotId",
          {
            idAngkot: this.$route.params.id,
          }
        );
        this.listRiwayatSupirNarik =
          this.$store.getters["riwayatSupirNarik/getAllRiwayatSupirNarik"];
      } catch (error) {
        this.errorMessage = error.message;
        this.turnOnAlert("error", false);
      }
    },
    changeDateFormat(date) {
      return moment(date, "YYYY-MM-DD").format("dddd, DD MMMM YYYY HH:MM");
    },
    rupiahFormat(number) {
      return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
      }).format(number);
    },
  },
  async created() {
    this.isLoading = true;
    try {
      await this.getAngkot();
      await this.getAllRiwayatSupirNarik();
    } catch (error) {
      console.log(error.message);
    }
    this.isLoading = false;
  },
};
</script>