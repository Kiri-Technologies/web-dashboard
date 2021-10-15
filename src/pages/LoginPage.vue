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
      <div
        class="
          card
          text-center
          shadow-2xl
          2xl:max-w-lg
          max-w-sm
          w-96
          2xl:w-full
        "
      >
        <figure class="px-2 pt-2 flex justify-center items-center">
          <img
            src="../assets/logoKiri.png"
            class="max-w-xs max-h-48 2xl:max-w-sm 2xl:max-h-72"
          />
        </figure>
        <div class="card-body">
          <div class="alert alert-error" v-if="formIsInvalid">
            <div class="flex-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                class="w-6 h-6 mx-2 stroke-current"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
                ></path>
              </svg>
              <label>{{ errorMessage }}</label>
            </div>
          </div>

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
                  v-model.trim="email"
                />
              </div>
              <div class="form-control my-1">
                <label class="label">
                  <span class="label-text">Password</span>
                </label>
                <input
                  type="password"
                  placeholder="Password"
                  class="input input-bordered"
                  v-model.trim="password"
                />
              </div>
              <div class="form-control my-1">
                <label class="cursor-pointer label justify-start">
                  <input type="checkbox" checked="checked" class="checkbox" />
                  <span class="label-text ml-2">Remember me</span>
                </label>
              </div>
              <button
                class="btn bg-blue-500 border-none w-full hover:bg-blue-700"
                :class="loadingState"
                type="submit"
              >
                Masuk
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      password: "",
      email: "",
      formIsInvalid: false,
      errorMessage: "",
      isLoading: false,
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
      this.formIsInvalid = false;
      this.isLoading = true;

      if (this.email == "" || this.password == "") {
        this.formIsInvalid = true;
        this.errorMessage = "Username atau Password salah";
        this.isLoading = false;
        return;
      }

      try {
        await this.$store.dispatch("auth/login", {
          email: this.email,
          password: this.password,
        });
        this.$router.replace("/");
      } catch (error) {
        this.formIsInvalid = true;
        this.errorMessage = error.message;
      }
      this.isLoading = false;
    },
  },
};
</script>