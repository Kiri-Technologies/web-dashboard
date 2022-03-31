<template>
  <form @submit.prevent="submitMethod">
    <div class="w-4/5 mx-auto">
      <base-alert
        v-if="alert.turn"
        :mode="alert.mode"
        :message="alert.message"
      ></base-alert>
      <div class="form-control mb-2">
        <label class="label">
          <span class="label-text">Email</span>
        </label>
        <input
          type="email"
          placeholder="email"
          class="input input-bordered"
          :class="{ 'input-error': validation.email == 'invalid' }"
          ref="email"
          v-model.trim="email"
          readonly
          required
          @blur="validateEmail"
        />
        <label class="label" v-if="validation.email == 'invalid'">
          <span class="label-text-alt text-red-500">{{
            formMessage.email
          }}</span>
        </label>
      </div>
      <div class="form-control mb-2">
        <label class="label">
          <span class="label-text">Nama Lengkap</span>
        </label>
        <input
          type="text"
          placeholder="name"
          class="input input-bordered"
          :class="{ 'input-error': validation.name == 'invalid' }"
          ref="name"
          v-model.trim="name"
          readonly
          required
          @blur="validateName"
        />
        <label class="label" v-if="validation.name == 'invalid'">
          <span class="label-text-alt text-red-500">{{
            formMessage.name
          }}</span>
        </label>
      </div>
      <div class="form-control mb-2">
        <label class="label">
          <span class="label-text">Nomor Hp</span>
        </label>
        <input
          type="number"
          placeholder="Nomor Hp"
          class="input input-bordered"
          :class="{ 'input-error': validation.phone_number == 'invalid' }"
          ref="nohp"
          v-model.trim="phone_number"
          readonly
          required
          @blur="validateNoHp"
        />
        <label class="label" v-if="validation.phone_number == 'invalid'">
          <span class="label-text-alt text-red-500">{{
            formMessage.phone_number
          }}</span>
        </label>
      </div>
      <div class="form-control mb-2">
        <label class="label">
          <span class="label-text">Tanggal Lahir</span>
        </label>
        <input
          type="date"
          placeholder="birthdate"
          class="input input-bordered"
          :class="{ 'input-error': validation.birthdate == 'invalid' }"
          ref="birthdate"
          v-model.trim="birthdate"
          readonly
          required
          @blur="validateBirthdate"
        />
        <label class="label" v-if="validation.birthdate == 'invalid'">
          <span class="label-text-alt text-red-500">{{
            formMessage.birthdate
          }}</span>
        </label>
      </div>

      <!-- Password -->
      <!-- <div class="form-control mb-2" v-if="isUpdate">
        <label class="label">
          <span class="label-text">Password lama</span>
        </label>
        <input
          type="password"
          placeholder="Password lama"
          class="input input-bordered"
          v-model.trim="oldPassword"
        />
      </div> -->
      <div class="form-control mb-2" v-if="isUpdate">
        <label class="label">
          <span class="label-text">{{
            this.mode == "createNewAccount" ? "Password" : "Password baru"
          }}</span>
        </label>
        <input
          type="password"
          placeholder="Password baru"
          class="input input-bordered"
          :class="{ 'input-error': validation.password == 'invalid' }"
          v-model.trim="password"
          @blur="validatePassword"
        />
        <label class="label" v-if="validation.password == 'invalid'">
          <span class="label-text-alt text-red-500">{{
            formMessage.password
          }}</span>
        </label>
      </div>
      <div class="form-control mb-2" v-if="isUpdate">
        <label class="label">
          <span class="label-text">{{
            this.mode == "createNewAccount"
              ? "Ulangi password"
              : "Ulangi password baru"
          }}</span>
        </label>
        <input
          type="password"
          placeholder="Ulangi password baru"
          class="input input-bordered"
          :class="{
            'input-error': validation.password_confirmation == 'invalid',
          }"
          v-model.trim="password_confirmation"
          @blur="validatePasswordConfirmation"
        />
        <label
          class="label"
          v-if="validation.password_confirmation == 'invalid'"
        >
          <span class="label-text-alt text-red-500">{{
            formMessage.password_confirmation
          }}</span>
        </label>
      </div>

      <div class="flex justify-end mt-7">
        <button-primary
          @click="changeFormMode('update'), changeIsUpdate()"
          type="button"
          v-if="!isUpdate"
          size="sm"
        >
          Update
        </button-primary>

        <button-danger
          v-if="
            isUpdate &&
            (this.mode == 'createNewAccount' || this.mode == 'updateAccount')
          "
          size="sm"
          :link="true"
          :to="{ name: 'manage account' }"
        >
          Batal
        </button-danger>

        <button-danger
          v-if="isUpdate && this.mode == null"
          type="button"
          @click="changeFormMode('batal'), changeIsUpdate()"
          size="sm"
        >
          Batal
        </button-danger>

        <button-primary
          class="ml-1"
          :class="loadingState"
          v-if="
            isUpdate &&
            (this.mode == 'createNewAccount' || this.mode == 'updateAccount')
          "
          size="sm"
          type="submit"
        >
          Simpan
        </button-primary>

        <button-primary
          class="ml-1"
          :class="loadingState"
          v-if="isUpdate && this.mode == null"
          type="submit"
          size="sm"
        >
          Simpan
        </button-primary>
      </div>
    </div>
  </form>
