<template>
  <loading v-if="isLoading"></loading>
  <section class="flex justify-center mt-4" v-else>
    <card class="shadow-lg w-11/12">
      <card-body>
        <base-bread-crumb :crumbs="crumbs"></base-bread-crumb>
        <p>
          <menu-title :path="{ path: '/' }"
            heading="User Premium" subHeading="List User Premium yang Terdaftar">
          </menu-title>
        </p>
        <div class="flex flex-row justify-end">
          <button-primary :link="true" :to="{ name: 'create premium user' }" size="sm">
            Tambah User Premium
          </button-primary>
        </div>
        <base-alert v-if="alert.turn" :mode="alert.mode" :message="alert.message"></base-alert>

        <div class="overflow-x-auto mt-2">
          <premium-user-data-table :entries="allPremiumUser" @deleteButtonClicked="deleteButtonClicked"></premium-user-data-table>
        </div>
      </card-body>
    </card>
  </section>
</template>

<script>
import PremiumUserDataTable from '../../../components/molecules/datatable/PremiumUserDataTable.vue';
import moment from 'moment';

export default {
  components: {
    PremiumUserDataTable
  },
  data() {
    return {
      isLoading: false,
      alert: {
        turn: false,
        mode: "",
        message: "",
      },
      allPremiumUser: [],
      crumbs: [
        {
          title: "Premium User",
          link: {
            path: "/premiumuser",
          },
        },
      ],
    };
  },
  methods: {
    async loadAllPremiumUser() {
      try {
        await this.$store.dispatch("premiumUser/getAllPremiumUser");
        const premiumUser = this.$store.getters["premiumUser/getAllPremiumUser"];
        this.allPremiumUser = premiumUser.map(pu => {
          const todayDate = moment().format("yyyy-MM-D")
          if (pu.to > todayDate) {
            pu.status = "Active";
          }else {
            pu.status = "Expired"
          }
          return pu;
        });
      } catch (error) {
        this.turnOnAlert("error", error.message);
      }
    },
    async deleteButtonClicked(mode, isSucceed) {
      this.turnOnAlert(mode, isSucceed);
    },
    turnOnAlert(operation, isSucceed) {
      this.alert.turn = true;
      if (isSucceed) {
        this.alert.mode = "success";
        if (operation == "create") {
          this.alert.message = "Berhasil menambahkan premium user";
        } else if (operation == "delete") {
          this.alert.message = "Berhasil menghapus premium user";
        } else if (operation == "update") {
          this.alert.message = "Berhasil mengubah premium user";
        }
      } else if (!isSucceed) {
        this.alert.mode = "error";
        if (operation == "create") {
          this.alert.message = "Gagal menambahkan premium user";
        } else if (operation == "delete") {
          this.alert.message = "Gagal menghapus premium user";
        } else if (operation == "update") {
          this.alert.message = "Gagal mengupdate premium user";
        }
      }

      setTimeout(() => {
        this.alert.turn = false;
      }, 5000);
    },
    setAlert() {
      const alert = this.$store.getters["alert/getAlert"];
      if (alert.isActive) {
        this.turnOnAlert(alert.operation, alert.isSucceed);
        this.$store.commit("alert/revokeAlert");
      }
    },
  },
  async created() {
    document.title = "List Premium User";
    this.isLoading = true;
    try {
      await this.loadAllPremiumUser();
      this.setAlert();
    } catch (error) {
      console.log(error.message);
    }
    this.isLoading = false;
  },
};
</script>