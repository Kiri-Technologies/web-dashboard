<template>
  <div class="text-sm breadcrumbs">
    <ul>
      <li v-for="(crumb, ci) in crumbs" :key="ci">
        <router-link :class="{ 'text-black': isLast(ci), 'text-gray-500': !isLast(ci) }" :to="crumb.link">{{ crumb.title }}</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    crumbs: {
      type: Array,
      required: true,
    },
  },
  methods: {
    isLast(index) {
      return index === this.crumbs.length - 1;
    },
  },
};
</script>