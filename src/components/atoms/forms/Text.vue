<template>
    <div class="form-control my-1">
        <label class="label">
            <span class="label-text">{{ label }}</span>
        </label>
        <input type="text" :placeholder="placeholder" class="input input-bordered"
            :class="{ 'input-error': textValidity == 'invalid' }" v-model.trim="text" @blur="validateText"
            @change="textChange" :readonly="isReadonly" required />
        <label class="label" v-if="textValidity == 'invalid'">
            <span class="label-text-alt text-red-500">{{ formMessage }}</span>
        </label>
    </div>
</template>

<script>
export default {
    emits: ['textChange'],
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
            text: "",
            textValidity: "pending",
            formMessage: "",
        }
    },
    methods: {
        validateText() {
            if (this.text == "") {
                this.textValidity = "invalid";
                this.formMessage = `Please enter a correct ${this.formName}`;
            } else {
                this.formMessage = "";
                this.textValidity = "valid";
            }
        },
        textChange() {
            this.$emit('textChange', this.text);
        }
    },
    mounted() {
        if (this.defaultValue) {
            this.text = this.defaultValue;
        }
    },
    updated() {
        if (this.defaultValue) {
            this.text = this.defaultValue;
        }
    }
}

</script>