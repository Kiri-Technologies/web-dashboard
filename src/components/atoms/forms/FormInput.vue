<template>
    <div class="form-control my-1">
        <label class="label">
            <span class="label-text">{{ label }}</span>
        </label>
        <input :type="type" :placeholder="placeholder" class="input input-bordered"
            :class="{ 'input-error': formValidity == 'invalid' }" @blur="validateForm" :readonly="readonly"
            :required="isRequired" @input="setFormInput" :value="formInput" :id="idCode" />
        <label class="label" v-if="formValidity == 'invalid'">
            <span class="label-text-alt text-red-500">{{ formMessage }}</span>
        </label>
    </div>
</template>

<script>
export default {
    emits: ['formChange', 'formIsValid'],
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
        },
        idCode: {
            required: true
        },
        validation: {
            type: Boolean,
            required: false,
            default: true
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
            if (this.validation) {
                if (this.type == 'email') {
                    this.validateEmail();
                } else if (this.type == 'number') {
                    this.validateNumber();
                } else if (this.mode == 'lat') {
                    this.validateLatitude();
                } else if (this.mode == 'long') {
                    this.validateLongitude();
                } else {
                    this.validateFormInput();
                }
            }
        },
        validateEmail() {
            if (this.formInput == "" || /^\s*$/.test(this.formInput)) {
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
            if (this.formInput == "" || /^\s*$/.test(this.formInput)) {
                this.formValidity = "invalid";
                this.formMessage = `Please enter a correct ${this.formName}`;
            } else {
                this.formMessage = "";
                this.formValidity = "valid";
            }
        },
        validateNumber() {
            if (this.formInput == 0 || /^\s*$/.test(this.formInput) || this.formInput > 0) {
                this.formMessage = "";
                this.formValidity = "valid";
            } else if (this.formInput < 0) {
                this.formValidity = "invalid";
                this.formMessage = "Please enter a positive number";
            }
        },
        validateLatitude() {
            if (this.formInput == "" || !isFinite(this.formInput) && !Math.abs(this.formInput) <= 90 || /^\s*$/.test(this.formInput)) {
                this.formValidity = "invalid";
                this.formMessage = "Please enter a correct latitude";
            } else {
                this.formMessage = "";
                this.formValidity = "valid";
            }
        },
        validateLongitude() {
            if (this.formInput == "" || !isFinite(this.formInput) && !Math.abs(this.formInput) <= 180 || /^\s*$/.test(this.formInput)) {
                this.formValidity = "invalid";
                this.formMessage = "Please enter a correct longitude";
            } else {
                this.formMessage = "";
                this.formValidity = "valid";
            }
        },
        setFormInput(event) {
            let textValue = event.target.value.replace(/^\s+|\s+$/gm, '');
            this.formInput = textValue;
            this.validateForm();
            this.$emit("formChange", textValue);
            this.$emit("formIsValid", this.formValidity == 'invalid' ? false : true);
        }
    },
    mounted() {
        if (this.defaultValue !== undefined && this.defaultValue !== "" && this.mode !== 'createNewAccount') {
            this.formInput = this.defaultValue;
            this.validateForm();
        }
        this.readonly = this.isReadonly;
    },
    updated() {
        if (this.defaultValue !== undefined && this.defaultValue !== "" && this.mode !== 'createNewAccount') {
            this.formInput = this.defaultValue;
            this.validateForm();
        }
        this.readonly = this.isReadonly;
    }
};
</script>