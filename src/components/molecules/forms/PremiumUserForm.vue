<template>
  <form @submit.prevent="submitMethod">
    <div class="w-4/5 mx-auto">
      <base-alert v-if="alert.turn" :mode="alert.mode" :message="alert.message"></base-alert>

      <form-input @formChange="setUserId" @formIsValid="setUserIdValidity" type="text" label="User ID"
        :isReadonly="false" formName="user id" placeholder="User ID" :isRequired="true" :defaultValue="user_id"
        idCode="userId"></form-input>

      <form-input @formChange="setPaymentDate" @formIsValid="setPaymentDateValidity" type="date" label="Payment Date"
        :isReadonly="false" formName="payment date" placeholder="Payment Date" :isRequired="true"
        :defaultValue="payment_date" idCode="paymentDate"></form-input>

      <form-input @formChange="setFromDate" @formIsValid="setFromValidity" type="date" label="From Date"
        :isReadonly="false" formName="from date" placeholder="From Date" :isRequired="true" :defaultValue="from"
        idCode="from">
      </form-input>

      <form-input @formChange="setToDate" @formIsValid="setToValidity" type="date" label="To Date" :isReadonly="false"
        formName="to date" placeholder="To Date" :isRequired="true" :defaultValue="to" idCode="to"></form-input>


      <div class="flex justify-end mt-7">
        <button-danger :link="true" :to="{ name: 'premium user' }" size="sm">
          Batal
        </button-danger>

        <button-primary class="ml-1" :class="loadingState" size="sm" type="submit">
          Simpan
        </button-primary>
      </div>
    </div>
  </form>
</template>

<script>
export default {
  props: {
    mode: {
      type: String,
      required: false,
    },
  },
  data() {
    return {
      id: "",
      user_id: "",
      payment_date: "",
      from: "",
      to: "",
      alert: {
        turn: false,
        mode: "",
        message: "",
      },
      isLoading: false,
      userIdIsValid: true,
      paymentDateIsValid: true,
      fromIsValid: true,
      toIsValid: true,
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
    submitMethod() {
      if (this.mode == "update" && this.$route.params.id) {
        this.updatePremiumUser();
      } else if (this.mode == "create" && !this.$route.params.id) {
        this.createPremiumUser();
      }
    },
    async createPremiumUser() {
      this.isLoading = true;
      if (!this.userIdIsValid || !this.paymentDateIsValid || !this.fromIsValid || !this.toIsValid || this.from > this.to) {
        let message = "Pastikan form terisi dengan benar";

        if (this.from > this.to) {
          message = "Tanggal From tidak boleh melebihi To";
        }

        this.turnOnAlert("error", message);
      } else {
        try {
          await this.$store.dispatch("premiumUser/createPremiumUser", {
            user_id: this.user_id,
            payment_date: this.payment_date,
            from: this.from,
            to: this.to,
          });

          this.$store.commit("alert/setAlert", {
            operation: "create",
            isSucceed: true,
          });

          this.$router.push({
            name: "premium user"
          });
        } catch (error) {
          this.turnOnAlert("error", error.message);
        }
      }
      this.isLoading = false;
    },
    async loadPremiumUser(id) {
      try {
        await this.$store.dispatch("premiumUser/getPremiumUserById", {
          id: id,
        });
        const premiumUser = this.$store.getters["premiumUser/getPremiumUser"];
        this.id = premiumUser.id;
        this.user_id = premiumUser.user_id;
        this.payment_date = premiumUser.payment_date;
        this.from = premiumUser.from;
        this.to = premiumUser.to;
      } catch (error) {
        this.turnOnAlert("error", error.message);
      }
    },
    async updatePremiumUser() {
      this.isLoading = true;
      if (!this.userIdIsValid || !this.paymentDateIsValid || !this.fromIsValid || !this.toIsValid || this.from > this.to) {
        let message = "Pastikan form terisi dengan benar";

        if (this.from > this.to) {
          message = "Tanggal From tidak boleh melebihi To";
        }

        this.turnOnAlert("error", message);
      } else {
        try {
          await this.$store.dispatch("premiumUser/updatePremiumUserById", {
            id: this.$route.params.id,
            user_id: this.user_id,
            payment_date: this.payment_date,
            from: this.from,
            to: this.to,
          });

          this.$store.commit("alert/setAlert", {
            operation: "update",
            isSucceed: true,
          });

          this.$router.push({
            name: "premium user"
          });
        } catch (error) {
          this.turnOnAlert("error", error.message);
        }
      }
      this.isLoading = false;
    },
    turnOnAlert(mode, message) {
      this.alert.turn = true;
      this.alert.mode = mode;
      this.alert.message = message;
    },
    setUserIdValidity(formIsValid) {
      this.userIdIsValid = formIsValid;
    },
    setPaymentDateValidity(formIsValid) {
      this.paymentDateIsValid = formIsValid;
    },
    setFromValidity(formIsValid) {
      this.fromIsValid = formIsValid;
    },
    setToValidity(formIsValid) {
      this.toIsValid = formIsValid;
    },
    setUserId(user_id) {
      this.user_id = user_id;
    },
    setPaymentDate(payment_date) {
      this.payment_date = payment_date;
    },
    setFromDate(from) {
      this.from = from;
    },
    setToDate(to) {
      this.to = to;
    },
  },
  created() {
    if (this.mode == "update" && this.$route.params.id) {
      this.loadPremiumUser(this.$route.params.id);
    }
  },
};
</script>