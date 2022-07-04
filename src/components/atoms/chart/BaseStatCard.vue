<template>
  <card class="shadow-lg w-100">
    <card-body>
      <div class="grid grid-flow-row auto-rows-auto">
        <div
          class="
            bg-gray-200
            text-center
            py-1
            rounded-md
            text-gray-600
            font-bold
          "
        >
          {{ title }}
        </div>
        <div class="font-bold text-5xl py-4 text-center text-kiri-green" style="color: #39ac00">
          {{ data }}
        </div>
      </div>
    </card-body>
  </card>
</template>

<script>
export default {
  props: ["title", "data"],
};
</script>