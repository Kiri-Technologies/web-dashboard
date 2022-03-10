<template>
  <section class="flex justify-center mt-4">
    <card class="shadow-lg w-11/12">
      <base-bread-crumb :crumbs="crumbs"></base-bread-crumb>
      <p>
        <menu-title>
          <template v-slot:default> Detail Trayek </template>
          <template v-slot:menuName> Melihat Detail Trayek Terpilih </template>
        </menu-title>
      </p>
      <div class="flex flex-row justify-end">
        <button-primary
          :link="true"
          :to="{
            name: 'update trayek'
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
          <div class="grid grid-cols-3 p-2 bg-gray-200">
            <div class="col-span-2 grid content-center">
              <h1 class="font-bold">Titik Halte Virtual</h1>
            </div>
            <button-primary size="sm">Tambah</button-primary>
          </div>
          <div
            class="
              grid grid-cols-3
              border-solid border border-gray-300
              rounded-b-md
              p-2
            "
          >
            <div class="col-span-2">Pasar Kordon</div>
            <div class="flex justify-end">
              <font-awesome-icon
                icon="pen-square"
                class="text-lg text-blue-600 ml-2"
              />
              <font-awesome-icon
                icon="trash"
                class="text-lg text-red-600 ml-2"
              />
            </div>
          </div>
        </div>
        <div class="col-span-2">
            <google-map></google-map>
        </div>
      </div>
    </card>
  </section>
</template>

<script>
import GoogleMap from '../../../components/molecules/map/GoogleMap.vue'
export default {
  props: ['id'],
  data() {
    return {
      kode_trayek: "",
      titik_awal: "",
      titik_akhir: "",
      crumbs: [
        {
          title: "Trayek",
          link: {
            path: "/trayekangkot"
          }
        },
        {
          title: "Detail Trayek",
          link: {
            name: 'detail trayek',
            params: {
              id: this.id
            }
          }
        }
      ]
    };
  },
  components: {
      GoogleMap
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
    // initMap() {
    //   // The location of Uluru
    //   const uluru = { lat: -25.344, lng: 131.036 };
    //   // The map, centered at Uluru
    //   const map = new google.maps.Map(document.getElementById("map"), {
    //     zoom: 4,
    //     center: uluru,
    //   });
    //   // The marker, positioned at Uluru
    //   const marker = new google.maps.Marker({
    //     position: uluru,
    //     map: map,
    //   });
    // },
  },
  created() {
    if (this.$route.params.id) {
      this.loadTrayekById(this.$route.params.id);
    }
  },
};
</script>