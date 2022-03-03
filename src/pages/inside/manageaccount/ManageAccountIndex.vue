<template>
  <section class="flex justify-center mt-4">
    <card class="shadow-lg w-11/12">
      <p>
        <menu-title>
          <template v-slot:default> Akun </template>
          <template v-slot:menuName>
            {{ menuName }}
          </template>
        </menu-title>
      </p>
      <div class="flex flex-row justify-end">
        <button-primary :link="true" to="create new account" size="sm">
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
            <tr v-for="account in allAccount" :key="account.id">
              <td>{{ account.name }}</td>
              <td>{{ account.email }}</td>
              <td>{{ account.birthdate }}</td>
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
      allAccount: null,
      dummyAccount: null,
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
    changeDateFormat(date) {
      return moment(date, "YYYY-MM-DD").format("DD MMMM YYYY");
    },
    turnOnAlert(operation, isSucceed) {
      this.alert.turn = true;

      if (isSucceed == "true") {
        this.alert.mode = "success";
        if (operation == "create") {
          this.alert.message = "Berhasil menambahkan akun";
        } else if (operation == "delete") {
          this.alert.message = "Berhasil menghapus akun";
        } else if (operation == "update") {
          this.alert.message = "Berhasil mengubah akun";
        }
      } else if (isSucceed == "false") {
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
        this.$router.push({ name: "manage account", params: { d: "true" } });
      } catch (error) {
        this.$router.push({ name: "manage account", params: { d: "false" } });
      }
    },
  },
  created() {
    this.loadAllAccount();
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