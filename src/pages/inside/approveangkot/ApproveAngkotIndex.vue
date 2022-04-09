<template>
  <section class="flex justify-center mt-4">
    <card class="shadow-lg w-11/12">
      <base-bread-crumb :crumbs="crumbs"></base-bread-crumb>
      <p>
        <menu-title>
          <template v-slot:default> Approval Angkot </template>
          <template v-slot:menuName>
            Menampilkan list angkot yang akan disetujui untuk beroperasi
          </template>
        </menu-title>
      </p>

      <div class="tabs mt-5">
        <a
          v-for="tab in tabs"
          :key="tab"
          class="tab tab-bordered"
          :class="{ 'tab-active': currentTab == tab }"
          @click="currentTab = tab"
          >{{ capitalizeFirstLetter(tab) }}</a
        >
      </div>

      <base-alert
        v-if="alert.turn"
        :mode="alert.mode"
        :message="alert.message"
      ></base-alert>

      <div class="overflow-x-auto mt-4">
        <table class="table w-full">
          <!-- head -->
          <thead>
            <tr>
              <td>Nama Pemilik</td>
              <td>Plat Nomor</td>
              <td>Nomor HP Owner</td>
              <td>Trayek Angkot</td>
              <td>Email</td>
              <td v-if="currentTab == 'pending'">Action</td>
            </tr>
          </thead>
          <tbody>
            <tr v-if="filteredAngkot.length < 1">
              <td colspan="100%" class="text-center text-gray-500">
                Angkot {{ currentTab }} tidak ditemukan
              </td>
            </tr>
            <tr v-else v-for="angkot in filteredAngkot" :key="angkot.id">
              <td>{{ angkot.user_owner.name }}</td>
              <td>{{ angkot.plat_nomor }}</td>
              <td>{{ angkot.user_owner.phone_number }}</td>
              <td>
                {{ angkot.route.titik_awal }} - {{ angkot.route.titik_akhir }}
              </td>
              <td>{{ angkot.user_owner.email }}</td>
              <td v-if="currentTab == 'pending'">
                <button @click="updateStatusAngkot(angkot.id, 'approved')">
                  <font-awesome-icon
                    icon="check-square"
                    class="text-lg text-green-600"
                  />
                </button>

                <button @click="updateStatusAngkot(angkot.id, 'declined')">
                  <font-awesome-icon
                    icon="window-close"
                    class="text-lg text-red-600 ml-2"
                  />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </card>
  </section>
</template>

<script>
export default {
  data() {
    return {
      currentTab: "pending",
      tabs: ["pending", "approved", "declined"],
      allAngkot: [],
      isLoading: false,
      alert: {
        turn: false,
        mode: "",
        message: "",
      },
      crumbs: [
        {
          title: "Approve Angkot",
          link: {
            path: "/approveangkot",
          },
        },
      ],
    };
  },
  computed: {
    filteredAngkot() {
      return this.allAngkot.filter((angkot) => {
        return angkot.status == this.currentTab;
      });
    },
  },
  methods: {
    async getAllAngkot() {
      try {
        await this.$store.dispatch("angkot/getAllAngkot");
        this.allAngkot = this.$store.getters["angkot/getAllAngkot"];
      } catch (error) {
        this.turnOnAlert(error.message, false);
      }
    },
    async updateStatusAngkot(id, status) {
      try {
        await this.$store.dispatch("angkot/updateStatusAngkot", { id, status });
        this.getAllAngkot();
        this.turnOnAlert(`Berhasil update status angkot menjadi ${status}`, true);
      } catch (error) {
        this.turnOnAlert(error.message, false);
      }
    },
    capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    },
    turnOnAlert(message, isSucceed) {
      this.alert.turn = true;
      if (isSucceed) {
        this.alert.mode = "success";
        this.alert.message = message;
      } else if (!isSucceed) {
        this.alert.mode = "error";
        this.alert.message = message;
      }
      setTimeout(() => {
        this.alert.turn = false;
      }, 5000);
    },
  },
  created() {
    this.getAllAngkot();
  },
};
</script>