<template>
  <section class="flex justify-center mt-4">
    <card class="shadow-lg w-11/12">
      <p class="mb-5">
        <menu-title>
          <template v-slot:default>
            {{ mode == "createTrayek" ? "Tambah Trayek" : "Update Trayek" }}
          </template>
          <template v-slot:menuName>
            {{
              mode == "createTrayek"
                ? "Menambahkan Trayek Baru"
                : "Memperbarui Trayek Terpilih"
            }}
          </template>
        </menu-title>
      </p>
      <trayek-form :mode="mode"></trayek-form>
    </card>
  </section>
</template>

<script>
import TrayekForm from "../../../components/molecules/forms/TrayekForm.vue";

export default {
  data() {
    return {
      inputSuccess: false,
      mode: "",
    };
  },
  components: {
    TrayekForm,
  },
  created() {
    if (this.$route.params.id) {
      this.mode = "updateTrayek";
      console.log(this.mode);
    } else if (this.$route.name == "create new trayek") {
      this.mode = "createTrayek";
      console.log(this.mode);
    }
  },
};
</script>