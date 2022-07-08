<template>
  <section class="flex justify-center mt-4">
    <card class="shadow-lg w-11/12">
      <card-body>
        <base-bread-crumb :crumbs="crumbs"></base-bread-crumb>
        <p class="mb-5">
          <menu-title :path="{ path: '/premiumuser' }"
            :heading="mode == 'create' ? 'Tambah Premium User' : 'Update Premium User'" :subHeading="mode == 'create'
            ? 'Menambahkan Premium User'
            : 'Memperbarui Premium User'">
          </menu-title>
        </p>
        <premium-user-form :mode="mode"></premium-user-form>
      </card-body>
    </card>
  </section>
</template>

<script>
import PremiumUserForm from "../../../components/molecules/forms/PremiumUserForm.vue";

export default {
  props: ["id"],
  components: {
    PremiumUserForm,
  },
  data() {
    return {
      inputSuccess: false,
      mode: "",
      crumbs: [
        {
          title: "Premium User",
          link: {
            path: "/premiumuser",
          },
        },
        {
          title: this.id ? "Update Premium User" : "Tambah Premium User",
          link: {
            path: this.id
              ? `/premiumuser/${this.id}/update`
              : "/premiumuser/create",
          },
        },
      ],
    };
  },
  created() {
    if (this.$route.params.id) {
      this.mode = "update";
      document.title = "Update Premium User";
    } else if (this.$route.name == "create premium user") {
      this.mode = "create";
      document.title = "Create Premium User";
    }
  },
};
</script>