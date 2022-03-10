<template>
  <section class="flex justify-center mt-4">
    <card class="shadow-lg w-11/12">
      <base-bread-crumb :crumbs="crumbs"></base-bread-crumb>
      <p class="mb-5">
        <menu-title>
          <template v-slot:default>
            {{ mode == "createNewAccount" ? "Tambah Akun" : "Update Akun" }}
          </template>
          <template v-slot:menuName>
            {{
              mode == "createNewAccount"
                ? "Menambahkan Akun Baru"
                : "Memperbarui Akun Terpilih"
            }}
          </template>
        </menu-title>
      </p>
      <profile-form :mode="mode"> </profile-form>
    </card>
  </section>
</template>

<script>
import ProfileForm from "../../../components/molecules/forms/ProfileForm.vue";

export default {
  props: ['id'],
  data() {
    return {
      inputSuccess: false,
      mode: "",
      crumbs: [
        {
          title: "Akun",
          link: {
            path: "/manageaccount"
          }
        },
        {
          title: this.id ? "Update Akun" : "Tambah Akun",
          link: {
            path: this.id ? `/manageaccount/${this.id}/update` : '/maangeaccount/create'
          }
        }
      ]
    };
  },
  components: {
    ProfileForm,
  },
  created() {
    if (this.$route.params.id) {
      this.mode = "updateAccount";
    } else if (this.$route.name == "create new account") {
      this.mode = "createNewAccount";
    }
  },
  // mounted() {},
};
</script>

