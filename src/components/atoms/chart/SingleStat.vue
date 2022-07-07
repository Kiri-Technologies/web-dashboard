<template>
  <div class="stat place-items-center">
    <div class="stat-title">{{ title }}</div>
    <div class="stat-value" :class="color">{{ value }}</div>
    <!-- <div class="opacity-100 stat-desc" v-if="statDesc"><span class="font-bold" :class="{
      'text-green-500': percentage > target,
      'text-red-500': percentage < target,
      'text-black': percentage == target,
    }">{{ percentage }}<span v-if="isPercentage">%</span> <span v-if="percentage > 0">↗︎</span><span v-if="percentage < 0">↘︎</span><span v-if="percentage == 0">~</span></span> {{ statDescBody }}</div> -->
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
      type: Number,
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
    // isPercentage: {
    //   required: false,
    //   type: Boolean,
    //   default: false
    // },
    // percentage: {
    //   required: false,
    //   type: Number,
    //   default: 0
    // },
    // target: {
    //   required: false,
    //   type: Number,
    //   default: 0
    // }
  },
};
</script>