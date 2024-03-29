<template>
  <div class="p-5 flex justify-center" v-if="pageLoading">
    <button class="btn bg-transparent loading text-black border-none">
      Loading data...
    </button>
  </div>
  <form @submit.prevent="submitMethod" v-else>
    <div class="w-4/5 mx-auto">
      <base-alert v-if="alert.turn" :mode="alert.mode" :message="alert.message"></base-alert>

      <form-input @formIsValid="setEmailValidity" @formChange="setEmail" type="email" label="Email"
        :isReadonly="isReadonly" formName="email" placeholder="Contoh: akun@email.com" :isRequired="true" :defaultValue="email"
        :mode="mode" idCode="email">
      </form-input>

      <form-input @formIsValid="setNameValidity" @formChange="setName" type="name" label="Nama Lengkap"
        :isReadonly="isReadonly" formName="name" placeholder="Contoh: Aditya" :isRequired="true" :defaultValue="name"
        :mode="mode" idCode="name"></form-input>

      <form-input @formIsValid="setPhoneNumberValidity" @formChange="setPhoneNumber" type="number" label="Nomor Hp"
        :isReadonly="isReadonly" formName="phone number" placeholder="Contoh: 082218123752" :isRequired="true"
        :defaultValue="phone_number" :mode="mode" idCode="phoneNumber"></form-input>

      <form-input @formIsValid="setBirthdateValidity" @formChange="setBirthdate" type="date" label="Tanggal Lahir"
        :isReadonly="isReadonly" formName="birthdate" placeholder="Tanggal Lahir" :isRequired="true"
        :defaultValue="birthdate" :mode="mode" idCode="birthdate"></form-input>

      <form-input v-if="isUpdate" @formIsValid="setPasswordValidity" @formChange="setNewPassword" type="password"
        :label="this.mode == 'createNewAccount' ? 'Password' : 'Password baru'" :isReadonly="isReadonly"
        formName="new password" placeholder="Password baru" :isRequired="requiredByMode" :mode="mode" idCode="password"
        :validation="this.mode == 'createNewAccount' ? true : false">
      </form-input>

      <form-input v-if="isUpdate" @formIsValid="setUlangiPasswordValidity" @formChange="setConfirmNewPassword" type="password"
        :label="this.mode == 'createNewAccount' ? 'Ulangi password' : 'Ulangi password baru'" :isReadonly="isReadonly"
        formName="confirm new password" placeholder="Ulangi password baru" :isRequired="requiredByMode" :mode="mode"
        idCode="ulangiPassword" :validation="this.mode == 'createNewAccount' ? true : false"></form-input>

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
      emailIsValid: true,
      nameIsValid: true,
      phoneNumberIsValid: true,
      birthdateIsValid: true,
      passwordIsValid: true,
      ulangiPasswordIsValid: true,
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
    requiredByMode() {
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

      if (!this.emailIsValid || !this.nameIsValid ||!this.phoneNumberIsValid ||!this.birthdateIsValid ||!this.passwordIsValid ||!this.ulangiPasswordIsValid || this.password !== this.password_confirmation) {
        let message = "Pastikan input sudah sesuai";
        if (this.password !== this.password_confirmation) {
          message = "Password dan konfirmasi password harus sesuai";
        }
        this.turnOnAlert("error", message);
        this.isLoading = false;
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

      if (!this.emailIsValid || !this.nameIsValid ||!this.phoneNumberIsValid ||!this.birthdateIsValid ||!this.passwordIsValid ||!this.ulangiPasswordIsValid || this.password !== this.password_confirmation) {
        let message = "Pastikan input sudah sesuai";
        if (this.password !== this.password_confirmation) {
          message = "Password dan konfirmasi password harus sesuai";
        }
        this.turnOnAlert("error", message);
        this.isLoading = false;
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

      if (!this.emailIsValid || !this.nameIsValid ||!this.phoneNumberIsValid ||!this.birthdateIsValid ||!this.passwordIsValid ||!this.ulangiPasswordIsValid || this.password !== this.password_confirmation) {
        let message = "Pastikan input sudah sesuai";
        if (this.password !== this.password_confirmation) {
          message = "Password dan konfirmasi password harus sesuai";
        }
        this.turnOnAlert("error", message);
        this.isLoading = false;
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

      setTimeout(() => {
        this.alert.turn = false;
      }, 5000);
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
    setEmailValidity(formIsValid) {
      this.emailIsValid = formIsValid;
    },
    setNameValidity(formIsValid) {
      this.nameIsValid = formIsValid;
    },
    setPhoneNumberValidity(formIsValid) {
      this.phoneNumberIsValid = formIsValid;
    },
    setBirthdateValidity(formIsValid) {
      this.birthdateIsValid = formIsValid;
    },
    setPasswordValidity(formIsValid) {
      this.passwordIsValid = formIsValid;
    },
    setUlangiPasswordValidity(formIsValid) {
      this.ulangiPasswordIsValid = formIsValid;
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