<template>
  <section class="flex justify-center mt-4">
    <card class="shadow-lg w-11/12">
      <card-body>
        <base-bread-crumb :crumbs="crumbs"></base-bread-crumb>
        <p class="mb-5">
          <menu-title :path="{ path: '/trayekangkot' }"
            :heading="mode == 'createTrayek' ? 'Tambah Trayek' : 'Update Trayek'" :subHeading="mode == 'createTrayek'
            ? 'Menambahkan Trayek Baru'
            : 'Memperbarui Trayek Terpilih'">
          </menu-title>
        </p>
        <trayek-form :mode="mode"></trayek-form>
      </card-body>
    </card>
  </section>
</template>

<script>
import TrayekForm from "../../../components/molecules/forms/TrayekForm.vue";

export default {
  props: ["id"],
  data() {
    return {
      inputSuccess: false,
      mode: "",
      crumbs: [
        {
          title: "Trayek",
          link: {
            path: "/trayekangkot",
          },
        },
        {
          title: this.id ? "Update Trayek" : "Tambah Trayek",
          link: {
            path: this.id
              ? `/trayekangkot/${this.id}/update`
              : "/trayekangkot/create",
          },
        },
      ],
    };
  },
  components: {
    TrayekForm,
  },
  created() {
    if (this.$route.params.id) {
      document.title = "Update Trayek";
      this.mode = "updateTrayek";
    } else if (this.$route.name == "create new trayek") {
      this.mode = "createTrayek";
      document.title = "Create Trayek";
    }
  },
};
</script>