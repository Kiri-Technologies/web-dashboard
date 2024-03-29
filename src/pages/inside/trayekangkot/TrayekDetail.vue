<template>
  <loading v-if="isLoading"></loading>
  <section class="flex justify-center mt-4" v-else>
    <card class="shadow-lg w-11/12">
      <card-body>
        <base-bread-crumb :crumbs="crumbs"></base-bread-crumb>
        <p>
          <menu-title :path="{ path: '/trayekangkot' }" heading="Detail Trayek"
            subHeading="Melihat Detail Trayek Terpilih">
          </menu-title>
        </p>
        <div class="flex flex-row justify-end">
          <button-primary :link="true" :to="{
            name: 'update trayek',
          }" size="sm">
            Edit Trayek
          </button-primary>
        </div>

        <!-- detail trayek -->
        <div class="mt-5">
          <div class="grid grid-cols-2 gap-4">
            <div>
              <information-section label="Kode Trayek" :data="kode_trayek"></information-section>
              <information-section label="Titik Awal" :data="titik_awal"></information-section>
            </div>
            <div>
              <information-section label="Titik Akhir" :data="titik_akhir"></information-section>
            </div>
          </div>
        </div>

        <!-- maps & halte virtual -->
        <div class="
            grid grid-cols-3
            mt-5
            border-solid border border-gray-300
            rounded-md
          ">
          <div class="grid grid-flow-row auto-rows-max p-2">
            <base-alert v-if="alert.turn" :mode="alert.mode" :message="alert.message"></base-alert>

            <div class="grid grid-cols-3 p-2 bg-gray-200">
              <div class="col-span-2 grid content-center">
                <h1 class="font-bold">Titik Halte Virtual</h1>
              </div>
              <button-primary :link="true" size="sm" :to="{ name: 'create halte virtual', params: { trayekid: id } }">
                Tambah</button-primary>
            </div>
            <div class="border-solid border border-gray-300 rounded-b-md">
              <div>
                <div class="tabs justify-center">
                  <a class="tab tab-bordered" :class="{ 'tab-active': currentTab == this.titik_awal }"
                    @click="currentTab = this.titik_awal">{{ this.titik_awal }}</a>
                  <a class="tab tab-bordered" :class="{ 'tab-active': currentTab == this.titik_akhir }"
                    @click="currentTab = this.titik_akhir">{{ this.titik_akhir }}</a>
                </div>
              </div>

              <loading v-if="isMapLoading"></loading>
              <section v-else>
                <div class="text-center text-gray-500 my-5" v-if="filteredHalteVirtual.length < 1">
                  Data is empty
                </div>

                <div class="grid grid-cols-3 p-2 cursor-pointer" v-else v-for="halteVirtual in filteredHalteVirtual"
                  :key="halteVirtual.id" :class="{
                    'bg-gray-200': selectedHalteVirtual == halteVirtual.id,
                  }" @click="selectHalteVirtual(halteVirtual.id)">
                  <div class="col-span-2">{{ halteVirtual.nama_lokasi }}</div>
                  <div class="flex justify-end">
                    <router-link :to="{
                      name: 'update halte virtual',
                      params: {
                        trayekid: id,
                        id: halteVirtual.id,
                      },
                    }">
                      <font-awesome-icon icon="pen-square" class="text-lg text-blue-600 ml-2" />
                    </router-link>
                    <delete-modal :id="halteVirtual.id" @deleteButtonClicked="deleteButtonClicked">
                      <template v-slot:default>
                        <font-awesome-icon icon="trash" class="text-lg text-red-600 ml-2" />
                      </template>
                      <template v-slot:title> Hapus Halte Virtual? </template>
                      <template v-slot:body>
                        Anda yakin untuk menghapus Halte Virtual yang dipilih?
                      </template>
                    </delete-modal>
                  </div>
                </div>
              </section>

            </div>
          </div>
          <div class="col-span-2">
            <google-map :allHalteVirtual="filteredHalteVirtual" :center="centerHalteVirtual"></google-map>
          </div>
        </div>
      </card-body>
    </card>
  </section>
</template>

