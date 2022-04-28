<template>
  <div class="h-screen overflow-y-hidden">
    <navbar></navbar>
    <Sidebar>
      <router-view v-slot="{ Component }">
        <transition name="menu" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </Sidebar>
  </div>
</template>

<script>
import Sidebar from "../components/molecules/Sidebar.vue";
import Navbar from "../components/molecules/Navbar.vue";
export default {
  components: {
    Sidebar,
    Navbar,
  },
  created() {
    this.$store.dispatch("auth/autoLogin");
  },
};
</script>

<style>
.menu-enter-active {
  animation: slide-fade-scale 0.25s ease;
}

.menu-leave-active {
  animation: slide-fade-scale 0.25s ease-out reverse;
}

@keyframes slide-fade-scale {
  from {
    opacity: 0;
    transform: translateY(10px) scale(0.9);
  }

  to {
    opacity: 1;
    transform: translateY(0px) scale(1);
  }
}
</style>