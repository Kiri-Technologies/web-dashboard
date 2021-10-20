<template>
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
      <span class="label-text-alt text-red-500">{{ formMessage.email }}</span>
    </label>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      emailValidity: "pending",
      formMessage: "",
    };
  },
  methods: {
    validateEmail() {
      if (this.email == "") {
        this.emailValidity = "invalid";
        this.formMessage = "Please enter an email";
      } else if (!this.reg.test(this.email)) {
        this.emailValidity = "invalid";
        this.formMessage = "Please enter a valid email address";
      } else {
        this.formMessage = "";
        this.emailValidity = "valid";
      }
    },
  },
};
</script>