<script>
import GoogleMap from "../../../components/molecules/map/GoogleMap.vue";
export default {
  props: ["id"],
  data() {
    return {
      kode_trayek: "",
      titik_awal: "",
      titik_akhir: "",
      currentTab: "",
      allHalteVirtual: [],
      selectedHalteVirtual: "",
      isMapLoading: false,
      isLoading: false,
      alert: {
        turn: false,
        mode: "success",
        message: "",
      },
      crumbs: [
        {
          title: "Trayek",
          link: {
            path: "/trayekangkot",
          },
        },
        {
          title: "Detail Trayek",
          link: {
            name: "detail trayek",
            params: {
              id: this.id,
            },
          },
        },
      ],
    };
  },
  computed: {
    centerHalteVirtual() {
      if (this.selectedHalteVirtual == "" && this.allHalteVirtual.length > 0) {
        return {
          lat: this.allHalteVirtual[0].lat,
          lng: this.allHalteVirtual[0].lng,
        };
      } else if (this.allHalteVirtual.length < 1) {
        return {
          lat: -6.909904811200833,
          lng: 107.61499400618688,
        };
      } else {
        return this.allHalteVirtual.filter(
          (hv) => hv.id == this.selectedHalteVirtual
        )[0];
      }
    },
    filteredHalteVirtual() {
      return this.allHalteVirtual.filter(hv => hv.arah == this.currentTab);
    }
  },
  components: {
    GoogleMap,
  },
  methods: {
    async loadTrayekById(id) {
      try {
        await this.$store.dispatch("trayek/getTrayekById", {
          id: id,
        });
        const trayek = this.$store.getters["trayek/getTrayek"];
        this.kode_trayek = trayek.kode_trayek;
        this.titik_awal = trayek.titik_awal;
        this.titik_akhir = trayek.titik_akhir;
        this.currentTab = trayek.titik_awal;
      } catch (error) {
        console.log(error);
      }
    },
    async loadHalteVirtual() {
      try {
        await this.$store.dispatch("halteVirtual/getAllHalteVirtualByTrayek", {
          trayekid: this.id,
        });
        const halteVirtual =
          this.$store.getters["halteVirtual/getAllHalteVirtual"];
        this.allHalteVirtual = halteVirtual;
      } catch (error) {
        console.log(error);
      }
    },
    async deleteButtonClicked(halteVirtualId) {
      this.isMapLoading = true;
      try {
        await this.$store.dispatch("halteVirtual/deleteHalteVirtual", {
          id: halteVirtualId,
        });
        this.selectHalteVirtual = "";
        this.allHalteVirtual = [];
        await this.loadHalteVirtual();
        this.turnOnAlert("delete", true);
      } catch (error) {
        this.turnOnAlert("delete", false);
      }
      this.isMapLoading = false;
    },
    setAlert() {
      const alert = this.$store.getters["alert/getAlert"];
      if (alert.isActive) {
        this.turnOnAlert(alert.operation, alert.isSucceed);
        this.$store.commit("alert/revokeAlert");
      }
    },
    turnOnAlert(operation, isSucceed) {
      this.alert.turn = true;

      if (isSucceed) {
        this.alert.mode = "success";
        if (operation == "create") {
          this.alert.message = "Berhasil menambahkan halte virtual";
        } else if (operation == "delete") {
          this.alert.message = "Berhasil menghapus halte virtual";
        } else if (operation == "update") {
          this.alert.message = "Berhasil mengubah halte virtual";
        }
      } else if (!isSucceed) {
        this.alert.mode = "error";
        if (operation == "create") {
          this.alert.message = "Gagal menambahkan halte virtual";
        } else if (operation == "delete") {
          this.alert.message = "Gagal menghapus halte virtual";
        } else if (operation == "update") {
          this.alert.message = "Gagal mengupdate halte virtual";
        }
      }

      setTimeout(() => {
        this.alert.turn = false;
      }, 5000);
    },
    selectHalteVirtual(id) {
      if (id == this.selectedHalteVirtual) {
        this.selectedHalteVirtual = "";
      } else {
        this.selectedHalteVirtual = id;
      }
    },
  },
  async created() {
    document.title = "Detail Trayek";
    if (this.$route.params.id) {
      this.isLoading = true;
      try {
        await this.loadTrayekById(this.$route.params.id);
        await this.loadHalteVirtual();
      } catch (error) {
        console.log(error);
      }
      this.isLoading = false;
    }
    this.setAlert();
  },
};
</script>