<template>
  <!-- The button to open modal -->
  <a :href="modalHref">
    <slot />
  </a>
  <!-- Put this part before </body> tag -->
  <div class="modal" :id="modalId">
    <div class="modal-box">
      <h3 class="font-bold text-lg"><slot name="title" /></h3>
      <p class="py-4 text-gray-500">
        <slot name="body" />
      </p>
      <div class="modal-action justify-center">
        <a
          href="#"
          class="
            btn btn-cancel
            bg-white
            text-gray-600
            border-gray-400
            hover:bg-gray-100 hover:border-gray-100 hover:text-black
          "
          >Cancel</a
        >

        <!-- <slot name="button" /> -->
        <a
          href="#"
          class="btn btn-delete bg-red-500 border-none hover:bg-red-600"
          @click="deleteButtonClicked"
        >
          Hapus
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  emits: ["deleteButtonClicked"],
  props: {
    id: {
      required: true,
    },
  },
  computed: {
    modalId() {
      return `my-modal-${this.id}`;
    },
    modalHref() {
      return `#my-modal-${this.id}`;
    },
  },
  methods: {
    deleteButtonClicked() {
      this.$emit("deleteButtonClicked", this.id);
    },
  },
};
</script>

<style scoped>
.btn-cancel,
.btn-delete {
  width: 10em;
}
</style>