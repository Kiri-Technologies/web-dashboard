<template>
  <div class="stat place-items-center">
    <div class="stat-title">{{ title }}</div>
    <div class="stat-value" :class="color">{{ value }}</div>
    <stat-desc v-if="statDesc">
      <slot />
    </stat-desc>
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
      default: 0,
    },
    color: {
      type: Object,
      default: function () {
        return { 'text-black': true }
      },
    },
    statDescBody: {
      type: String,
      required: false,
      default: "Stats Desc",
    },
    statDesc: {
      required: false,
      type: Boolean,
      default: false
    },
  },
};
</script>