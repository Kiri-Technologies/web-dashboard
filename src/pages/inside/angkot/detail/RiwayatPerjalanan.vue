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
      <data-table :entries="filteredPerjalanan" :columns="columns" v-else></data-table>
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
  computed: {
    filteredPerjalanan() {
      return this.perjalanan.map(perjalanan => {
        perjalanan.waktu = this.changeDateFormat(perjalanan.created_at);
        perjalanan.nama_supir = perjalanan.user_supir == null ? 'supir' : perjalanan.user_supir.name;
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
  async created() {
    this.isLoading = true;
    try {
      await this.getAngkot();
      await this.getAllPerjalananByIdAngkot();
    } catch (error) {
      console.log(error.message);
    }
    this.isLoading = false;
  }
};
</script>