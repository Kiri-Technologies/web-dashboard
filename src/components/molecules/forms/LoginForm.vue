<template>
  <form @submit.prevent="login">
    <div class="form">
      <div class="form-control my-1">
        <label class="label">
          <span class="label-text">Email</span>
        </label>
        <input
          type="email"
          placeholder="Email"
          class="input input-bordered"
          :class="{ 'input-error': emailValidity == 'invalid' }"
          v-model.trim="email"
          @blur="validateEmail"
        />
        <label class="label" v-if="emailValidity == 'invalid'">
          <span class="label-text-alt text-red-500">{{
            formMessage.email
          }}</span>
        </label>
      </div>
      <div class="form-control my-1">
        <label class="label">
          <span class="label-text">Password</span>
        </label>
        <input
          type="password"
          placeholder="Password"
          class="input input-bordered"
          :class="{ 'input-error': passwordValidity == 'invalid' }"
          v-model.trim="password"
          @blur="validatePassword"
        />
        <label class="label" v-if="passwordValidity == 'invalid'">
          <span class="label-text-alt text-red-500">{{
            formMessage.password
          }}</span>
        </label>
      </div>
      <div class="form-control my-1">
        <label class="cursor-pointer label justify-start">
          <input
            type="checkbox"
            checked="checked"
            class="checkbox"
            v-model="rememberMe"
          />
          <span class="label-text ml-2">Remember me</span>
        </label>
      </div>
      <button-primary
        class="w-full"
        :class="loadingState"
        type="submit"
      >
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
      emailValidity: "pending",
      passwordValidity: "pending",
      formMessage: {
        email: "",
        password: "",
      },
      reg: /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/,
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
      this.$emit("formError", false, "");
      this.emailValidity = "pending";
      this.passwordValidity = "pending";
      this.isLoading = true;

      if (this.email == "" || this.password == "") {
        this.$emit(
          "formError",
          true,
          "Username atau Password tidak boleh kosong"
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
        // this.formIsInvalid = true;
        // this.errorMessage = error.message;
        this.$emit("formError", true, error.message);
      }
      this.isLoading = false;
    },
    validateEmail() {
      if (this.email == "") {
        this.emailValidity = "invalid";
        this.formMessage.email = "Please enter an email";
      } else if (!this.reg.test(this.email)) {
        this.emailValidity = "invalid";
        this.formMessage.email = "Please enter a valid email address";
      } else {
        this.formMessage.email = "";
        this.emailValidity = "valid";
      }
    },
    validatePassword() {
      if (this.password == "") {
        this.passwordValidity = "invalid";
        this.formMessage.password = "Please enter a password";
      } else {
        this.passwordValidity = "valid";
        this.formMessage.password = "";
      }
    },
  },
};
</script>