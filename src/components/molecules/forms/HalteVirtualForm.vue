<template>
  <form @submit.prevent="submitMethod">
    <div class="w-4/5 mx-auto">
      <base-alert
        v-if="alert.turn"
        :mode="alert.mode"
        :message="alert.message"
      ></base-alert>
      <div class="form-control mb-2">
        <label class="label">
          <span class="label-text">Trayek</span>
        </label>
        <input
          type="text"
          placeholder="Kode Trayek"
          :value="trayek.kode_trayek"
          class="input input-bordered"
          readonly
        />
      </div>
      <div class="form-control mb-2">
        <label class="label">
          <span class="label-text">Nama Halte Virtual</span>
        </label>
        <input
          type="text"
          placeholder="Nama Halte Virtual"
          class="input input-bordered"
          :class="{ 'input-error': validation.name == 'invalid' }"
          v-model.trim="name"
          required
          @blur="validateName"
        />
        <label class="label" v-if="validation.name == 'invalid'">
          <span class="label-text-alt text-red-500">{{
            formMessage.name
          }}</span>
        </label>
      </div>
      <div class="form-control mb-2">
        <label class="label">
          <span class="label-text">Titik Latitude</span>
        </label>
        <input
          type="text"
          placeholder="Titik Latitude"
          class="input input-bordered"
          :class="{ 'input-error': validation.lat == 'invalid' }"
          v-model.trim="lat"
          required
          @blur="validateLatitude"
        />
        <label class="label" v-if="validation.lat == 'invalid'">
          <span class="label-text-alt text-red-500">{{ formMessage.lat }}</span>
        </label>
      </div>
      <div class="form-control mb-2">
        <label class="label">
          <span class="label-text">Titik Longitude</span>
        </label>
        <input
          type="text"
          placeholder="Titik Longitude"
          class="input input-bordered"
          :class="{ 'input-error': validation.lng == 'invalid' }"
          v-model.trim="lng"
          required
          @blur="validateLongitude"
        />
        <label class="label" v-if="validation.lng == 'invalid'">
          <span class="label-text-alt text-red-500">{{ formMessage.lng }}</span>
        </label>
      </div>
      <div class="flex justify-end mt-7">
        <button-danger
          :link="true"
          :to="{ name: 'detail trayek', params: { id: trayekid } }"
          size="sm"
        >
          Batal
        </button-danger>

        <button-primary
          class="ml-1"
          :class="loadingState"
          size="sm"
          type="submit"
        >
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
  },
  data() {
    return {
      id: "",
      name: "",
      lat: "",
      lng: "",
      trayek: {
        id: "",
        kode_trayek: "",
        titik_awal: "",
        titik_akhir: "",
      },
      alert: {
        turn: false,
        mode: "",
        message: "",
      },
      validation: {
        name: "pending",
        lat: "pending",
        lng: "pending",
      },
      formMessage: {
        name: "",
        lat: "",
        lng: "",
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
      if (this.formIsInvalid) {
        this.isLoading = false;
        this.turnOnAlert("error", "Pastikan form terisi dengan benar");
        return;
      }

      try {
        await this.$store.dispatch("halteVirtual/createHalteVirtual", {
          trayekid: this.trayekid,
          name: this.name,
          lat: this.lat,
          lng: this.lng,
        });

        this.isLoading = false;

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
        this.id = halteVirtual.id;
        this.name = halteVirtual.name;
        this.lat = halteVirtual.lat;
        this.lng = halteVirtual.lng;
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
          trayekid: this.trayekid,
          id: this.$route.params.id,
          name: this.name,
          lat: this.lat,
          lng: this.lng,
        });

        this.isLoading = false;

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
    },
    turnOnAlert(mode, message) {
      this.alert.turn = true;
      this.alert.mode = mode;
      this.alert.message = message;
    },
    validateName() {
      if (this.name == "") {
        this.validation.name = "invalid";
        this.formIsInvalid = true;
        this.formMessage.name = "Please enter a halte virtual name";
      } else {
        this.formIsInvalid = false;
        this.formMessage.name = "";
        this.validation.name = "valid";
      }
    },
    validateLatitude() {
      if (this.lat == "") {
        this.validation.lat = "invalid";
        this.formIsInvalid = true;
        this.formMessage.lat = "Please enter a latitude";
      } else {
        this.formMessage.lat = "";
        this.formIsInvalid = false;
        this.validation.lat = "valid";
      }
    },
    validateLongitude() {
      if (this.lng == "") {
        this.validation.lng = "invalid";
        this.formIsInvalid = true;
        this.formMessage.lng = "Please enter a longitude";
      } else {
        this.formMessage.lng = "";
        this.formIsInvalid = false;
        this.validation.lng = "valid";
      }
    },
  },
  created() {
    if (this.$route.params.id) {
      this.loadHalteVirtual(this.$route.params.id);
    }
    this.loadTrayek(this.$route.params.trayekid);
    // if (this.mode == "updateTrayek" && this.$route.params.trayekid) {
    // }
  },
};
</script>