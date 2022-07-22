<template>
  <div class="rounded-lg bg-white drawer drawer-mobile h-screen">
    <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
    <div class="drawer-side sticky">
      <label for="my-drawer-2" class="drawer-overlay"></label>
      <ul class="menu p-4 pb-20 overflow-y-auto w-70">
        <!-- <li>
          <div class="card w-11/12 admin-profile-card text-white rounded-md">
            <div class="card-body px-4 py-2">
              <div class="grid grid-cols-3">
                <div>
                  <div class="avatar align-middle">
                    <div class="w-10 h-10 rounded-xl">
                      <img src="https://api.lorem.space/image/face?hash=64318" />
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
        </li> -->
        <li class="mt-2">
          <router-link :to="{ name: 'dashboard' }">Dashboard</router-link>
        </li>
        <li>
          <router-link :to="{ name: 'approve angkot' }">
            Approval Angkot
          </router-link>
        </li>
        <li>
          <router-link :to="{ name: 'change target' }">
            Change Target
          </router-link>
        </li>
        <li>
          <a @click="showRiwayatMenu">
            Riwayat
            <span class="ml-2" ref="caret1">
              <font-awesome-icon icon="caret-up" />
            </span>
          </a>
          <transition name="dropdown" mode="out-in">
            <ul v-if="riwayatMenuIsShowed">
              <li>
                <router-link :to="{ name: 'riwayat pendapatan' }">
                  Pendapatan
                </router-link>
              </li>
              <li>
                <router-link :to="{ name: 'riwayat perjalanan' }">
                  Perjalanan
                </router-link>
              </li>
            </ul>
          </transition>
        </li>
        <li>
          <a @click="showListMenu">
            List
            <span class="ml-2" ref="caret2">
              <font-awesome-icon icon="caret-up" />
            </span>
          </a>
          <transition name="dropdown" mode="out-in">
            <ul v-if="listMenuIsShowed">
              <li>
                <router-link :to="{ name: 'manage account' }">
                  Akun
                </router-link>
              </li>
              <li>
                <router-link :to="{ name: 'angkot index' }">
                  Angkot
                </router-link>
              </li>
              <li>
                <router-link :to="{ name: 'trayek angkot' }">
                  Trayek
                </router-link>
              </li>
              <li>
                <router-link :to="{ name: 'feedback aplikasi' }">
                  Feedback Aplikasi
                </router-link>
              </li>
              <li>
                <router-link :to="{ name: 'premium user' }">
                  Premium User
                </router-link>
              </li>
            </ul>
          </transition>
        </li>
        <div class="h-full text-center flex flex-col justify-end pt-5">
          <p class="text-xs">Copyright © Kiri 2022</p>
          <p class="text-xs">All right reserved</p>
        </div>
      </ul>
    </div>
    <div class="flex flex-col drawer-content overflow-scroll xl:pb-20 " id="content">
      <label for="my-drawer-2" class="mb-4 btn btn-primary drawer-button lg:hidden">open menu</label>
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      riwayatMenuIsShowed: false,
      listMenuIsShowed: false,
    };
  },
  computed: {
    name() {
      return this.$store.getters["auth/profileName"];
    },
  },
  methods: {
    showRiwayatMenu() {
      this.riwayatMenuIsShowed = !this.riwayatMenuIsShowed;
      if (this.riwayatMenuIsShowed) {
        this.$refs.caret1.classList.add('rotate180');
        this.$refs.caret1.classList.remove('rotate0');
      } else {
        this.$refs.caret1.classList.add('rotate0');
        this.$refs.caret1.classList.remove('rotate180');
      }
    },
    showListMenu() {
      this.listMenuIsShowed = !this.listMenuIsShowed;
      if (this.listMenuIsShowed) {
        this.$refs.caret2.classList.add('rotate180');
        this.$refs.caret2.classList.remove('rotate0');
      } else {
        this.$refs.caret2.classList.add('rotate0');
        this.$refs.caret2.classList.remove('rotate180');
      }
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

#caret-1 {
  transform: rotate(180deg);
}

.rotate180 {
  transform: rotate(180deg);
  transition-duration: 0.3s;
}

.rotate0 {
  transform: rotate(0deg);
  transition-duration: 0.3s;
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

.dropdown-enter-active {
  animation: slide-fade 0.3s ease-out;
}

.dropdown-leave-active {
  animation: slide-fade 0.3s ease-in reverse;
}

@keyframes slide-fade {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }

  to {
    opacity: 1;
    transform: translateY(0px);
  }
}

.footer-green {
  background-color: #D5E8CA;
}
</style>