<template>
  <router-view></router-view>
</template>

<script>
export default {
  name: "App",
  computed :{
    didAutoLogout(){
      return this.$store.getters['auth/didAutoLogout'];
    }
  },
  watch: {
    didAutoLogout(newValue, oldValue){
      if (newValue && newValue !== oldValue) {
        this.$router.replace('/login')
      }
    }
  },
  created(){
    this.$store.dispatch('auth/autoLogin');
  }
};
</script>