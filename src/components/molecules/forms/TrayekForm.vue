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
          <span class="label-text">Kode Trayek</span>
        </label>
        <input
          type="text"
          placeholder="Kode Trayek"
          class="input input-bordered"
          :class="{ 'input-error': validation.kode_trayek == 'invalid' }"
          v-model.trim="kode_trayek"
          required
          @blur="validateKodeTrayek"
        />
        <label class="label" v-if="validation.kode_trayek == 'invalid'">
          <span class="label-text-alt text-red-500">{{
            formMessage.kode_trayek
          }}</span>
        </label>
      </div>
      <div class="form-control mb-2">
        <label class="label">
          <span class="label-text">Titik Awal</span>
        </label>
        <input
          type="text"
          placeholder="Titik Awal"
          class="input input-bordered"
          :class="{ 'input-error': validation.titik_awal == 'invalid' }"
          v-model.trim="titik_awal"
          required
          @blur="validateTitikAwal"
        />
        <label class="label" v-if="validation.titik_awal == 'invalid'">
          <span class="label-text-alt text-red-500">{{
            formMessage.titik_awal
          }}</span>
        </label>
      </div>
      <div class="form-control mb-2">
        <label class="label">
          <span class="label-text">Titik Akhir</span>
        </label>
        <input
          type="text"
          placeholder="Titik Akhir"
          class="input input-bordered"
          :class="{ 'input-error': validation.titik_akhir == 'invalid' }"
          v-model.trim="titik_akhir"
          required
          @blur="validateTitikAkhir"
        />
        <label class="label" v-if="validation.titik_akhir == 'invalid'">
          <span class="label-text-alt text-red-500">{{
            formMessage.titik_akhir
          }}</span>
        </label>
      </div>
      <div class="flex justify-end mt-7">
        <button-danger :link="true" :to="{ name: 'trayek angkot' }" size="sm">
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
  },
  data() {
    return {
      id: "",
      kode_trayek: "",
      titik_awal: "",
      titik_akhir: "",
      alert: {
        turn: false,
        mode: "",
        message: "",
      },
      validation: {
        kode_trayek: "pending",
        titik_awal: "pending",
        titik_akhir: "pending",
      },
      formMessage: {
        kode_trayek: "",
        titik_awal: "",
        titik_akhir: "",
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
      if (this.mode == "updateTrayek" && this.$route.params.id) {
        this.updateTrayek();
      } else if (this.mode == "createTrayek" && !this.$route.params.id) {
        this.createTrayek();
      }
    },
    async createTrayek() {
      this.isLoading = true;
      if (this.formIsInvalid) {
        this.isLoading = false;
        this.turnOnAlert("error", "Pastikan form terisi dengan benar");
        return;
      }

      try {
        await this.$store.dispatch("trayek/createTrayek", {
          kode_trayek: this.kode_trayek,
          titik_awal: this.titik_awal,
          titik_akhir: this.titik_akhir,
        });

        this.isLoading = false;

        this.$store.commit("alert/setAlert", {
          operation: "create",
          isSucceed: true,
        });

        this.$router.push({
          name: "trayek angkot"
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
        this.id = trayek.id;
        this.kode_trayek = trayek.kode_trayek;
        this.titik_awal = trayek.titik_awal;
        this.titik_akhir = trayek.titik_akhir;
      } catch (error) {
        this.formIsInvalid = true;
        this.errorMessage = error.message;
        this.turnOnAlert("error", this.errorMessage);
      }
    },
    async updateTrayek() {
      this.isLoading = true;
      if (this.formIsInvalid) {
        this.isLoading = false;
        this.turnOnAlert("error", "Pastikan form terisi dengan benar");
        return;
      }

      try {
        await this.$store.dispatch("trayek/updateTrayekById", {
          id: this.$route.params.id,
          kode_trayek: this.kode_trayek,
          titik_awal: this.titik_awal,
          titik_akhir: this.titik_akhir,
        });

        this.isLoading = false;

        this.$store.commit("alert/setAlert", {
          operation: "update",
          isSucceed: true,
        });

        this.$router.push({
          name: "trayek angkot"
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
    validateKodeTrayek() {
      if (this.kode_trayek == "") {
        this.validation.kode_trayek = "invalid";
        this.formIsInvalid = true;
        this.formMessage.kode_trayek = "Please enter a kode trayek";
      } else {
        this.formIsInvalid = false;
        this.formMessage.kode_trayek = "";
        this.validation.kode_trayek = "valid";
      }
    },
    validateTitikAwal() {
      if (this.titik_awal == "") {
        this.validation.titik_awal = "invalid";
        this.formIsInvalid = true;
        this.formMessage.titik_awal = "Please enter a titik awal";
      } else {
        this.formMessage.titik_awal = "";
        this.formIsInvalid = false;
        this.validation.titik_awal = "valid";
      }
    },
    validateTitikAkhir() {
      if (this.titik_akhir == "") {
        this.validation.titik_akhir = "invalid";
        this.formIsInvalid = true;
        this.formMessage.titik_akhir = "Please enter a titik awal";
      } else {
        this.formMessage.titik_akhir = "";
        this.formIsInvalid = false;
        this.validation.titik_akhir = "valid";
      }
    },
  },
  created() {
    if (this.mode == "updateTrayek" && this.$route.params.id) {
      this.loadTrayek(this.$route.params.id);
    }
  },
};
</script>