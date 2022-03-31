<template>
  <button class="btn btn-warning" :class="buttonSize" v-if="!link">
    <slot />
  </button>
  <router-link class="btn btn-warning" :class="buttonSize" :to="to" v-else>
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
      type: Object,
      required: false,
      default() {
        return { path: "/" };
      },
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