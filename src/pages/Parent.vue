<template>
  <navbar></navbar>
  <Sidebar>
      <router-view></router-view>
  </Sidebar>
</template>

<script>
import Sidebar from "../components/molecules/Sidebar.vue";
import Navbar from "../components/molecules/Navbar.vue";
export default {
  components: {
    Sidebar,
    Navbar,
  },
  created(){
    this.$store.dispatch('auth/autoLogin');
  }
};
</script>