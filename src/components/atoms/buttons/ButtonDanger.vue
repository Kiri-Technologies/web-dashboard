<template>
  <button class="btn btn-sm btn-danger" v-if="!link">
    <slot />
  </button>
  <router-link class="btn btn-sm btn-danger" :to="{ name: to }" v-else>
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
    size: {
      type: String,
      required: false,
      default: "",
    },
  },
  computed: {
    buttonSize() {
      if (this.size == "lg") {
        return {
          "btn-lg": true,
        };
      } else if (this.size == "sm") {
        return {
          "btn-sm": true,
        };
      } else if (this.size == "lg") {
        return {
          "btn-lg": true,
        };
      }

      return "";
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