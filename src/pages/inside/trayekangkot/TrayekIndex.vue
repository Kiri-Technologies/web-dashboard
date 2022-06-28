<template>
  <div class="p-5 flex justify-center" v-if="isLoading">
    <button class="btn bg-transparent loading text-black border-none">
      Loading data...
    </button>
  </div>
  <section class="flex justify-center mt-4" v-else>
    <card class="shadow-lg w-11/12">
      <card-body>
        <base-bread-crumb :crumbs="crumbs"></base-bread-crumb>
        <p>
          <menu-title :path="{ path: '/' }">
            <template v-slot:default> Trayek </template>
            <template v-slot:menuName> List Trayek yang Tersedia </template>
          </menu-title>
        </p>
        <div class="flex flex-row justify-end">
          <button-primary :link="true" :to="{ name: 'create new trayek' }" size="sm">
            Tambah Trayek
          </button-primary>
        </div>
        <base-alert v-if="alert.turn" :mode="alert.mode" :message="alert.message"></base-alert>

        <div class="overflow-x-auto mt-2">
          <trayek-data-table :entries="allTrayek" @deleteButtonClicked="deleteButtonClicked"></trayek-data-table>
        </div>
      </card-body>
    </card>
  </section>
</template>

<script>
import TrayekDataTable from '../../../components/molecules/datatable/TrayekDataTable.vue';

export default {
  components: {
    TrayekDataTable
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
      allTrayek: [],
      dummyAccount: null,
      crumbs: [
        {
          title: "Trayek",
          link: {
            path: "/trayekangkot",
          },
        },
      ],
    };
  },
  methods: {
    async loadAllTrayek() {
      try {
        await this.$store.dispatch("trayek/getAllTrayek");
        const trayek = this.$store.getters["trayek/getAllTrayek"];
        this.allTrayek = trayek;
      } catch (error) {
        this.errorMessage = error.message;
        this.turnOnAlert("error", this.errorMessage);
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
          this.alert.message = "Berhasil menambahkan trayek";
        } else if (operation == "delete") {
          this.alert.message = "Berhasil menghapus trayek";
        } else if (operation == "update") {
          this.alert.message = "Berhasil mengubah trayek";
        }
      } else if (!isSucceed) {
        this.alert.mode = "error";
        if (operation == "create") {
          this.alert.message = "Gagal menambahkan trayek";
        } else if (operation == "delete") {
          this.alert.message = "Gagal menghapus trayek";
        } else if (operation == "update") {
          this.alert.message = "Gagal mengupdate trayek";
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
    this.isLoading = true;
    try {
      await this.loadAllTrayek();
      this.setAlert();
    } catch (error) {
      console.log(error.message);
    }
    this.isLoading = false;
  },
};
</script>