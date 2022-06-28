<template>
  <form @submit.prevent="submitMethod">
    <div class="w-4/5 mx-auto">
      <base-alert v-if="alert.turn" :mode="alert.mode" :message="alert.message"></base-alert>
      <div class="form-control mb-2">
        <label class="label">
          <span class="label-text">Trayek</span>
        </label>
        <input type="text" placeholder="Kode Trayek" :value="trayek.kode_trayek" class="input input-bordered"
          readonly />
      </div>
      <div class="form-control mb-2">
        <label class="label">
          <span class="label-text">Nama Halte Virtual</span>
        </label>
        <input type="text" placeholder="Nama Halte Virtual" class="input input-bordered"
          :class="{ 'input-error': validation.nama_lokasi == 'invalid' }" v-model.trim="nama_lokasi" required
          @blur="validateNamaLokasi" />
        <label class="label" v-if="validation.nama_lokasi == 'invalid'">
          <span class="label-text-alt text-red-500">{{
              formMessage.nama_lokasi
          }}</span>
        </label>
      </div>
      <div class="form-control mb-2">
        <label class="label">
          <span class="label-text">Arah</span>
        </label>
        <select class="select select-bordered" :class="{ 'input-error': validation.arah == 'invalid' }" v-model="arah"
          required @blur="validateArah">
          <option disabled>Pilih arah...</option>
          <option>{{ this.trayek.titik_awal }}</option>
          <option>{{ this.trayek.titik_akhir }}</option>
        </select>
        <label class="label">
          <span class="label-text-alt text-gray-500">Tentukan arah sesuai titik awal atau titik</span>
          <span class="label-text-alt text-red-500" v-if="validation.arah == 'invalid'">{{
              formMessage.arah
          }}</span>
        </label>
      </div>
      <div class="form-control mb-2">
        <label class="label">
          <span class="label-text">Titik Latitude</span>
        </label>
        <input type="text" placeholder="Titik Latitude" class="input input-bordered"
          :class="{ 'input-error': validation.lat == 'invalid' }" v-model.trim="lat" required
          @blur="validateLatitude" />
        <label class="label" v-if="validation.lat == 'invalid'">
          <span class="label-text-alt text-red-500">{{ formMessage.lat }}</span>
        </label>
      </div>
      <div class="form-control mb-2">
        <label class="label">
          <span class="label-text">Titik Longitude</span>
        </label>
        <input type="text" placeholder="Titik Longitude" class="input input-bordered"
          :class="{ 'input-error': validation.lng == 'invalid' }" v-model.trim="lng" required
          @blur="validateLongitude" />
        <label class="label" v-if="validation.lng == 'invalid'">
          <span class="label-text-alt text-red-500">{{ formMessage.lng }}</span>
        </label>
      </div>
      <div class="flex justify-end mt-7">
        <button-danger :link="true" :to="{ name: 'detail trayek', params: { id: trayekid } }" size="sm">
          Batal
        </button-danger>

        <button-primary class="ml-1" :class="loadingState" size="sm" type="submit">
          Simpan
        </button-primary>
      </div>
    </div>
  </form>
</template>

