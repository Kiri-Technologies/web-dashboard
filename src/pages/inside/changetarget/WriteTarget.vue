<template>
  <section class="flex justify-center mt-4">
    <card class="shadow-lg w-11/12">
      <card-body>
        <base-bread-crumb :crumbs="crumbs"></base-bread-crumb>
        <p class="mb-5">
          <menu-title :path="{ path: '/changetarget' }">
            <template v-slot:default>
              {{ mode == "create" ? "Tambah Target" : "Update Target" }}
            </template>
            <template v-slot:menuName>
              {{
                  mode == "create"
                    ? "Menambahkan Target"
                    : "Memperbarui Target"
              }}
            </template>
          </menu-title>
        </p>
        <target-form :mode="mode"></target-form>
      </card-body>
    </card>
  </section>
</template>

<script>
import TargetForm from "../../../components/molecules/forms/TargetForm.vue";

export default {
  props: ["id"],
  components: {
    TargetForm,
  },
  data() {
    return {
      inputSuccess: false,
      mode: "",
      crumbs: [
        {
          title: "Change Target",
          link: {
            path: "/changetarget",
          },
        },
        {
          title: this.id ? "Update Target" : "Tambah Target",
          link: {
            path: this.id
              ? `/changetarget/${this.id}/update`
              : "/changetarget/create",
          },
        },
      ],
    };
  },
  created() {
    if (this.$route.params.id) {
      this.mode = "update";
    } else if (this.$route.name == "create target") {
      this.mode = "create";
    }
  },
};
</script>