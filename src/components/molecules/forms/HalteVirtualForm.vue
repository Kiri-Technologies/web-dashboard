<template>
  <form @submit.prevent="submitMethod">
    <div class="w-4/5 mx-auto">
      <base-alert v-if="alert.turn" :mode="alert.mode" :message="alert.message"></base-alert>

      <form-input type="text" label="Trayek" :isReadonly="false" formName="trayek" placeholder="Trayek"
        :isRequired="true" :defaultValue="trayek.kode_trayek" idCode="trayek"></form-input>

      <form-input @formChange="setHalteVirtualName" @formIsValid="setHalteVirtualNameValidity" type="text"
        label="Nama Halte Virtual" :isReadonly="false" formName="halte virtual name" placeholder="Contoh: Transmart Buah Batu"
        :isRequired="true" :defaultValue="nama_lokasi" idCode="halteVirtualName">
      </form-input>

      <select-input @formChange="setArah" @formIsValid="setArahValidity" label="Arah" formName="arah" :isRequired="true"
        :defaultValue="arah" disabledOption="Pilih arah..." :options="options" idCode="arah">
      </select-input>

      <form-input @formChange="setLat" @formIsValid="setLatitudeValidity" type="text" label="Titik Latitude"
        :isReadonly="false" formName="latitude" placeholder="Contoh: -6.96670545019899" :isRequired="true" :defaultValue="lat"
        mode="lat" idCode="latitude"></form-input>

      <form-input @formChange="setLong" @formIsValid="setLongitudeValidity" type="text" label="Titik Longitude"
        :isReadonly="false" formName="longitude" placeholder="Contoh: 107.6377486264246" :isRequired="true" :defaultValue="lng"
        mode="long" idCode="longitude"></form-input>

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
      arah: "",
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
      isLoading: false,
      halteVirtualnameIsValid: true,
      arahIsValid: true,
      latIsValid: true,
      longIsValid: true,
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
    options() {
      return [
        {
          value: this.trayek.titik_awal,
          name: this.trayek.titik_awal,
        },
        {
          value: this.trayek.titik_akhir,
          name: this.trayek.titik_akhir,
        },
      ]
    }
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
      if (!this.halteVirtualnameIsValid || !this.arahIsValid ||!this.latIsValid ||!this.longIsValid) {
        this.turnOnAlert("error", "Pastikan form terisi dengan benar");
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
          this.turnOnAlert("error", error.message);
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
        this.turnOnAlert("error", error.message);
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
        this.turnOnAlert("error", error.message);
      }
    },
    async updateHalteVirtual() {
      this.isLoading = true;
      if (!this.halteVirtualnameIsValid || !this.arahIsValid ||!this.latIsValid ||!this.longIsValid) {
        this.isLoading = false;
        console.log("error", this.nama_lokasi, this.route_id, this.lat, this.lng, this.arah);
        console.log(this.halteVirtualnameIsValid, this.arahIsValid, this.latIsValid, this.longIsValid)
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
        this.turnOnAlert("error", error.message);
      }
      this.isLoading = false;
    },
    turnOnAlert(mode, message) {
      this.alert.turn = true;
      this.alert.mode = mode;
      this.alert.message = message;
    },
    setHalteVirtualNameValidity(formIsValid) {
      this.halteVirtualnameIsValid = formIsValid;
    },
    setArahValidity(formIsValid) {
      this.arahIsValid = formIsValid;
    },
    setLatitudeValidity(formIsValid) {
      this.latIsValid = formIsValid;
    },
    setLongitudeValidity(formIsValid) {
      this.longIsValid = formIsValid;
    },
    setHalteVirtualName(name) {
      this.nama_lokasi = name;
    },
    setLat(lat) {
      this.lat = lat;
    },
    setLong(lng) {
      this.lng = lng;
    },
    setArah(arah) {
      this.arah = arah;
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