<template>
  <section class="flex justify-center mt-4">
    <card class="shadow-lg w-11/12">
      <p>
        <menu-title>
          <template v-slot:default> Tambah Akun </template>
          <template v-slot:menuName> Menambahkan Akun Baru </template>
        </menu-title>
      </p>
      <profile-form mode="createNewAccount"> </profile-form>
    </card>
  </section>
</template>

<script>
import ProfileForm from "../../../components/molecules/forms/ProfileForm.vue";

export default {
  data() {
    return {
      inputSuccess: false,
      mode: "",
    };
  },
  components: {
    ProfileForm,
  },
  created() {
    console.log(this.$route);
  },
  mounted() {
    if (this.$route.params.id) {
      this.mode = "updateAccount";
      console.log(this.mode);
    } else if (this.$route.name == "create new account") {
      this.mode = "createNewAccount";
      console.log(this.mode);
    }
  },
};
</script>

