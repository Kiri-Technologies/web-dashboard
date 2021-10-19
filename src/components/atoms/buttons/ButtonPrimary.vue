<template>
  <button class="btn btn-sm btn-primary" v-if="!link">
    <slot />
  </button>
  <router-link class="btn btn-sm btn-primary" :to="to" v-else>
    <slot />
  </router-link>
</template>

<script>
export default {
  props: {
    link: {
      type: Boolean,
      required: false,
      default: false,
    },
    to: {
      type: String,
      required: false,
      default: "/",
    },
  },
};
</script>