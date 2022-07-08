<template>
  <section class="flex justify-center mt-4">
    <card class="shadow-lg w-11/12">
      <card-body>
        <base-bread-crumb :crumbs="crumbs"></base-bread-crumb>
        <p class="mb-5">
          <menu-title :path="{
            name: 'detail trayek', params: {
              id: trayekid
            }
          }" :heading="mode == 'createHalteVirtual'
? `Tambah Halte Virtual Trayek ${trayek.titik_awal} - ${trayek.titik_akhir}`
: `Update Halte Virtual Trayek ${trayek.titik_awal} - ${trayek.titik_akhir}`" :subHeading="mode == 'createHalteVirtual'
  ? 'Menambahkan Halte Virtual'
  : 'Memperbarui Halte Virtual Terpilih'">
          </menu-title>
        </p>
        <halte-virtual-form :mode="mode" :trayekid="trayekid" :id="id"></halte-virtual-form>
      </card-body>
    </card>
  </section>
</template>

<script>
import HalteVirtualForm from "../../../components/molecules/forms/HalteVirtualForm.vue";

export default {
  props: ["trayekid", "id"],
  data() {
    return {
      inputSuccess: false,
      mode: "",
      trayek: {
        id: "",
        kode_trayek: "",
        titik_awal: "",
        titik_akhir: "",
      },
      crumbs: [
        {
          title: this.$route.params.id
            ? "Update Halte Virtual"
            : "Tambah Halte Virtual",
          link: {
            path: this.$route.params.id
              ? `/haltevirtual/${this.trayekid}/${this.$route.params.id}/update`
              : `/haltevirtual/${this.trayekid}/create`,
          },
        },
      ],
    };
  },
  components: {
    HalteVirtualForm,
  },
  methods: {
    async loadTrayek() {
      try {
        await this.$store.dispatch("trayek/getTrayekById", {
          id: this.trayekid,
        });
        const trayek = this.$store.getters["trayek/getTrayek"];
        this.trayek.kode_trayek = trayek.kode_trayek;
        this.trayek.titik_awal = trayek.titik_awal;
        this.trayek.titik_akhir = trayek.titik_akhir;
      } catch (error) {
        console.log(error);
      }
    },
  },
  created() {
    this.loadTrayek();
    if (this.$route.params.id) {
      this.mode = "updateHalteVirtual";
      document.title = "Update Halte Virtual";
    } else if (this.$route.name == "create halte virtual") {
      this.mode = "createHalteVirtual";
      document.title = "Create Halte Virtual";
    }
  },
};
</script>