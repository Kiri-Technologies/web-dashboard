<template>
  <section class="flex justify-center mt-4">
    <card class="shadow-lg w-11/12">
      <base-bread-crumb :crumbs="crumbs"></base-bread-crumb>
      <p>
        <menu-title>
          <template v-slot:default> Akun </template>
          <template v-slot:menuName>
            {{ menuName }}
          </template>
        </menu-title>
      </p>
      <div class="flex flex-row justify-end">
        <button-primary :link="true" :to="{ name: 'create new account'}" size="sm">
          Tambah Akun
        </button-primary>
      </div>
      <base-alert
        v-if="alert.turn"
        :mode="alert.mode"
        :message="alert.message"
      ></base-alert>
      <div class="overflow-x-auto mt-2">
        <table class="table w-full">
          <!-- head -->
          <thead>
            <tr>
              <th>Nama</th>
              <th>Email</th>
              <th>Tanggal Lahir</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="emptyAccount">
              <td colspan="100%" class="text-center">Tidak ada akun yang tersedia</td>
            </tr>
            <tr v-else v-for="account in allAccount" :key="account.id">
              <td>{{ account.name }}</td>
              <td>{{ account.email }}</td>
              <td>{{ changeDateFormat(account.birthdate) }}</td>
              <td>
                <router-link
                  :to="{
                    name: 'update admin account',
                    params: {
                      id: account.id,
                    },
                  }"
                  ><font-awesome-icon
                    icon="pen-square"
                    class="text-lg text-blue-600"
                /></router-link>

                <delete-modal
                  :id="account.id"
                  @deleteButtonClicked="deleteButtonClicked"
                >
                  <template v-slot:default>
                    <font-awesome-icon
                      icon="trash"
                      class="text-lg text-red-600 ml-2"
                    />
                  </template>
                  <template v-slot:title> Hapus akun? </template>
                  <template v-slot:body>
                    Anda yakin untuk menghapus Akun yang dipilih?
                  </template>
                </delete-modal>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </card>
  </section>
</template>

<script>
import moment from "moment";
export default {
  data() {
    return {
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
            path: "/manageaccount"
          }
        }
      ]
    };
  },
  computed: {
    emptyAccount(){
      return this.allAccount.length < 1 ? true : false;
    }
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
    changeDateFormat(date) {
      return moment(date, "YYYY-MM-DD").format("DD MMMM YYYY");
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
    },
    async deleteButtonClicked(id) {
      try {
        await this.$store.dispatch("auth/deleteAdminAccount", {
          id: id,
        });
        this.loadAllAccount();
        this.turnOnAlert("delete", "true");
      } catch (error) {
        this.turnOnAlert("delete", "false");
      }
    },
    setAlert(){
      const alert = this.$store.getters['alert/getAlert'];
      if (alert.isActive) {
        this.turnOnAlert(alert.operation, alert.isSucceed);
        this.$store.commit('alert/revokeAlert');
      }
    }
  },
  created() {
    this.loadAllAccount();
    this.setAlert();
  },
  mounted() {
    if (this.$route.query.c) {
      this.turnOnAlert("create", this.$route.query.c);
    } else if (this.$route.query.d) {
      this.turnOnAlert("delete", this.$route.query.d);
    } else if (this.$route.query.u) {
      this.turnOnAlert("update", this.$route.query.u);
    }
  },
};
</script>