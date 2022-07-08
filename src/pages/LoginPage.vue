<template>
  <div class="grid grid-cols-2">
    <div class="flex justify-center items-center h-screen">
      <img
        src="../assets/Loginillustration.png"
        alt="Login illustration"
        class="max-h-screen"
      />
    </div>
    <div class="flex justify-center items-center h-screen">
      <card
        class="text-center shadow-2xl 2xl:max-w-lg max-w-sm w-96 2xl:w-full"
      >
        <figure class="px-2 pt-2 flex justify-center items-center">
          <img
            src="../assets/logoKiri.png"
            class="max-w-xs max-h-48 2xl:max-w-sm 2xl:max-h-72"
          />
        </figure>
        <card-body>
          <base-alert
            v-if="formIsInvalid"
            :mode="mode"
            :message="errorMessage"
          ></base-alert>
          <login-form @formError="formError"></login-form>
        </card-body>
      </card>
    </div>
  </div>
</template>

<script>
import LoginForm from "../components/molecules/forms/LoginForm.vue";
export default {
  components: {
    LoginForm,
  },
  data() {
    return {
      formIsInvalid: false,
      errorMessage: "",
      mode: "",
    };
  },
  methods: {
    formError(formIsInvalid, errorMessage, mode) {
      this.formIsInvalid = formIsInvalid;
      this.errorMessage = errorMessage;
      this.mode = mode;
    },
  },
  created(){
    document.title = "Login";
  }
};
</script>