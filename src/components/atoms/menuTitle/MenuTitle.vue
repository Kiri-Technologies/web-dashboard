<template>
  <router-link :to="path">
    <font-awesome-icon icon="arrow-left" />
  </router-link>
  <span class="text-xl ml-1 text-black">
    {{ heading }}
  </span>
  <span class="text-gray-400 text-sm ml-1">
    {{ subHeading }}
  </span>
</template>

<script>
export default {
  props: {
    path: {
      type: Object,
      required: false,
      default() {
        return { path: '/' };
      }
    },
    heading: {
      type: String,
      required: true
    },
    subHeading: {
      type: String,
      required: true
    }
  },
};
</script>