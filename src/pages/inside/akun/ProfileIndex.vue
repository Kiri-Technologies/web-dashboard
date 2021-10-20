<template>
  <section class="flex justify-center mt-4">
    <card class="shadow-lg w-4/5">
      <h2 class="card-title">
        <bread-crumb>
          <template v-slot:default> Akun </template>
          <template v-slot:menuName>
            {{ menuName }}
          </template>
        </bread-crumb>
      </h2>

      <profile-form @changeIsUpdate="changeIsUpdate"> </profile-form>
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
  },
};
</script>

