<template>
  <section class="flex justify-center mt-4">
    <card class="shadow-lg w-11/12">
      <p>
        <menu-title>
          <template v-slot:default> Tambah Akun </template>
          <template v-slot:menuName> Menambahkan Akun Baru </template>
        </menu-title>
      </p>
      <profile-form
        mode="createNewAccount"
      >
      </profile-form>
    </card>
  </section>
</template>

<script>
import ProfileForm from "../../../components/molecules/forms/ProfileForm.vue";

export default {
  data() {
    return {
      inputSuccess: false,
    };
  },
  components: {
    ProfileForm,
  },
};
</script>

