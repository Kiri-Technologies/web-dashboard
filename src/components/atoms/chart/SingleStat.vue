<template>
  <div class="stat place-items-center bg-white 2xl:py-4 2xl:px-6 xl:p-0">
    <div class="stat-title xl:text-sm 2xl:text-lg">{{ title }}</div>
    <div class="stat-value 2xl:text-4xl xl:text-2xl" :class="color">{{ value }}</div>
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