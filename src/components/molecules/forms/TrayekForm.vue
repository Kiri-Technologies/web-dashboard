<template>
  <form @submit.prevent="submitMethod">
    <div class="w-4/5 mx-auto">
      <base-alert v-if="alert.turn" :mode="alert.mode" :message="alert.message"></base-alert>

      <!-- <div class="form-control mb-2">
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
      </div> -->

      <form-input @formchange="setKodeTrayek" @formIsValid="setFormValidity" type="text" label="Kode Trayek" :isReadonly="false" formName="kode trayek" placeholder="Kode Trayek"
        :isRequired="true" :defaultValue="kode_trayek"></form-input>

      <div class="grid grid-flow-col auto-cols-auto gap-4">
        <div>

          <!-- <div class="form-control mb-2">
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
          </div> -->

          <form-input @formchange="setTitikAwal" @formIsValid="setFormValidity" type="text" label="Titik Awal" :isReadonly="false" formName="titik awal" placeholder="Titik Awal"
            :isRequired="true" :defaultValue="titik_awal"></form-input>

          <!-- <div class="form-control mb-2">
            <label class="label">
              <span class="label-text">Latitude Titik Awal</span>
            </label>
            <input type="text" placeholder="Latitude Titik Awal" class="input input-bordered"
              :class="{ 'input-error': validation.lat_titik_awal == 'invalid' }" v-model.trim="lat_titik_awal" required
              @blur="validateLatTitikAwal" />
            <label class="label" v-if="validation.lat_titik_awal == 'invalid'">
              <span class="label-text-alt text-red-500">{{ formMessage.lat_titik_awal }}</span>
            </label>
          </div> -->

          <form-input @formChange="setLatTitikAwal" @formIsValid="setFormValidity" type="text" label="Latitude Titik Awal"
            :isReadonly="false" formName="latitude titik awal" placeholder="Latitude Titik Awal" :isRequired="true" :defaultValue="lat_titik_awal"
            mode="lat"></form-input>

          <!-- <div class="form-control mb-2">
            <label class="label">
              <span class="label-text">Longitude Titik Awal</span>
            </label>
            <input type="text" placeholder="Longitude Titik Awal" class="input input-bordered"
              :class="{ 'input-error': validation.long_titik_awal == 'invalid' }" v-model.trim="long_titik_awal"
              required @blur="validateLongTitikAwal" />
            <label class="label" v-if="validation.long_titik_awal == 'invalid'">
              <span class="label-text-alt text-red-500">{{ formMessage.long_titik_awal }}</span>
            </label>
          </div> -->

          <form-input @formChange="setLongTitikAwal" @formIsValid="setFormValidity" type="text" label="Longitude Titik Awal"
            :isReadonly="false" formName="longitude titik awal" placeholder="Longitude Titik Awal" :isRequired="true" :defaultValue="long_titik_awal"
            mode="long"></form-input>

        </div>

        <div>

          <!-- <div class="grid grid-flow-col auto-cols-auto">
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
          </div> -->

          <form-input @formchange="setTitikAkhir" @formIsValid="setFormValidity" type="text" label="Titik Akhir" :isReadonly="false" formName="titik akhir" placeholder="Titik Akhir"
            :isRequired="true" :defaultValue="titik_akhir"></form-input>

          <!-- <div class="form-control mb-2">
            <label class="label">
              <span class="label-text">Latitude Titik Akhir</span>
            </label>
            <input type="text" placeholder="Latitude Titik Akhir" class="input input-bordered"
              :class="{ 'input-error': validation.lat_titik_akhir == 'invalid' }" v-model.trim="lat_titik_akhir"
              required />
            <label class="label" v-if="validation.lat_titik_akhir == 'invalid'">
              <span class="label-text-alt text-red-500">{{ formMessage.lat_titik_akhir }}</span>
            </label>
          </div> -->

          <form-input @formChange="setLatTitikAkhir" @formIsValid="setFormValidity" type="text" label="Latitude Titik Akhir"
            :isReadonly="false" formName="latitude titik akhir" placeholder="Latitude Titik Akhir" :isRequired="true" :defaultValue="lat_titik_akhir"
            mode="lat"></form-input>

          <!-- <div class="form-control mb-2">
            <label class="label">
              <span class="label-text">Longitude Titik Akhir</span>
            </label>
            <input type="text" placeholder="Longitude Titik Akhir" class="input input-bordered"
              :class="{ 'input-error': validation.long_titik_akhir == 'invalid' }" v-model.trim="long_titik_akhir"
              required @blur="validateLongTitikAkhir" />
            <label class="label" v-if="validation.long_titik_akhir == 'invalid'">
              <span class="label-text-alt text-red-500">{{ formMessage.long_titik_akhir }}</span>
            </label>
          </div> -->

          <form-input @formChange="setLongTitikAkhir" @formIsValid="setFormValidity" type="text" label="Longitude Titik Akhir"
            :isReadonly="false" formName="latitude titik akhir" placeholder="Longitude Titik Akhir" :isRequired="true" :defaultValue="long_titik_akhir"
            mode="long"></form-input>

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
      isLoading: false,
      formIsValid: false,
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
      if (!this.formIsValid) {
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
      if (!this.formIsValid) {
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
    setFormValidity(formIsValid) {
      this.formIsValid = formIsValid;
    },
    setKodeTrayek(kode_trayek) {
      this.kode_trayek = kode_trayek;
    },
    setTitikAwal(titik_awal) {
      this.titik_awal = titik_awal;
    },
    setLatTitikAwal(lat_titik_awal) {
      this.lat_titik_awal = lat_titik_awal;
    },
    setLongTitikAwal(long_titik_awal) {
      this.long_titik_awal = long_titik_awal;
    },
    setTitikAkhir(titik_akhir) {
      this.titik_akhir = titik_akhir;
    },
    setLatTitikAkhir(lat_titik_akhir) {
      this.lat_titik_akhir = lat_titik_akhir;
    },
    setLongTitikAkhir(long_titik_akhir) {
      this.long_titik_akhir = long_titik_akhir;
    },
  },
  created() {
    if (this.mode == "updateTrayek" && this.$route.params.id) {
      this.loadTrayek(this.$route.params.id);
    }
  },
};
</script>