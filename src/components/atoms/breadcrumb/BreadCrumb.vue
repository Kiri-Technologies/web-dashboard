<template>
    <a @click="changeRoute" class="cursor-pointer"
      ><font-awesome-icon icon="arrow-left"
    /></a>
    <slot />
    <span class="text-gray-400 text-sm">
      <slot name="menuName" />
    </span>
</template>

<script>
export default {
  props: {
    parentRoute: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  methods: {
    changeRoute() {
      if (this.parentRoute) {
        this.$router.push("/");
      } else {
        this.$router.go(-1);
      }
    },
  },
};
</script>