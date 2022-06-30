<template>
  <form @submit.prevent="login">
    <div class="form">
      <form-input @formChange="setEmail" type="email" label="Email" :isReadonly="false" formName="email" placeholder="Email" :isRequired="true"></form-input>
      <form-input @formChange="setPassword" type="password" label="Password" :isReadonly="false" formName="password" placeholder="Password" :isRequired="true"></form-input>
      <checkbox-form @checkboxChange="setRememberMe" label="Remember me"></checkbox-form>
      <button-primary class="w-full" :class="loadingState" type="submit">
        Masuk
      </button-primary>
    </div>
  </form>
</template>

<script>
/* eslint-disable */
export default {
  emits: ["formError"],
  data() {
    return {
      password: "",
      email: "",
      isLoading: false,
      rememberMe: false,
    };
  },
  computed: {
    loadingState() {
      if (this.isLoading) {
        return {
          loading: true,
        };
      } else {
        return {
          loading: false,
        };
      }
    },
  },
  methods: {
    async login() {
      this.$emit("formError", false, "", "error");
      this.emailValidity = "pending";
      this.passwordValidity = "pending";
      this.isLoading = true;

      if (this.email == "" || this.password == "") {
        this.$emit(
          "formError",
          true,
          "Username atau Password tidak boleh kosong",
          "error"
        );
        this.isLoading = false;
        return;
      }

      try {
        await this.$store.dispatch("auth/login", {
          email: this.email,
          password: this.password,
          rememberMe: this.rememberMe,
        });
        this.$router.replace("/");
      } catch (error) {
        this.$emit("formError", true, error.message, "error");
      }
      this.isLoading = false;
    },
    setEmail(email) {
      this.email = email;
    },
    setPassword(password) {
      this.password = password;
    },
    setRememberMe(rememberMe) {
      this.rememberMe = rememberMe;
    },
  },
};
</script>