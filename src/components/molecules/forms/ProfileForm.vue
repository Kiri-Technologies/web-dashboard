<template>
  <div class="p-5 flex justify-center" v-if="pageLoading">
    <button class="btn bg-transparent loading text-black border-none">
      Loading data...
    </button>
  </div>
  <form @submit.prevent="submitMethod" v-else>
    <div class="w-4/5 mx-auto">
      <base-alert v-if="alert.turn" :mode="alert.mode" :message="alert.message"></base-alert>

      <form-input @formChange="setEmail" type="email" label="Email" :isReadonly="isReadonly" formName="email"
        placeholder="Email" :isRequired="true" :defaultValue="email" :mode="mode">
      </form-input>

      <!-- <form-input @formChange="setEmail" type="email" label="Email" :isReadonly="isReadonly" formName="email"
        placeholder="Email" :isRequired="true" v-if="this.mode == 'createNewAccount'"></form-input> -->

      <form-input @formChange="setName" type="name" label="Nama Lengkap" :isReadonly="isReadonly" formName="name"
        placeholder="Nama Lengkap" :isRequired="true" :defaultValue="name" :mode="mode"></form-input>

      <form-input @formChange="setPhoneNumber" type="number" label="Nomor Hp" :isReadonly="isReadonly"
        formName="phone number" placeholder="Nomor Hp" :isRequired="true" :defaultValue="phone_number" :mode="mode"></form-input>

      <form-input @formChange="setBirthdate" type="date" label="Tanggal Lahir" :isReadonly="isReadonly"
        formName="birthdate" placeholder="Tanggal Lahir" :isRequired="true" :defaultValue="birthdate" :mode="mode"></form-input>

      <form-input v-if="isUpdate" @formChange="setNewPassword" type="password"
        :label="this.mode == 'createNewAccount' ? 'Password' : 'Password baru'" :isReadonly="isReadonly"
        formName="new password" placeholder="Password baru" :isRequired="requiredByMode" :mode="mode"></form-input>

      <form-input v-if="isUpdate" @formChange="setConfirmNewPassword" type="password"
        :label="this.mode == 'createNewAccount' ? 'Ulangi password' : 'Ulangi password baru'" :isReadonly="isReadonly"
        formName="confirm new password" placeholder="Ulangi password baru" :isRequired="requiredByMode" :mode="mode"></form-input>

      <div class="flex justify-end mt-7">
        <button-primary @click="changeFormMode('update'), changeIsUpdate()" type="button" v-if="!isUpdate" size="sm">
          Update
        </button-primary>

        <button-danger v-if="
          isUpdate &&
          (this.mode == 'createNewAccount' || this.mode == 'updateAccount')
        " size="sm" :link="true" :to="{ name: 'manage account' }">
          Batal
        </button-danger>

        <button-danger v-if="isUpdate && this.mode == undefined" type="button"
          @click="changeFormMode('batal'), changeIsUpdate()" size="sm">
          Batal
        </button-danger>

        <button-primary class="ml-1" :class="loadingState" v-if="
          isUpdate &&
          (this.mode == 'createNewAccount' || this.mode == 'updateAccount')
        " size="sm" type="submit">
          Simpan
        </button-primary>

        <button-primary class="ml-1" :class="loadingState" v-if="isUpdate && this.mode == null" type="submit" size="sm">
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
      isReadonly: true,
      pageLoading: false,
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
      isLoading: false,
      oldPassword: "",
      password: "",
      password_confirmation: "",
      alert: {
        turn: false,
        mode: "",
        message: "",
      },
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
    requiredByMode(){
      if (this.mode == 'createNewAccount' || this.$route.params.id) {
        return true;
      }

      return false
    }
  },
  methods: {
    changeFormMode(mode) {
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
        this.dataBeforeUpdate.email = user.email;
        this.dataBeforeUpdate.name = user.name;
        this.dataBeforeUpdate.phone_number = user.phone_number;
        this.dataBeforeUpdate.birthdate = user.birthdate;
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

        this.isReadonly = true;
        this.isUpdate = false;
        this.changeIsUpdate();
        this.turnOnAlert("success", "Berhasil mengubah profil");
      } catch (error) {
        this.turnOnAlert("error", error.message);
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
        this.turnOnAlert("error", error.message);
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
        this.turnOnAlert("error", error.message);
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
        this.isReadonly = false;
      } else if (mode == "batal") {
        this.isReadonly = true;
      }
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
    setEmail(email) {
      this.email = email;
    },
    setName(name) {
      this.name = name;
    },
    setPhoneNumber(phone_number) {
      this.phone_number = phone_number;
    },
    setBirthdate(birthdate) {
      this.birthdate = birthdate;
    },
    setNewPassword(newPassword) {
      this.password = newPassword;
    },
    setConfirmNewPassword(confirmNewPassword) {
      this.password_confirmation = confirmNewPassword;
    },
  },
  async created() {
    this.pageLoading = true;
    if (this.mode == undefined) {
      await this.loadProfile();
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
    this.pageLoading = false;
  },
};
</script>