</template>

<script>
export default {
  emits: ["changeIsUpdate", "turnOnAlert"],
  props: {
    mode: {
      type: String,
      required: false,
      default: null,
    },
  },
  data() {
    return {
      isUpdate: false,
      id: "",
      email: "",
      name: "",
      phone_number: "",
      birthdate: "",
      dataBeforeUpdate: {
        email: "",
        name: "",
        birthdate: "",
        phone_number: "",
      },
      formIsInvalid: false,
      errorMessage: true,
      isLoading: false,
      oldPassword: "",
      password: "",
      password_confirmation: "",
      validation: {
        email: "pending",
        name: "pending",
        phone_number: "pending",
        birthdate: "pending",
        password: "pending",
        password_confirmation: "pending",
      },
      formMessage: {
        email: "",
        name: "",
        phone_number: "",
        birthdate: "",
        password: "",
        password_confirmation: "",
      },
      alert: {
        turn: false,
        mode: "",
        message: "",
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
    changeFormMode(mode) {
      this.setInputValidation();
      this.setReadonlyAttribute(mode);

      if (mode === "update") {
        this.isUpdate = true;
        this.dataBeforeUpdate.email = this.email;
        this.dataBeforeUpdate.name = this.name;
        this.dataBeforeUpdate.phone_number = this.phone_number;
        this.dataBeforeUpdate.birthdate = this.birthdate;
      } else if (mode === "batal") {
        this.revokeAllData();
        this.email = this.dataBeforeUpdate.email;
        this.name = this.dataBeforeUpdate.name;
        this.birthdate = this.dataBeforeUpdate.birthdate;
        this.phone_number = this.dataBeforeUpdate.phone_number;
        this.isUpdate = false;
      }
    },
    submitMethod() {
      if (this.mode == "createNewAccount") {
        this.createNewAccount();
      } else if (this.mode == "updateAccount") {
        this.updateAdminAccount(this.id);
      } else {
        this.updateProfile();
      }
    },
    async loadProfile() {
      // Get profile pribadi dari vuex
      try {
        await this.$store.dispatch("auth/getProfile");
        const user = this.$store.getters["auth/profile"];
        this.email = user.email;
        this.name = user.name;
        this.phone_number = user.phone_number;
        this.birthdate = user.birthdate;
      } catch (error) {
        this.formIsInvalid = true;
        this.errorMessage = error.message;
      }
    },
    async updateProfile() {
      this.formIsInvalid = false;
      this.isLoading = true;

      if (!this.submitFormValidation()) {
        return;
      }

      try {
        await this.$store.dispatch("auth/updateProfile", {
          name: this.name,
          email: this.email,
          birthdate: this.birthdate,
          phone_number: this.phone_number,
          password: this.password,
        });

        if (this.password !== "") {
          await this.$store.dispatch("auth/clearAuthData");
          this.$router.replace("/login");
        }

        this.password = this.password_confirmation = "";

        this.$refs.email.setAttribute("readonly", "");
        this.$refs.name.setAttribute("readonly", "");
        this.$refs.nohp.setAttribute("readonly", "");
        this.$refs.birthdate.setAttribute("readonly", "");
        this.isUpdate = false;
        this.changeIsUpdate();
        this.turnOnAlert("success", "Berhasil mengubah profil");
      } catch (error) {
        this.formIsInvalid = true;
        this.errorMessage = error.message;
        this.turnOnAlert("error", this.errorMessage);
      }
      this.isLoading = false;
    },
    async createNewAccount() {
      this.formIsInvalid = false;
      this.isLoading = true;

      if (!this.submitFormValidation()) {
        return;
      }

      try {
        await this.$store.dispatch("auth/register", {
          name: this.name,
          email: this.email,
          birthdate: this.birthdate,
          phone_number: this.phone_number,
          password: this.password,
        });

        this.isLoading = false;

        this.$store.commit("alert/setAlert", {
          operation: "create",
          isSucceed: true,
        });

        this.$router.push({
          name: "manage account",
        });
      } catch (error) {
        this.formIsInvalid = true;
        this.errorMessage = error.message;
        this.turnOnAlert("error", this.errorMessage);
      }
      this.isLoading = false;
    },
    async getAccountById(id) {
      try {
        await this.$store.dispatch("auth/getAccountById", {
          id: id,
        });
        const user = this.$store.getters["auth/getAdminAccountById"];
        this.id = user.id;
        this.email = user.email;
        this.name = user.name;
        this.phone_number = user.phone_number;
        this.birthdate = user.birthdate;
      } catch (error) {
        console.log(error);
      }
    },
    async updateAdminAccount(id) {
      this.formIsInvalid = false;
      this.isLoading = true;

      if (!this.submitFormValidation()) {
        return;
      }

      try {
        await this.$store.dispatch("auth/updateAdminAccount", {
          id: id,
          name: this.name,
          email: this.email,
          birthdate: this.birthdate,
          phone_number: this.phone_number,
          password: this.password,
        });

        this.isLoading = false;

        this.$store.commit("alert/setAlert", {
          operation: "update",
          isSucceed: true,
        });

        this.$router.push({
          name: "manage account",
        });
      } catch (error) {
        this.formIsInvalid = true;
        this.errorMessage = error.message;
        this.turnOnAlert("error", this.errorMessage);
      }
      this.isLoading = false;
    },
    changeIsUpdate() {
      this.$emit("changeIsUpdate", this.isUpdate);
    },
    turnOnAlert(mode, message) {
      this.alert.turn = true;
      this.alert.mode = mode;
      this.alert.message = message;
    },
    setReadonlyAttribute(mode) {
      if (mode == "update") {
        this.$refs.email.removeAttribute("readonly");
        this.$refs.name.removeAttribute("readonly");
        this.$refs.nohp.removeAttribute("readonly");
        this.$refs.birthdate.removeAttribute("readonly");
      } else if (mode == "batal") {
        this.$refs.email.setAttribute("readonly", "");
        this.$refs.name.setAttribute("readonly", "");
        this.$refs.nohp.setAttribute("readonly", "");
        this.$refs.birthdate.setAttribute("readonly", "");
      }
    },
    setInputValidation() {
      this.validation.email =
        this.validation.name =
        this.validation.phone_number =
        this.validation.birthdate =
        this.validation.password =
        this.validation.password_confirmation =
          "pending";
    },
    revokeAllData() {
      this.email =
        this.name =
        this.phone_number =
        this.birthdate =
        this.password =
        this.password_confirmation =
          "";
    },
    submitFormValidation() {
      if (
        this.email == "" ||
        this.name == "" ||
        this.birthdate == "" ||
        this.phone_number == ""
        // this.password == "" ||
        // this.password_confirmation == "" ||
        // this.password !== this.password_confirmation
      ) {
        let message = "Pastikan input sudah sesuai";
        if (
          this.password !== this.password_confirmation &&
          this.password !== "" &&
          this.$route.name !== "account"
        ) {
          message = "Password dan konfirmasi password harus sesuai";
        }
        this.formIsInvalid = true;
        this.errorMessage = message;
        this.isLoading = false;
        this.turnOnAlert("error", this.errorMessage);
        return false;
      } else {
        return true;
      }
    },
    validateEmail() {
      if (this.email == "") {
        this.validation.email = "invalid";
        this.formMessage.email = "Please enter an email";
      } else if (!this.reg.test(this.email)) {
        this.validation.email = "invalid";
        this.formMessage.email = "Please enter a valid email address";
      } else {
        this.formMessage.email = "";
        this.validation.email = "valid";
      }
    },
    validateName() {
      if (this.name == "") {
        this.validation.name = "invalid";
        this.formMessage.name = "Please enter a name";
      } else {
        this.formMessage.name = "";
        this.validation.name = "valid";
      }
    },
    validateNoHp() {
      if (this.phone_number == "") {
        this.validation.phone_number = "invalid";
        this.formMessage.phone_number = "Please enter a phone number";
      } else {
        this.formMessage.phone_number = "";
        this.validation.phone_number = "valid";
      }
    },
    validateBirthdate() {
      if (this.birthdate == "") {
        this.validation.birthdate = "invalid";
        this.formMessage.birthdate = "Please enter a birthdate";
      } else {
        this.formMessage.birthdate = "";
        this.validation.birthdate = "valid";
      }
    },
    validatePassword() {
      if (this.$route.name !== "account") {
        if (this.password == "") {
          this.validation.password = "invalid";
          this.formMessage.password = "Please enter a password";
        } else {
          this.formMessage.password = "";
          this.validation.password = "valid";
        }
      }
    },
    validatePasswordConfirmation() {
      if (this.$route.name !== "account") {
        if (this.password_confirmation == "") {
          this.validation.password_confirmation = "invalid";
          this.formMessage.password_confirmation =
            "Please enter a password confirmation";
        } else {
          this.formMessage.password_confirmation = "";
          this.validation.password_confirmation = "valid";
        }
      }
    },
  },
  mounted() {
    if (this.mode == null) {
      this.loadProfile();
    } else if (this.mode == "updateAccount") {
      this.isUpdate = true;
      this.setReadonlyAttribute("update");
      if (this.$route.params.id) {
        this.getAccountById(this.$route.params.id);
      }
    } else if (this.mode == "createNewAccount") {
      this.isUpdate = true;
      this.setReadonlyAttribute("update");
    }
  },
};
</script>