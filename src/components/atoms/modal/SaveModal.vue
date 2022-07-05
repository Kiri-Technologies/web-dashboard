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
          :id="`save-button-${id}`"
          href="#"
          class="btn btn-success bg-green-500 border-none hover:bg-green-600"
          @click="saveButtonClicked"
        >
          Simpan
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  emits: ["saveButtonClicked"],
  props: {
    id: {
      required: true,
    },
  },
  computed: {
    modalId() {
      return `save-modal-${this.id}`;
    },
    modalHref() {
      return `#save-modal-${this.id}`;
    },
  },
  methods: {
    saveButtonClicked() {
      this.$emit("saveButtonClicked", this.id);
    },
  },
};
</script>

<style scoped>
.btn-cancel,
.btn-success {
  width: 10em;
}
</style>