<template>
  <section class="flex justify-center mt-4">
    <card class="shadow-lg w-11/12">
      <card-body>
        <base-bread-crumb :crumbs="crumbs"></base-bread-crumb>
        <p>
          <menu-title>
            <template v-slot:default> Detail Trayek </template>
            <template v-slot:menuName>
              Melihat Detail Trayek Terpilih
            </template>
          </menu-title>
        </p>
        <div class="flex flex-row justify-end">
          <button-primary
            :link="true"
            :to="{
              name: 'update trayek',
            }"
            size="sm"
          >
            Edit Trayek
          </button-primary>
        </div>

        <!-- detail trayek -->
        <div class="mt-5">
          <div class="grid grid-cols-2 gap-4">
            <div>
              <div class="grid grid-cols-2">
                <div>Kode Trayek</div>
                <div class="text-gray-500">: {{ kode_trayek }}</div>
              </div>
              <div class="grid grid-cols-2">
                <div>Titik Awal</div>
                <div class="text-gray-500">: {{ titik_awal }}</div>
              </div>
            </div>
            <div>
              <div class="grid grid-cols-2">
                <div>Titik Akhir</div>
                <div class="text-gray-500">: {{ titik_akhir }}</div>
              </div>
            </div>
          </div>
        </div>

        <!-- maps & halte virtual -->
        <div
          class="
            grid grid-cols-3
            mt-5
            border-solid border border-gray-300
            rounded-md
          "
        >
          <div class="grid grid-flow-row auto-rows-max p-2">
            <base-alert
              v-if="alert.turn"
              :mode="alert.mode"
              :message="alert.message"
            ></base-alert>

            <div class="grid grid-cols-3 p-2 bg-gray-200">
              <div class="col-span-2 grid content-center">
                <h1 class="font-bold">Titik Halte Virtual</h1>
              </div>
              <button-primary
                :link="true"
                size="sm"
                :to="{ name: 'create halte virtual', params: { trayekid: id } }"
                >Tambah</button-primary
              >
            </div>
            <div class="border-solid border border-gray-300 rounded-b-md">
              <div
                class="grid grid-cols-3 p-2 cursor-pointer"
                v-for="halteVirtual in allHalteVirtual"
                :key="halteVirtual.id"
                :class="{
                  'bg-gray-200': selectedHalteVirtual == halteVirtual.id,
                }"
                @click="selectHalteVirtual(halteVirtual.id)"
              >
                <div class="col-span-2">{{ halteVirtual.name }}</div>
                <div class="flex justify-end">
                  <router-link
                    :to="{
                      name: 'update halte virtual',
                      params: {
                        trayekid: id,
                        id: halteVirtual.id,
                      },
                    }"
                  >
                    <font-awesome-icon
                      icon="pen-square"
                      class="text-lg text-blue-600 ml-2"
                    />
                  </router-link>
                  <delete-modal
                    :id="halteVirtual.id"
                    @deleteButtonClicked="deleteButtonClicked"
                  >
                    <template v-slot:default>
                      <font-awesome-icon
                        icon="trash"
                        class="text-lg text-red-600 ml-2"
                      />
                    </template>
                    <template v-slot:title> Hapus Halte Virtual? </template>
                    <template v-slot:body>
                      Anda yakin untuk menghapus Halte Virtual yang dipilih?
                    </template>
                  </delete-modal>
                </div>
              </div>
            </div>
          </div>
          <div class="col-span-2">
            <google-map
              :allHalteVirtual="allHalteVirtual"
              :center="centerHalteVirtual"
            ></google-map>
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
      allHalteVirtual: [],
      selectedHalteVirtual: "",
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
      try {
        await this.$store.dispatch("halteVirtual/deleteHalteVirtual", {
          trayekid: this.id,
          id: halteVirtualId,
        });
        this.loadHalteVirtual();
        this.turnOnAlert("delete", true);
      } catch (error) {
        this.turnOnAlert("delete", false);
      }
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
  created() {
    if (this.$route.params.id) {
      this.loadTrayekById(this.$route.params.id);
      this.loadHalteVirtual();
    }
    this.setAlert();
  },
};
</script>