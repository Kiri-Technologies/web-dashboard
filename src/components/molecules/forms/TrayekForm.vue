<template>
  <form @submit.prevent="submitMethod">
    <div class="w-4/5 mx-auto">
      <base-alert v-if="alert.turn" :mode="alert.mode" :message="alert.message"></base-alert>
      <div class="form-control mb-2">
        <label class="label">
          <span class="label-text">Kode Trayek</span>
        </label>
        <input type="text" placeholder="Kode Trayek" class="input input-bordered"
          :class="{ 'input-error': validation.kode_trayek == 'invalid' }" v-model.trim="kode_trayek" required
          @blur="validateKodeTrayek" />
        <label class="label" v-if="validation.kode_trayek == 'invalid'">
          <span class="label-text-alt text-red-500">{{
              formMessage.kode_trayek
          }}</span>
        </label>
      </div>


      <div class="grid grid-flow-col auto-cols-auto gap-4">
        <div>

          <div class="form-control mb-2">
            <label class="label">
              <span class="label-text">Titik Awal</span>
            </label>
            <input type="text" placeholder="Titik Awal" class="input input-bordered"
              :class="{ 'input-error': validation.titik_awal == 'invalid' }" v-model.trim="titik_awal" required
              @blur="validateTitikAwal" />
            <label class="label" v-if="validation.titik_awal == 'invalid'">
              <span class="label-text-alt text-red-500">{{
                  formMessage.titik_awal
              }}</span>
            </label>
          </div>

          <div class="form-control mb-2">
            <label class="label">
              <span class="label-text">Latitude Titik Awal</span>
            </label>
            <input type="text" placeholder="Latitude Titik Awal" class="input input-bordered"
              :class="{ 'input-error': validation.lat_titik_awal == 'invalid' }" v-model.trim="lat_titik_awal" required
              @blur="validateLatTitikAwal" />
            <label class="label" v-if="validation.lat_titik_awal == 'invalid'">
              <span class="label-text-alt text-red-500">{{ formMessage.lat_titik_awal }}</span>
            </label>
          </div>

          <div class="form-control mb-2">
            <label class="label">
              <span class="label-text">Longitude Titik Awal</span>
            </label>
            <input type="text" placeholder="Longitude Titik Awal" class="input input-bordered"
              :class="{ 'input-error': validation.long_titik_awal == 'invalid' }" v-model.trim="long_titik_awal"
              required @blur="validateLongTitikAwal" />
            <label class="label" v-if="validation.long_titik_awal == 'invalid'">
              <span class="label-text-alt text-red-500">{{ formMessage.long_titik_awal }}</span>
            </label>
          </div>

        </div>

        <div>

          <div class="grid grid-flow-col auto-cols-auto">
            <div class="form-control mb-2">
              <label class="label">
                <span class="label-text">Titik Akhir</span>
              </label>
              <input type="text" placeholder="Titik Akhir" class="input input-bordered"
                :class="{ 'input-error': validation.titik_akhir == 'invalid' }" v-model.trim="titik_akhir" required
                @blur="validateTitikAkhir" />
              <label class="label" v-if="validation.titik_akhir == 'invalid'">
                <span class="label-text-alt text-red-500">{{
                    formMessage.titik_akhir
                }}</span>
              </label>
            </div>
          </div>

          <div class="form-control mb-2">
            <label class="label">
              <span class="label-text">Latitude Titik Akhir</span>
            </label>
            <input type="text" placeholder="Latitude Titik Akhir" class="input input-bordered"
              :class="{ 'input-error': validation.lat_titik_akhir == 'invalid' }" v-model.trim="lat_titik_akhir"
              required />
            <label class="label" v-if="validation.lat_titik_akhir == 'invalid'">
              <span class="label-text-alt text-red-500">{{ formMessage.lat_titik_akhir }}</span>
            </label>
          </div>

          <div class="form-control mb-2">
            <label class="label">
              <span class="label-text">Longitude Titik Akhir</span>
            </label>
            <input type="text" placeholder="Longitude Titik Akhir" class="input input-bordered"
              :class="{ 'input-error': validation.long_titik_akhir == 'invalid' }" v-model.trim="long_titik_akhir"
              required @blur="validateLongTitikAkhir" />
            <label class="label" v-if="validation.long_titik_akhir == 'invalid'">
              <span class="label-text-alt text-red-500">{{ formMessage.long_titik_akhir }}</span>
            </label>
          </div>

        </div>

      </div>

      <div class="flex justify-end mt-7">
        <button-danger :link="true" :to="{ name: 'trayek angkot' }" size="sm">
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
  },
  data() {
    return {
      id: "",
      kode_trayek: "",
      titik_awal: "",
      titik_akhir: "",
      lat_titik_awal: "",
      long_titik_awal: "",
      lat_titik_akhir: "",
      long_titik_akhir: "",
      alert: {
        turn: false,
        mode: "",
        message: "",
      },
      validation: {
        kode_trayek: "pending",
        titik_awal: "pending",
        titik_akhir: "pending",
        lat_titik_awal: "pending",
        long_titik_awal: "pending",
        lat_titik_akhir: "pending",
        long_titik_akhir: "pending",
      },
      formMessage: {
        kode_trayek: "",
        titik_awal: "",
        titik_akhir: "",
        lat_titik_awal: "",
        long_titik_awal: "",
        lat_titik_akhir: "",
        long_titik_akhir: "",
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
      if (this.formIsInvalid  || !this.validateKodeTrayek() || !this.validateTitikAwal() || !this.validateTitikAkhir() || !this.validateLatTitikAwal() || !this.validateLongTitikAwal() || !this.validateLatTitikAkhir() || !this.validateLongTitikAkhir()) {
        this.isLoading = false;
        this.turnOnAlert("error", "Pastikan form terisi dengan benar");
      } else {
        try {
          await this.$store.dispatch("trayek/createTrayek", {
            kode_trayek: this.kode_trayek,
            titik_awal: this.titik_awal,
            titik_akhir: this.titik_akhir,
            lat_titik_awal: this.lat_titik_awal,
            long_titik_awal: this.long_titik_awal,
            lat_titik_akhir: this.lat_titik_akhir,
            long_titik_akhir: this.long_titik_akhir,
          });

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
      }
      this.isLoading = false;
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
        this.lat_titik_awal = trayek.lat_titik_awal;
        this.long_titik_awal = trayek.long_titik_awal;
        this.lat_titik_akhir = trayek.lat_titik_akhir;
        this.long_titik_akhir = trayek.long_titik_akhir;
      } catch (error) {
        this.formIsInvalid = true;
        this.errorMessage = error.message;
        this.turnOnAlert("error", this.errorMessage);
      }
    },
    async updateTrayek() {
      this.isLoading = true;
      if (this.formIsInvalid || !this.validateKodeTrayek() || !this.validateTitikAwal() || !this.validateTitikAkhir() || !this.validateLatTitikAwal() || !this.validateLongTitikAwal() || !this.validateLatTitikAkhir() || !this.validateLongTitikAkhir()) {
        this.isLoading = false;
        this.turnOnAlert("error", "Pastikan form terisi dengan benar");
      } else {
        try {
          await this.$store.dispatch("trayek/updateTrayekById", {
            id: this.$route.params.id,
            kode_trayek: this.kode_trayek,
            titik_awal: this.titik_awal,
            titik_akhir: this.titik_akhir,
            lat_titik_awal: this.lat_titik_awal,
            long_titik_awal: this.long_titik_awal,
            lat_titik_akhir: this.lat_titik_akhir,
            long_titik_akhir: this.long_titik_akhir,
          });

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
      }
      this.isLoading = false;
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
        this.formMessage.kode_trayek = "Please enter a correct kode trayek";
        return false;
      } else {
        this.formIsInvalid = false;
        this.formMessage.kode_trayek = "";
        this.validation.kode_trayek = "valid";
        return true;
      }
    },
    validateTitikAwal() {
      if (this.titik_awal == "") {
        this.validation.titik_awal = "invalid";
        this.formIsInvalid = true;
        this.formMessage.titik_awal = "Please enter a correct titik awal";
        return false;
      } else {
        this.formMessage.titik_awal = "";
        this.formIsInvalid = false;
        this.validation.titik_awal = "valid";
        return true;
      }
    },
    validateTitikAkhir() {
      if (this.titik_akhir == "") {
        this.validation.titik_akhir = "invalid";
        this.formIsInvalid = true;
        this.formMessage.titik_akhir = "Please enter a correct titik awal";
        return false;
      } else {
        this.formMessage.titik_akhir = "";
        this.formIsInvalid = false;
        this.validation.titik_akhir = "valid";
        return true;
      }
    },
    validateLatTitikAwal() {
      if (this.lat_titik_awal == "" || !isFinite(this.lat_titik_awal) && !Math.abs(this.lat_titik_awal) <= 90) {
        this.validation.lat_titik_awal = "invalid";
        this.formIsInvalid = true;
        this.formMessage.lat_titik_awal = "Please enter a correct latitude";
        return false;
      } else {
        this.formMessage.lat_titik_awal = "";
        this.formIsInvalid = false;
        this.validation.lat_titik_awal = "valid";
        return true;
      }
    },
    validateLongTitikAwal() {
      if (this.long_titik_awal == "" || !isFinite(this.long_titik_awal) && !Math.abs(this.long_titik_awal) <= 180) {
        this.validation.long_titik_awal = "invalid";
        this.formIsInvalid = true;
        this.formMessage.long_titik_awal = "Please enter a correct longitude";
        return false;
      } else {
        this.formMessage.long_titik_awal = "";
        this.formIsInvalid = false;
        this.validation.long_titik_awal = "valid";
        return true;
      }
    },
    validateLatTitikAkhir() {
      if (this.lat_titik_akhir == "" || !isFinite(this.lat_titik_akhir) && !Math.abs(this.lat_titik_akhir) <= 90) {
        this.validation.lat_titik_akhir = "invalid";
        this.formIsInvalid = true;
        console.log(this.validation.lat_titik_akhir);
        this.formMessage.lat_titik_akhir = "Please enter a correct latitude";
        return false;
      } else {
        this.formMessage.lat_titik_akhir = "";
        this.formIsInvalid = false;
        this.validation.lat_titik_akhir = "valid";
        return true;
      }
    },
    validateLongTitikAkhir() {
      if (this.long_titik_akhir == "" || !isFinite(this.long_titik_akhir) && !Math.abs(this.long_titik_akhir) <= 180) {
        this.validation.long_titik_akhir = "invalid";
        this.formIsInvalid = true;
        this.formMessage.long_titik_akhir = "Please enter a correct longitude";
        return false;
      } else {
        this.formMessage.long_titik_akhir = "";
        this.formIsInvalid = false;
        this.validation.long_titik_akhir = "valid";
        return true;
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