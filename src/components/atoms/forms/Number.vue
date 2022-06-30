<template>
    <div class="form-control my-1">
        <label class="label">
            <span class="label-text">{{ label }}</span>
        </label>
        <input type="number" :placeholder="placeholder" class="input input-bordered"
            :class="{ 'input-error': numberValidity == 'invalid' }" v-model.trim="number" @blur="validateNumber"
            @change="numberChange" :readonly="isReadonly" required/>
        <label class="label" v-if="numberValidity == 'invalid'">
            <span class="label-text-alt text-red-500">{{ formMessage }}</span>
        </label>
    </div>
</template>

<script>
export default {
    emits: ['numberChange'],
    props: {
        label: {
            type: String,
            required: true,
            default: "Number form"
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
        }
    }, 
    data() {
        return {
            number: "",
            numberValidity: "pending",
            formMessage: "",
        }
    },
    methods: {
        validateNumber() {
            if (this.number == "") {
                this.numberValidity = "invalid";
                this.formMessage = `Please enter a correct ${this.formName}`;
            } else {
                this.formMessage = "";
                this.numberValidity = "valid";
            }
        },
        numberChange(){
            this.$emit('numberChange', this.number);
        }
    },
    mounted() {
        if (this.defaultValue) {
            this.number = this.defaultValue;
        }
    },
    updated() {
        if (this.defaultValue) {
            this.number = this.defaultValue;
        }
    }
}

</script>