<script>
export default {
  props: {
    mode: {
      type: String,
      required: false,
    },
    trayekid: {
      type: String,
      required: false,
    },
    id: {
      type: String,
      required: false
    }
  },
  data() {
    return {
      nama_lokasi: "",
      route_id: "",
      lat: "",
      lng: "",
      arah: "Pilih arah...",
      trayek: {
        id: "",
        kode_trayek: "",
        titik_awal: "",
        titik_akhir: "",
        lat_titik_awal: "",
        long_titik_awal: "",
        lat_titik_akhir: "",
        long_titik_akhir: "",
      },
      alert: {
        turn: false,
        mode: "",
        message: "",
      },
      validation: {
        nama_lokasi: "pending",
        lat: "pending",
        lng: "pending",
        arah: "pending",
      },
      formMessage: {
        nama_lokasi: "",
        lat: "",
        lng: "",
        arah: "",
      },
      isLoading: false,
      formIsInvalid: false,
    };
  },
  computed: {
    loadingState() {
      if (this.isLoading) {
        return {
          loading: true,
        };
      } else {
        return {
          loading: false,
        };
      }
    },
  },
  methods: {
    submitMethod() {
      if (this.mode == "updateHalteVirtual" && this.$route.params.id) {
        this.updateHalteVirtual();
      } else if (this.mode == "createHalteVirtual" && !this.$route.params.id) {
        this.createHalteVirtual();
      }
    },
    async createHalteVirtual() {
      this.isLoading = true;
      if (this.formIsInvalid || !this.validateNamaLokasi() || !this.validateLatitude() || !this.validateLongitude() || !this.validateArah()) {
        this.turnOnAlert("error", "Pastikan form terisi dengan benar");
        console.log(this.arah);
      } else {
        try {
          await this.$store.dispatch("halteVirtual/createHalteVirtual", {
            trayekid: this.trayekid,
            nama_lokasi: this.nama_lokasi,
            lat: this.lat,
            lng: this.lng,
            arah: this.arah,
          });

          this.$store.commit("alert/setAlert", {
            operation: "create",
            isSucceed: true,
          });

          this.$router.push({
            name: "detail trayek",
            params: {
              id: this.trayekid,
            },
          });
        } catch (error) {
          this.formIsInvalid = true;
          this.errorMessage = error.message;
          this.turnOnAlert("error", this.errorMessage);
        }
      }
      this.isLoading = false;
    },
    async loadTrayek(id) {
      try {
        await this.$store.dispatch("trayek/getTrayekById", {
          id: id,
        });
        const trayek = this.$store.getters["trayek/getTrayek"];
        this.trayek.id = trayek.id;
        this.trayek.kode_trayek = trayek.kode_trayek;
        this.trayek.titik_awal = trayek.titik_awal;
        this.trayek.titik_akhir = trayek.titik_akhir;
        this.trayek.lat_titik_awal = trayek.lat_titik_awal;
        this.trayek.long_titik_awal = trayek.long_titik_awal;
        this.trayek.lat_titik_akhir = trayek.lat_titik_akhir;
        this.trayek.long_titik_akhir = trayek.long_titik_akhir;
      } catch (error) {
        this.formIsInvalid = true;
        this.errorMessage = error.message;
        this.turnOnAlert("error", this.errorMessage);
      }
    },
    async loadHalteVirtual(id) {
      try {
        await this.$store.dispatch("halteVirtual/getHalteVirtualById", {
          id: id,
          trayekid: this.trayekid,
        });
        const halteVirtual =
          this.$store.getters["halteVirtual/getHalteVirtual"];
        this.route_id = halteVirtual.route_id;
        this.nama_lokasi = halteVirtual.nama_lokasi;
        this.lat = halteVirtual.lat;
        this.lng = halteVirtual.lng;
        this.arah = halteVirtual.arah;
      } catch (error) {
        this.formIsInvalid = true;
        this.errorMessage = error.message;
        this.turnOnAlert("error", this.errorMessage);
      }
    },
    async updateHalteVirtual() {
      this.isLoading = true;
      if (this.formIsInvalid) {
        this.isLoading = false;
        this.turnOnAlert("error", "Pastikan form terisi dengan benar");
        return;
      }

      try {
        await this.$store.dispatch("halteVirtual/updateHalteVirtual", {
          id: this.$route.params.id,
          nama_lokasi: this.nama_lokasi,
          route_id: this.route_id,
          lat: this.lat,
          lng: this.lng,
          arah: this.arah,
        });

        this.$store.commit("alert/setAlert", {
          operation: "update",
          isSucceed: true,
        });

        this.$router.push({
          name: "detail trayek",
          params: {
            id: this.trayekid,
          },
        });
      } catch (error) {
        this.formIsInvalid = true;
        this.errorMessage = error.message;
        this.turnOnAlert("error", this.errorMessage);
      }
      this.isLoading = false;
    },
    turnOnAlert(mode, message) {
      this.alert.turn = true;
      this.alert.mode = mode;
      this.alert.message = message;
    },
    validateNamaLokasi() {
      if (this.nama_lokasi == "") {
        this.validation.nama_lokasi = "invalid";
        this.formIsInvalid = true;
        this.formMessage.nama_lokasi = "Please enter a correct halte virtual name";
        return false;
      } else {
        this.formIsInvalid = false;
        this.formMessage.nama_lokasi = "";
        this.validation.nama_lokasi = "valid";
        return true;
      }
    },
    validateArah() {
      if (this.arah == "") {
        this.validation.arah = "invalid";
        this.formIsInvalid = true;
        this.formMessage.arah = "Please enter a correct direction";
        return false;
      } else {
        this.formIsInvalid = false;
        this.formMessage.arah = "";
        this.validation.arah = "valid";
        return true;
      }
    },
    validateLatitude() {
      if (this.lat == "" || !isFinite(this.lat) && !Math.abs(this.lat) <= 90) {
        this.validation.lat = "invalid";
        this.formIsInvalid = true;
        this.formMessage.lat = "Please enter a correct latitude";
        return false;
      } else {
        this.formMessage.lat = "";
        this.formIsInvalid = false;
        this.validation.lat = "valid";
        return true;
      }
    },
    validateLongitude() {
      if (this.lng == "" || !isFinite(this.lng) && !Math.abs(this.lng) <= 180) {
        this.validation.lng = "invalid";
        this.formIsInvalid = true;
        this.formMessage.lng = "Please enter a correct longitude";
        return false;
      } else {
        this.formMessage.lng = "";
        this.formIsInvalid = false;
        this.validation.lng = "valid";
        return true;
      }
    },
  },
  created() {
    if (this.$route.params.id) {
      this.loadHalteVirtual(this.$route.params.id);
    }
    this.loadTrayek(this.$route.params.trayekid);
  },
};
</script>