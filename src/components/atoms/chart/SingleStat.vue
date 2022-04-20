<template>
  <div class="stat place-items-center">
    <div class="stat-title">{{ title }}</div>
    <div class="stat-value" :class="color">{{ value }}</div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: "Stats Title",
    },
    value: {
      type: String,
      default: "0",
    },
    color: {
      type: Object,
      default: function () {
        return { 'text-black': true }
      },
    },
  },
};
</script>