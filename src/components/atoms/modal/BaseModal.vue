<template>
  <!-- The button to open modal -->
  <a href="#my-modal-2">
    <slot />
  </a>
  <!-- Put this part before </body> tag -->
  <div class="modal" id="my-modal-2">
    <div class="modal-box">
      <h3 class="font-bold text-lg"><slot name="title" /></h3>
      <p class="py-4 text-gray-500">
        <slot name="body" />
      </p>
      <div class="modal-action justify-center">
        <a href="#" class="btn btn-cancel bg-white text-gray-600 border-gray-400 hover:bg-gray-100 hover:border-gray-100 hover:text-black">Cancel</a>
        <a href="#" class="btn btn-delete bg-red-500 border-none hover:bg-red-600">Hapus</a>
      </div>
    </div>
  </div>
</template>

<style scoped>
.btn-cancel, .btn-delete{
  width: 10em;
}

/* .btn-cancel {
  background-color: white;
  color: #151920;
  border-color: rgba(86, 103, blue, 137, 0.26);
} */
</style>