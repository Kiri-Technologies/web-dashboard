<template>
  <div class="navbar shadow-lg text-neutral-content">
    <div class="flex-none px-2 mx-2">
      <span class="text-lg font-bold"> Kiri Dashboard </span>
    </div>
    <div class="flex-1 px-2 mx-2"></div>
    <div class="flex-none">
      <div class="dropdown dropdown-end">
        <div tabindex="0" class="m-1 btn btn-ghost btn-sm rounded-btn">
          {{ name }}
        </div>
        <ul
          tabindex="0"
          class="p-2 shadow menu dropdown-content bg-base-100 rounded-box w-52"
        >
          <li class="text-black">
            <router-link :to="{ name: 'account' }">Profile</router-link>
          </li>
          <li class="text-black">
            <a @click="logout">Logout</a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      open: false,
    };
  },
  computed: {
    name() {
      return this.$store.getters["auth/profileName"];
    },
  },
  methods: {
    getProfile() {
      try {
        this.$store.dispatch("auth/getProfile");
      } catch (error) {
        console.log(error);
      }
    },
    async logout() {
      try {
        await this.$store.dispatch("auth/logout");
        this.$router.replace("/login");
      } catch (error) {
        console.log(error);
      }
    },
  },
  created() {
    this.getProfile();
  },
};
</script>

<style scoped>
.navbar {
  background-color: #39ac00;
}

a:hover,
a:active, 
a.active {
  color: black !important;
  background-color: rgb(243 244 246) !important;
}

</style>