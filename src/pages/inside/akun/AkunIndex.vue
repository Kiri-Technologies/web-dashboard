<template>
  <section class="flex justify-center mt-4">
    <div class="card shadow-lg w-4/5">
      <div class="card-body">
        <h2 class="card-title">
          <router-link to="/"
            ><font-awesome-icon icon="arrow-left"
          /></router-link>
          Akun
          <span class="text-gray-400 text-sm">Detail Akun</span>
        </h2>

        <div class="w-4/5 mx-auto">
          <div class="form-control mb-2">
            <label class="label">
              <span class="label-text">email</span>
            </label>
            <input
              type="text"
              placeholder="email"
              class="input input-bordered"
              ref="email"
              readonly
            />
          </div>
          <div class="form-control mb-2">
            <label class="label">
              <span class="label-text">Nama Lengkap</span>
            </label>
            <input
              type="text"
              placeholder="name"
              class="input input-bordered"
              ref="name"
              readonly
            />
          </div>
          <div class="form-control mb-2">
            <label class="label">
              <span class="label-text">Tanggal Lahir</span>
            </label>
            <input
              type="date"
              placeholder="tanggalLahir"
              class="input input-bordered"
              ref="tanggalLahir"
              readonly
            />
          </div>
          <div class="flex justify-end mt-7">
            <button class="btn btn-sm btn-primary" @click="changeFormMode">Update</button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      isUpdate: false,
    };
  },
  computed: {
    changeFormType() {
      if (this.isUpdate) {
        console.log(this.$refs.email);
      }
      return 'readonly';
    },
  },
  methods: {
    changeFormMode() {
      this.isUpdate = true;
      console.log('halo');
      console.log(this.$refs.email);
    },
  },
};
</script>