<template>
  <section class="flex justify-center mt-4">
    <card class="shadow-lg w-11/12">
      <card-body>
        <p>
          <menu-title>
            <template v-slot:default> Akun </template>
            <template v-slot:menuName>
              {{ menuName }}
            </template>
          </menu-title>
        </p>

        <profile-form @changeIsUpdate="changeIsUpdate"> </profile-form>
      </card-body>
    </card>
  </section>
</template>

<script>
import ProfileForm from "../../../components/molecules/forms/ProfileForm.vue";

export default {
  data() {
    return {
      isUpdate: false,
    };
  },
  components: {
    ProfileForm,
  },
  computed: {
    menuName() {
      if (this.isUpdate) {
        return "Perbarui Informasi Akun";
      } else {
        return "Detail Akun";
      }
    },
  },
  methods: {
    changeIsUpdate(isUpdateState) {
      this.isUpdate = isUpdateState;
    },
    async loadProfile() {
      try {
        await this.$store.dispatch("auth/getProfile");
      } catch (error) {
        this.formIsInvalid = true;
        this.errorMessage = error.message;
      }
    },
  },
  created() {
    this.loadProfile();
  },
};
</script>

