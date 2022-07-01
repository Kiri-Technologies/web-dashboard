<template>
  <section class="mt-4">
    <div>
      <div class="grid grid-cols-2 gap-4">
        <div>
          <information-section label="Kode Trayek" :data="angkot.route.kode_trayek"></information-section>
          <information-section label="Plat Nomor" :data="angkot.plat_nomor"></information-section>
        </div>
        <div>
          <information-section label="Trayek Angkot" :data="`${angkot.route.titik_awal} - ${angkot.route.titik_akhir}`"></information-section>
        </div>
      </div>
    </div>
    <div class="overflow-x-auto mt-4">
      <loading v-if="isLoading"></loading>
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