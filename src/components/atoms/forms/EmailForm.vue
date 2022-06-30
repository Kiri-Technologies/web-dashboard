<template>
  <div class="form-control my-1">
    <label class="label">
      <span class="label-text">{{ label }}</span>
    </label>
    <input type="email" :placeholder="placeholder" class="input input-bordered"
      :class="{ 'input-error': emailValidity == 'invalid' }" v-model.trim="email" @blur="validateEmail"
      @change="emailChange" :readonly="isReadonly" />
    <label class="label" v-if="emailValidity == 'invalid'">
      <span class="label-text-alt text-red-500">{{ formMessage }}</span>
    </label>
  </div>
</template>

<script>
export default {
  emits: ['emailChange'],
  props: {
    label: {
      type: String,
      required: true,
      default: "Text form"
    },
    placeholder: {
      type: String,
      required: true,
      default: "Default placeholder"
    },
    formName: {
      type: String,
      required: true,
      default: "Default form name"
    },
    isReadonly: {
      type: Boolean,
      required: true,
      default: false
    },
    defaultValue: {
      required: false
    }
  },
  data() {
    return {
      email: "",
      emailValidity: "pending",
      formMessage: "",
      reg: /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/,
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
    emailChange() {
      this.$emit("emailChange", this.email);
    }
  },
  mounted() {
    if (this.defaultValue) {
      this.email = this.defaultValue;
    }
  },
  updated() {
    if (this.defaultValue) {
      this.email = this.defaultValue;
    }
  }
};
</script>