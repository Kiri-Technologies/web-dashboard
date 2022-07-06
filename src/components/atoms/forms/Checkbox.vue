<template>
    <div class="form-control my-1">
        <label class="cursor-pointer label justify-start">
            <input type="checkbox" class="checkbox" v-model="checkbox" @change="checkboxChange" :id="idCode" />
            <span class="label-text ml-2">{{ label }}</span>
        </label>
    </div>
</template>

<script>
export default {
    emits: ['checkboxChange'],
    props: {
        label: {
            type: String,
            required: true,
            default: "Check box"
        },
        idCode: {
            required: true
        }
    },
    data(){
        return {
            checkbox: false
        }
    },
    methods: {
        checkboxChange(){
            this.$emit('checkboxChange', this.checkbox);
        }
    }
}
</script>