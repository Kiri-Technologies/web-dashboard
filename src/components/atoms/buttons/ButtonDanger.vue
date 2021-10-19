<template>
  <button class="btn btn-sm btn-danger" v-if="!link">
    <slot />
  </button>
  <router-link class="btn btn-sm btn-danger" :to="to" v-else>
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

<style scoped>
.btn-danger {
  background-color: #dc3545;
  border-color: #dc3545;
}
</style>