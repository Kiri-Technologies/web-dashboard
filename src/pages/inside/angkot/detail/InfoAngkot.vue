<template>
  <section class="mt-4">
    <div class="grid grid-cols-5 gap-1">
      <div class="col-span-2">
        <div class="grid grid-cols-2">
          <div>Kode Trayek</div>
          <div class="text-gray-500">: {{ angkot.route.kode_angkot }}</div>
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
        <img
          src="https://api.lorem.space/image/face?hash=64318"
          class="w-36 h-36"
        />
      </div>
    </div>

    <div class="grid grid-cols-2 mt-4">
      <div>
        <div>
          <p>List Supir</p>
          <div class="overflow-auto max-h-72">
            <table class="table w-full">
              <thead>
                <tr>
                  <th>Nama Supir</th>
                </tr>
              </thead>
              <tbody>
                <tr v-if="emptyListSupir">
                  <td colspan="100%" class="text-center">
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
          <p>Pendapatan</p>
          <div class="overflow-auto max-h-72">
            <table class="table w-full">
              <thead>
                <tr>
                  <th>Tanggal</th>
                  <th>Jumlah</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="rs in listRiwayatSupirNarik" :key="rs.id">
                  <td>{{ changeDateFormat(rs.created_at) }}</td>
                  <td>{{ rupiahFormat(rs.jumlah_pendapatan) }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div></div>
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
        pajak_stnk: "",
        pajak_tahunan: "",
        kir_bulanan: "",
        user_owner: {
          name: "",
        },
        is_beroperasi: false,
      },
      listSupir: [],
      listRiwayatSupirNarik: [],
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
  },
};
</script>