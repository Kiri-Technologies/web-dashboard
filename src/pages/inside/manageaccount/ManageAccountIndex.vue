<template>
  <loading v-if="isLoading"></loading>
  <section class="flex justify-center mt-4" v-else>
    <card class="shadow-lg w-11/12">
      <card-body>
        <base-bread-crumb :crumbs="crumbs"></base-bread-crumb>
        <p>
          <menu-title :path="{ path: '/' }" heading="Akun" :subHeading="menuName">
          </menu-title>
        </p>
        <div class="flex flex-row justify-end">
          <button-primary :link="true" :to="{ name: 'create new account' }" size="sm">
            Tambah Akun
          </button-primary>
        </div>
        <base-alert v-if="alert.turn" :mode="alert.mode" :message="alert.message"></base-alert>
        <div class="overflow-x-auto mt-2">

          <manage-account-data-table :entries="allAccount" @deleteButtonClicked="deleteButtonClicked">
          </manage-account-data-table>
        </div>
      </card-body>
    </card>
  </section>
</template>

<script>
import ManageAccountDataTable from "../../../components/molecules/datatable/ManageAccountDataTable.vue";

export default {
  components: {
    ManageAccountDataTable
  },
  data() {
    return {
      isLoading: false,
      menuName: "List akun yang tersedia",
      alert: {
        turn: false,
        mode: "",
        message: "",
      },
      allAccount: [],
      dummyAccount: null,
      crumbs: [
        {
          title: "Akun",
          link: {
            path: "/manageaccount",
          },
        },
      ],
    };
  },
  methods: {
    async loadAllAccount() {
      try {
        await this.$store.dispatch("auth/getAllAccount");
        const user = this.$store.getters["auth/getAllAccount"];
        this.allAccount = user;
      } catch (error) {
        this.errorMessage = error.message;
      }
    },
    async deleteButtonClicked(mode, isSucceed) {
      if (isSucceed) {
        await this.loadAllAccount();
      }
      this.turnOnAlert(mode, isSucceed);
    },
    turnOnAlert(operation, isSucceed) {
      this.alert.turn = true;

      if (isSucceed) {
        this.alert.mode = "success";
        if (operation == "create") {
          this.alert.message = "Berhasil menambahkan akun";
        } else if (operation == "delete") {
          this.alert.message = "Berhasil menghapus akun";
        } else if (operation == "update") {
          this.alert.message = "Berhasil mengubah akun";
        }
      } else if (!isSucceed) {
        this.alert.mode = "error";
        if (operation == "create") {
          this.alert.message = "Gagal menambahkan akun";
        } else if (operation == "delete") {
          this.alert.message = "Gagal menghapus akun";
        } else if (operation == "update") {
          this.alert.message = "Gagal mengupdate akun";
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
    document.title = "List Akun Admin";
    this.isLoading = true;
    try {
      await this.loadAllAccount();
      this.setAlert();
    } catch (error) {
      console.log(error.message)
    }
    this.isLoading = false;
  },
};
</script>