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
      <!-- <table class="table w-full"> -->
      <!-- head -->
      <!-- <thead>
          <tr>
            <th>Tanggal</th>
            <th>Nama</th>
            <th>Rating</th>
            <th>Review</th>
            <th>Komentar</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="allPerjalanan.length < 1">
            <td colspan="100%" class="text-center text-gray-500">
              Ulasan penumpang kosong
            </td>
          </tr>
          <tr v-for="p in allPerjalanan" :key="p.id">
            <td>{{ changeDateFormat(p.feedback.created_at) }}</td>
            <td>{{ p.user_penumpang.name }}</td>
            <td>
              <font-awesome-icon icon="star" class="text-lg text-yellow-400" v-for="i in Number(p.feedback.rating)"
                :key="i" />
            </td>
            <td>{{ p.feedback.review }}</td>
            <td>{{ p.feedback.komentar }}</td>
          </tr>
        </tbody>
      </table> -->
      <ulasan-penumpang-data-table :entries="allPerjalanan"></ulasan-penumpang-data-table>
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
    }catch(error){
      console.log(error.message);
    }
    this.isLoading = false;
  },
};
</script>