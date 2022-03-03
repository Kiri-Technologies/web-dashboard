<template>
  <button class="btn btn-danger" :class="buttonSize" v-if="!link">
    <slot />
  </button>
  <router-link class="btn btn-danger" :class="buttonSize" :to="{ name: to }" v-else>
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
      } else if (this.size == "md") {
        return {
          "btn-md": true,
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