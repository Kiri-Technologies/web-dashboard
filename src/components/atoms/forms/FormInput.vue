<template>
    <div class="form-control my-1">
        <label class="label">
            <span class="label-text">{{ label }}</span>
        </label>
        <input :type="type" :placeholder="placeholder" class="input input-bordered"
            :class="{ 'input-error': formValidity == 'invalid' }" @blur="validateForm" :readonly="readonly"
            :required="isRequired" @input="setFormInput" :value="formInput" />
        <label class="label" v-if="formValidity == 'invalid'">
            <span class="label-text-alt text-red-500">{{ formMessage }}</span>
        </label>
    </div>
</template>

<script>
export default {
    emits: ['formChange'],
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
        },
        isRequired: {
            type: Boolean,
            required: true,
            default: false
        },
        type: {
            type: String,
            required: true,
            default: 'text'
        },
        mode: {
            type: String,
            required: false
        },
        defaultValue: {
            required: false
        }
    },
    data() {
        return {
            formInput: "",
            formValidity: "pending",
            formMessage: "",
            readonly: false,
            reg: /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/,
        };
    },
    methods: {
        validateForm() {
            if (this.type == 'email') {
                this.validateEmail();
            } else {
                this.validateFormInput();
            }
        },
        validateEmail() {
            if (this.formInput == "") {
                this.formValidity = "invalid";
                this.formMessage = "Please enter an email";
            } else if (!this.reg.test(this.formInput)) {
                this.formValidity = "invalid";
                this.formMessage = "Please enter a valid email address";
            } else {
                this.formMessage = "";
                this.formValidity = "valid";
            }
        },
        validateFormInput() {
            if (this.formInput == "") {
                this.formValidity = "invalid";
                console.log(this.formInput);
                this.formMessage = `Please enter a correct ${this.formName}`;
            } else {
                this.formMessage = "";
                this.formValidity = "valid";
            }
        },
        setFormInput(event) {
            let textValue = event.target.value;
            this.formInput = textValue;
            this.$emit("formChange", textValue);
        }
    },
    mounted() {
        if (this.defaultValue !== undefined && this.mode !== 'createNewAccount') {
            this.formInput = this.defaultValue;
            this.validateForm();
        }
        this.readonly = this.isReadonly;
    },
    updated() {
        if (this.defaultValue !== undefined && this.mode !== 'createNewAccount') {
            this.formInput = this.defaultValue;
            this.validateForm();
        }
        this.readonly = this.isReadonly;
    }
};
</script>