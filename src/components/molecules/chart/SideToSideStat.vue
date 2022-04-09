<template>
  <div class="grid grid-cols-2 gap-4 w-11/12">
    <base-stat-card
      :title="title1"
      :data="data1"></base-stat-card>
    <base-stat-card
      :title="title2"
      :data="data2"></base-stat-card>
  </div>
</template>

<script>
export default {
  props: ['title1', 'title2', 'data1', 'data2'],
}
</script>