<template>
  <section class="mt-4">
    <div class="grid grid-cols-5 gap-1">
      <div class="col-span-2">
        <div class="grid grid-cols-2">
          <div>Kode Trayek</div>
          <div class="text-gray-500">: {{ angkot.route.kode_trayek }}</div>
        </div>
        <div class="grid grid-cols-2">
          <div>Plat Nomor</div>
          <div class="text-gray-500">: {{ angkot.plat_nomor }}</div>
        </div>
        <div class="grid grid-cols-2">
          <div>Trayek Angkot</div>
          <div class="text-gray-500">
            : {{ angkot.route.titik_awal }} - {{ angkot.route.titik_akhir }}
          </div>
        </div>
        <div class="grid grid-cols-2">
          <div>Pemilik Angkot</div>
          <div class="text-gray-500">: {{ angkot.user_owner.name }}</div>
        </div>
        <div class="grid grid-cols-2">
          <div>Status Angkot</div>
          <div class="text-gray-500">
            :
            {{
                angkot.is_beroperasi == null || angkot.is_beroperasi == false
                  ? "Tidak beroperasi"
                  : "sedang beroperasi"
            }}
          </div>
        </div>
      </div>
      <div class="col-span-2">
        <div class="grid grid-cols-2">
          <div>Pajak STNK</div>
          <div class="text-gray-500">
            : {{ changeDateFormat(angkot.pajak_stnk) }}
          </div>
        </div>
        <div class="grid grid-cols-2">
          <div>Plat Tahunan</div>
          <div class="text-gray-500">
            : {{ changeDateFormat(angkot.pajak_tahunan) }}
          </div>
        </div>
        <div class="grid grid-cols-2">
          <div>KIR</div>
          <div class="text-gray-500">
            : {{ changeDateFormat(angkot.kir_bulanan) }}
          </div>
        </div>
      </div>
      <div>
        <img :src="angkot.qr_code" class="w-36 h-36" />
      </div>
    </div>

    <div class="grid grid-cols-2 mt-4">
      <div>
        <div>
          <p class="font-semibold">List Supir</p>
          <div class="overflow-auto max-h-72">
            <table class="table w-full">
              <thead>
                <tr>
                  <th>Nama Supir</th>
                </tr>
              </thead>
              <tbody>
                <tr v-if="emptyListSupir">
                  <td colspan="100%" class="text-center text-gray-500">
                    Tidak ada supir di angkot ini
                  </td>
                </tr>
                <tr v-for="supir in listSupir" :key="supir.id">
                  <td>{{ supir.user.name }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="mt-2">
          <p class="font-semibold">Pendapatan</p>
          <div class="overflow-auto max-h-72">
            <table class="table w-full">
              <thead>
                <tr>
                  <th>Tanggal</th>
                  <th>Jumlah</th>
                </tr>
              </thead>
              <tbody>
                <tr v-if="listRiwayatSupirNarik.length < 1">
                  <td colspan="100%" class="text-center text-gray-500">
                    Tidak ada riwayat pendapatan di angkot ini
                  </td>
                </tr>
                <tr v-for="rs in listRiwayatSupirNarik" :key="rs.id">
                  <td>{{ changeDateFormat(rs.created_at) }}</td>
                  <td>{{ rupiahFormat(rs.jumlah_pendapatan) }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div>
        <div v-if="isLoading" class="text-sm text-center text-gray-400">Loading chart...</div>
        <bar-chart v-else :dataProps="pendapatanChart.totalPendapatanHarian" :labelsProps="pendapatanChart.labels"
          :title="pendapatanChart.title"></bar-chart>
      </div>
    </div>
  </section>
</template>

<script>
import moment from "moment";
export default {
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
        pajak_stnk: "",
        pajak_tahunan: "",
        kir_bulanan: "",
        user_owner: {
          name: "",
        },
        is_beroperasi: false,
        qr_code: "https://picsum.photos/200",
      },
      listSupir: [],
      listRiwayatSupirNarik: [],
      pendapatanChart: {
        totalPendapatanHarian: [0, 0, 0, 0, 0, 0, 0],
        title: "Riwayat pendapatan dalam 7 hari kemarin",
        labels: [
          moment().subtract(6, "days").format("dddd"),
          moment().subtract(5, "days").format("dddd"),
          moment().subtract(4, "days").format("dddd"),
          moment().subtract(3, "days").format("dddd"),
          moment().subtract(2, "days").format("dddd"),
          moment().subtract(1, "days").format("dddd"),
          moment().format("dddd"),
        ],
      },
      alert: {
        turn: false,
        mode: "",
        message: "",
      },
    };
  },
  computed: {
    emptyListSupir() {
      return this.listSupir.length < 1 ? true : false;
    },
  },
  methods: {
    async getAngkot() {
      try {
        await this.$store.dispatch("angkot/getAngkotById", {
          id: this.$route.params.id,
        });
        this.angkot = this.$store.getters["angkot/getAngkot"];
        console.log(this.angkot);
      } catch (error) {
        this.errorMessage = error.message;
        this.turnOnAlert("error", false);
      }
    },
    async getListSupir() {
      try {
        await this.$store.dispatch("listSupir/getListSupirByAngkot", {
          idAngkot: this.$route.params.id,
        });
        this.listSupir = this.$store.getters["listSupir/getListSupir"];
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
    async getTotalPendapatanHarian() {
      this.isLoading = true;
      try {
        await this.$store.dispatch("chart/getTotalPendapatanHarianByIdAngkot", {
          idAngkot: this.$route.params.id,
        });
        let pendapatanHarian =
          this.$store.getters["chart/getTotalPendapatanHarian"];

        let totalPendapatanHarian = [];

        for (const p in pendapatanHarian) {
          totalPendapatanHarian.push(
            pendapatanHarian[p]
          );
        }
        this.pendapatanChart.totalPendapatanHarian = totalPendapatanHarian.reverse();
      } catch (error) {
        this.errorMessage = error.message;
        this.turnOnAlert("error", false);
      }
      this.isLoading = false;
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
    this.getAngkot();
    this.getListSupir();
    this.getAllRiwayatSupirNarik();
    this.getTotalPendapatanHarian();
  },
};
</script>