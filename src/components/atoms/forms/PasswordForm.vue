<template>
    <div class="form-control my-1">
        <label class="label">
            <span class="label-text">{{ label }}</span>
        </label>
        <input type="password" :placeholder="placeholder" class="input input-bordered"
            :class="{ 'input-error': passwordValidity == 'invalid' }" v-model.trim="password" @blur="validatePassword"
            @change="passwordChange" :readonly="isReadonly" />
        <label class="label" v-if="passwordValidity == 'invalid'">
            <span class="label-text-alt text-red-500">{{
                    formMessage
            }}</span>
        </label>
    </div>
</template>

<script>
export default {
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
    emits: ['passwordChange'],
    data() {
        return {
            password: "",
            passwordValidity: "pending",
            formMessage: "",
        }
    },
    methods: {
        validatePassword() {
            if (this.password == "") {
                this.passwordValidity = "invalid";
                this.formMessage = `Please enter a correct ${this.formName}`;
            } else {
                this.passwordValidity = "valid";
                this.formMessage = "";
            }
        },
        passwordChange() {
            this.$emit('passwordChange', this.password)
        }
    },
    mounted() {
        if (this.defaultValue) {
            this.password = this.defaultValue;
        }
    },
    updated() {
        if (this.defaultValue) {
            this.password = this.defaultValue;
        }
    }
}
</script>