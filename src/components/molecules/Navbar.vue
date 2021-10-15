<template>
  <div class="navbar shadow-lg bg-green-600 text-neutral-content">
    <div class="flex-none px-2 mx-2">
      <span class="text-lg font-bold"> daisyUI </span>
    </div>
    <div class="flex-1 px-2 mx-2">
    </div>
    <div class="flex-none">
      <div class="dropdown dropdown-end">
        <div tabindex="0" class="m-1 btn btn-ghost btn-sm rounded-btn">Hello {{ name }}</div>
        <ul
          tabindex="0"
          class="p-2 shadow menu dropdown-content bg-base-100 rounded-box w-52"
        >
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
    name(){
      return this.$store.getters['auth/profileName'];
    }
  },
  methods: {
    getProfile(){
      try{
        this.$store.dispatch('auth/getProfile');
      }catch(error){
        console.log(error);
      }
    },
    logout(){
      try{
        this.$store.dispatch('auth/logout');
        this.$router.replace('/login');
      }catch(error){
        console.log(error);
      }
    }
  },
  created(){
    this.getProfile();
  }
};
</script>