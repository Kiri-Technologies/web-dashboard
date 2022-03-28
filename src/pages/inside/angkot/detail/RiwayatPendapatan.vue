<template>
  <section class="mt-4">
    <div>
      <div class="grid grid-cols-2 gap-4">
        <div>
          <div class="grid grid-cols-2">
            <div>Kode Trayek</div>
            <div class="text-gray-500">: S-101</div>
          </div>
          <div class="grid grid-cols-2">
            <div>Plat Nomor</div>
            <div class="text-gray-500">: B 1234 AM</div>
          </div>
        </div>
        <div>
          <div class="grid grid-cols-2">
            <div>Trayek Angkot</div>
            <div class="text-gray-500">: Cipagalo Buah Batu</div>
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
            <th>Jumlah Pendapatan</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="ls in listRiwayatSupirNarik" :key="ls.id">
            <td>{{ changeDateFormat(ls.created_at) }}</td>
            <td>{{ ls.supir.name }}</td>
            <td>{{ rupiahFormat(ls.jumlah_pendapatan) }}</td>
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
      listRiwayatSupirNarik: [],
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
    async getAllRiwayatSupirNarik() {
      try {
        await this.$store.dispatch("riwayatSupirNarik/getAllRiwayatSupirNarik", {
          idAngkot: this.$route.params.id,
        });
        this.listRiwayatSupirNarik = this.$store.getters[
          "riwayatSupirNarik/getAllRiwayatSupirNarik"
        ];
      } catch (error) {
        this.errorMessage = error.message;
        this.turnOnAlert("error", false);
      }
    },
    changeDateFormat(date) {
      return moment(date, "YYYY-MM-DD").format("DD MMMM YYYY HH:MM");
    },
    rupiahFormat(number) {
      return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
      }).format(number);
    },
  },
  created(){
    this.getAngkot();
    this.getAllRiwayatSupirNarik();
  }
};
</script>