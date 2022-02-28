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
      <div class="w-4/5 mx-auto">
        <base-alert
          v-if="alert.turn"
          :mode="alert.mode"
          :message="alert.message"
        ></base-alert>
      </div>
      <profile-form @changeIsUpdate="changeIsUpdate" @turnOnAlert="turnOnAlert">
      </profile-form>
    </card>
  </section>
</template>

<script>
import ProfileForm from "../../../components/molecules/forms/ProfileForm.vue";
export default {
  data() {
    return {
      isUpdate: false,
      alert: {
        turn: false,
        mode: "",
        message: "",
      },
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
    turnOnAlert(mode, message) {
      this.alert.turn = true;
      this.alert.mode = mode;
      this.alert.message = message;
    },
  },
};
</script>

