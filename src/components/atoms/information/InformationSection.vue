<template>
    <div class="grid grid-cols-2">
        <div>{{ label }}</div>
        <div class="text-gray-500">: {{ data }}</div>
    </div>
</template>

<script>
export default {
    props: {
        label: {
            type: String,
            required: true
        },
        data: {
            required: true
        }
    }
}
</script>