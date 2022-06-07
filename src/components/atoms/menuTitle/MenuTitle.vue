<template>
  <!-- <a @click="changeRoute" class="cursor-pointer"
    ><font-awesome-icon icon="arrow-left"
  /></a> -->
  <router-link :to="path">
    <font-awesome-icon icon="arrow-left" />
  </router-link>
  <span class="text-xl ml-1">
    <slot />
  </span>
  <span class="text-gray-400 text-sm ml-1">
    <slot name="menuName" />
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
  },
};
</script>