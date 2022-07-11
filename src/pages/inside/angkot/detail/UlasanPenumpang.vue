<template>
  <section class="mt-4">
    <div>
      <div class="grid grid-cols-2 gap-4">
        <div>
          <information-section label="Kode Trayek" :data="angkot.route.kode_trayek"></information-section>
          <information-section label="Plat Nomor" :data="angkot.plat_nomor"></information-section>
        </div>
        <div>
          <information-section label="Trayek Angkot" :data="`${angkot.route.titik_awal} - ${angkot.route.titik_akhir}`">
          </information-section>
        </div>
      </div>
    </div>
    <div class="overflow-x-auto mt-4">
      <loading v-if="isLoading"></loading>
      <ulasan-penumpang-data-table :entries="allPerjalanan" v-else></ulasan-penumpang-data-table>
    </div>
  </section>
</template>

<script>
import UlasanPenumpangDataTable from '../../../../components/molecules/datatable/UlasanPenumpangDataTable.vue';
export default {
  components: {
    UlasanPenumpangDataTable
  },
  data() {
    return {
      isLoading: false,
      angkot: {
        route: {
          kode_angkot: "",
          titik_awal: "",
          titik_akhir: "",
        },
        plat_nomor: "",
      },
      allPerjalanan: [],
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
        console.log(error.message);
      }
    },
    async getAllPerjalananByAngkotId() {
      try {
        await this.$store.dispatch(
          "perjalanan/getAllPerjalananDoneByIdAngkot",
          {
            idAngkot: this.$route.params.id,
          }
        );
        this.allPerjalanan =
          this.$store.getters["perjalanan/getAllPerjalanan"];
          console.log(this.allPerjalanan);
      } catch (error) {
        console.log(error.message);
      }
    },
  },
  async created() {
    this.isLoading = true;
    try {
      await this.getAngkot();
      await this.getAllPerjalananByAngkotId();
    } catch (error) {
      console.log(error.message);
    }
    this.isLoading = false;
  },
};
</script>