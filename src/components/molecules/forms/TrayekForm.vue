<template>
  <form @submit.prevent="submitMethod">
    <div class="w-4/5 mx-auto">
      <base-alert v-if="alert.turn" :mode="alert.mode" :message="alert.message"></base-alert>

      <form-input @formChange="setKodeTrayek" @formIsValid="setKodeTrayekValidity" type="text" label="Kode Trayek"
        :isReadonly="false" formName="kode trayek" placeholder="Contoh: S-101" :isRequired="true"
        :defaultValue="kode_trayek" idCode="kodeTrayek"></form-input>

      <!-- <div class="grid grid-flow-row auto-rows-auto gap-4"> -->
        <div class="grid grid-flow-col auto-cols-auto gap-4">
          <form-input @formChange="setTitikAwal" @formIsValid="setTitikAwalValidity" type="text" label="Titik Awal"
            :isReadonly="false" formName="titik awal" placeholder="Contoh: Buah Batu" :isRequired="true"
            :defaultValue="titik_awal" idCode="titikAwal"></form-input>

          <form-input @formChange="setLatTitikAwal" @formIsValid="setLatTitikAwalValidity" type="text"
            label="Latitude Titik Awal" :isReadonly="false" formName="latitude titik awal"
            placeholder="Contoh: -6.951456042611119" :isRequired="true" :defaultValue="lat_titik_awal" mode="lat"
            idCode="latTitikAwal"></form-input>

          <form-input @formChange="setLongTitikAwal" @formIsValid="setLongTitikAwalValidity" type="text"
            label="Longitude Titik Awal" :isReadonly="false" formName="longitude titik awal"
            placeholder="Contoh: 107.63700535971714" :isRequired="true" :defaultValue="long_titik_awal" mode="long"
            idCode="longTitikAwal"></form-input>
        </div>
        <div class="grid grid-flow-col auto-cols-auto gap-4">
          <form-input @formChange="setTitikAkhir" @formIsValid="setTitikAkhirValidity" type="text" label="Titik Akhir"
            :isReadonly="false" formName="titik akhir" placeholder="Contoh: Bojongsoang" :isRequired="true"
            :defaultValue="titik_akhir" idCode="titikAkhir"></form-input>

          <form-input @formChange="setLatTitikAkhir" @formIsValid="setLatTitikAkhirValidity" type="text"
            label="Latitude Titik Akhir" :isReadonly="false" formName="latitude titik akhir"
            placeholder="Contoh: -6.98173662404552" :isRequired="true" :defaultValue="lat_titik_akhir" mode="lat"
            idCode="latTitikAkhir"></form-input>

          <form-input @formChange="setLongTitikAkhir" @formIsValid="setLongTitikAkhirValidity" type="text"
            label="Longitude Titik Akhir" :isReadonly="false" formName="latitude titik akhir"
            placeholder="Contoh: 107.63401668451586" :isRequired="true" :defaultValue="long_titik_akhir" mode="long"
            idCode="longTitikAkhir"></form-input>
        </div>

      <!-- </div> -->

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
      kodeTrayekIsValid: true,
      titikAwalIsValid: true,
      latTitikAwalIsValid: true,
      longTitikAwalIsValid: true,
      titikAkhirIsValid: true,
      latTitikAkhirIsValid: true,
      longTitikAkhirIsValid: true,
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
      if (!this.kodeTrayekIsValid || !this.titikAwalIsValid || !this.latTitikAwalIsValid || !this.longTitikAwalIsValid || !this.titikAkhirIsValid || !this.latTitikAkhirIsValid || !this.longTitikAkhirIsValid) {
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
      if (!this.kodeTrayekIsValid || !this.titikAwalIsValid || !this.latTitikAwalIsValid || !this.longTitikAwalIsValid || !this.titikAkhirIsValid || !this.latTitikAkhirIsValid || !this.longTitikAkhirIsValid) {
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
    setKodeTrayekValidity(formIsValid) {
      this.kodeTrayekIsValid = formIsValid;
    },
    setTitikAwalValidity(formIsValid) {
      this.titikAwalIsValid = formIsValid;
    },
    setLatTitikAwalValidity(formIsValid) {
      this.latTitikAwalIsValid = formIsValid;
    },
    setLongTitikAwalValidity(formIsValid) {
      this.longTitikAwalIsValid = formIsValid;
    },
    setTitikAkhirValidity(formIsValid) {
      this.titikAkhirIsValid = formIsValid;
    },
    setLatTitikAkhirValidity(formIsValid) {
      this.latTitikAkhirIsValid = formIsValid;
    },
    setLongTitikAkhirValidity(formIsValid) {
      this.longTitikAkhirIsValid = formIsValid;
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