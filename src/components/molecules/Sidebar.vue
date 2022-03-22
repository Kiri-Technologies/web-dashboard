<template>
  <div class="rounded-lg bg-base-200 drawer drawer-mobile h-screen">
    <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
    <div class="drawer-side sticky">
      <label for="my-drawer-2" class="drawer-overlay"></label>
      <ul class="menu p-4 overflow-y-auto w-80">
        <li>
          <div class="card w-11/12 admin-profile-card text-white rounded-md">
            <div class="card-body px-4 py-2">
              <div class="grid grid-cols-3">
                <div>
                  <div class="avatar align-middle">
                    <div class="w-14 h-14 rounded-xl">
                      <img
                        src="https://api.lorem.space/image/face?hash=64318"
                      />
                    </div>
                  </div>
                </div>
                <div class="col-span-2 flex flex-col justify-center">
                  <p class="font-bold text-xl">{{ name }}</p>
                  <p class="text-sm">Administrator</p>
                </div>
              </div>
            </div>
          </div>
        </li>
        <li class="mt-2">
          <router-link :to="{ name: 'dashboard' }">Dashboard</router-link>
        </li>
        <li>
          <router-link :to="{ name: 'manage account' }"
            >Manage Account</router-link
          >
        </li>
        <li>
          <router-link :to="{ name: 'trayek angkot' }"
            >Trayek Angkot</router-link
          >
        </li>
        <li>
          <router-link :to="{ name: 'angkot index' }"
            >List Angkot</router-link
          >
        </li>
        <li>
          <router-link :to="{ name: 'feedback aplikasi' }"
            >Feedback Aplikasi</router-link
          >
        </li>
      </ul>
    </div>
    <div
      class="flex flex-col drawer-content overflow-scroll pb-24"
      id="content"
    >
      <label
        for="my-drawer-2"
        class="mb-4 btn btn-primary drawer-button lg:hidden"
        >open menu</label
      >
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    name() {
      return this.$store.getters["auth/profileName"];
    },
  },
};
</script>

<style scoped>
.admin-profile-card {
  background-color: #39ac00;
}

a {
  color: #52575c !important;
}

a:hover,
a:active,
a.active {
  color: black !important;
  background-color: rgb(243 244 246) !important;
}

#content {
  background-color: #dfecd8;
}
</style>