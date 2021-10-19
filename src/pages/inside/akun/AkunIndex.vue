<template>
  <section class="flex justify-center mt-4">
    <div class="card shadow-lg w-4/5">
      <div class="card-body">
        <h2 class="card-title">
          <router-link to="/"
            ><font-awesome-icon icon="arrow-left"
          /></router-link>
          Akun
          <span class="text-gray-400 text-sm">Detail Akun</span>
        </h2>

        <form @submit.prevent="updateProfile">
          <div class="w-4/5 mx-auto">
            <div class="form-control mb-2">
              <label class="label">
                <span class="label-text">Email</span>
              </label>
              <input
                type="text"
                placeholder="email"
                class="input input-bordered"
                ref="email"
                v-model="email"
                readonly
              />
            </div>
            <div class="form-control mb-2">
              <label class="label">
                <span class="label-text">Nama Lengkap</span>
              </label>
              <input
                type="text"
                placeholder="name"
                class="input input-bordered"
                ref="name"
                v-model="name"
                readonly
              />
            </div>
            <div class="form-control mb-2">
              <label class="label">
                <span class="label-text">Tanggal Lahir</span>
              </label>
              <input
                type="date"
                placeholder="birthday"
                class="input input-bordered"
                ref="birthday"
                v-model="birthday"
                readonly
              />
            </div>

            <!-- Password -->
            <div class="form-control mb-2" v-if="isUpdate">
              <label class="label">
                <span class="label-text">Password lama</span>
              </label>
              <input
                type="password"
                placeholder="Password lama"
                class="input input-bordered"
                v-model="oldPassword"
              />
            </div>
            <div class="form-control mb-2" v-if="isUpdate">
              <label class="label">
                <span class="label-text">Password baru</span>
              </label>
              <input
                type="password"
                placeholder="Password baru"
                class="input input-bordered"
                v-model="password"
              />
            </div>
            <div class="form-control mb-2" v-if="isUpdate">
              <label class="label">
                <span class="label-text">Ulangi password baru</span>
              </label>
              <input
                type="password"
                placeholder="Ulangi password baru"
                class="input input-bordered"
                v-model="password_confirmation"
              />
            </div>

            <div class="flex justify-end mt-7">
              <button
                class="btn btn-sm btn-primary"
                @click="changeFormMode('update')"
                type="button"
                v-if="!isUpdate"
              >
                Update
              </button>
              <button
                class="btn btn-sm btn-danger"
                v-if="isUpdate"
                type="button"
                @click="changeFormMode('batal')"
              >
                Batal
              </button>
              <button
                class="btn btn-sm btn-primary ml-1"
                :class="loadingState"
                v-if="isUpdate"
                type="submit"
              >
                Simpan
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      isUpdate: false,
      email: "",
      name: "",
      birthday: "2000-01-20",
      dataBeforeUpdate: {
        email: "",
        name: "",
        birthday: "",
      },
      formIsInvalid: false,
      errorMessage: true,
      isLoading: false,
      oldPassword: '',
      password: '',
      password_confirmation: '',
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
    changeFormMode(mode) {
      if (mode === "update") {
        this.isUpdate = true;
        this.$refs.email.removeAttribute("readonly");
        this.$refs.name.removeAttribute("readonly");
        this.$refs.birthday.removeAttribute("readonly");

        this.dataBeforeUpdate.email = this.email;
        this.dataBeforeUpdate.name = this.name;
        this.dataBeforeUpdate.birthday = this.birthday;
      } else if (mode === "batal") {
        this.$refs.email.setAttribute("readonly", "");
        this.$refs.name.setAttribute("readonly", "");
        this.$refs.birthday.setAttribute("readonly", "");
        this.email = this.dataBeforeUpdate.email;
        this.name = this.dataBeforeUpdate.name;
        this.birthday = this.dataBeforeUpdate.birthday;
        this.isUpdate = false;
      }
    },
    async loadProfile() {
      try {
        await this.$store.dispatch("auth/getProfile");
        const user = this.$store.getters["auth/profile"];
        this.email = user.email;
        this.name = user.name;
        this.birthday = user.birthday.split(" ")[0];
      } catch (error) {
        this.formIsInvalid = true;
        this.errorMessage = error.message;
      }
    },
    async updateProfile() {
      this.formIsInvalid = false;
      this.isLoading = true;
      if (this.email == "" && this.name == "" && this.birthday == "") {
        this.formIsInvalid = true;
        this.errorMessage = "Form salah";
        return;
      }

      try {
        await this.$store.dispatch("auth/updateProfile", {
          name: this.name,
          email: this.email,
          birthday: this.birthday,
        });

        this.$refs.email.setAttribute("readonly", "");
        this.$refs.name.setAttribute("readonly", "");
        this.$refs.birthday.setAttribute("readonly", "");
        this.isUpdate = false;
      } catch (error) {
        this.formIsInvalid = true;
        this.errorMessage = error.message;
      }
      this.isLoading = false;
    },
  },
  created() {
    this.loadProfile();
  },
};
</script>

<style scoped>
.btn-danger {
  background-color: #dc3545;
  border-color: #dc3545;
}
</style>