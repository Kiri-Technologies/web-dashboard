<template>
    <div class="form-control mb-2">
        <label class="label">
            <span class="label-text">{{ label }}</span>
        </label>
        <select class="select select-bordered" :class="{ 'input-error': formValidity == 'invalid' }" :value="formInput"
            @blur="validateForm" :required="isRequired" :readonly="isReadonly" @input="setFormInput">
            <option disabled>{{ disabledOption }}</option>
            <option v-for="(item, index) in options" :key="index" :value="item.value">{{ item.name }}</option>
        </select>
        <label class="label" v-if="message || formValidity == 'invalid'">
            <span class="label-text-alt text-gray-500" v-if="message">{{ message }}</span>
            <span class="label-text-alt text-red-500" v-if="formValidity == 'invalid'">{{
                    formMessage
            }}</span>
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
        disabledOption: {
            type: String,
            required: true,
            default: "Pilih..."
        },
        formName: {
            type: String,
            required: true,
            default: "Default form name"
        },
        message: {
            type: String,
            required: false,
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
        options: {
            type: Array,
            required: true
        },
        defaultValue: {
            required: false
        }
    },
    data() {
        return {
            formInput: "Pilih...",
            formValidity: "pending",
            formMessage: "",
        }
    },
    methods: {
        validateForm() {
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
            this.$emit("formChange", this.formInput);
            this.$emit("formIsValid", this.formValidity == 'invalid' ? false : true);
        }
    },
    mounted() {
        if (this.defaultValue !== undefined && this.defaultValue !== "") {
            this.formInput = this.defaultValue;
            this.validateForm();
        } else {
            this.formInput = this.disabledOption;
        }
        this.readonly = this.isReadonly;
    },
    updated() {
        if (this.defaultValue !== undefined && this.defaultValue !== "") {
            this.formInput = this.defaultValue;
            this.validateForm();
        }
        this.readonly = this.isReadonly;
    }
}

</script>