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
            <tr>
              <td>Andre</td>
              <td>andre@gmail.com</td>
              <td>20 - Februari - 2022</td>
              <td>
                <font-awesome-icon
                  icon="pen-square"
                  class="text-lg text-blue-600"
                />
                <font-awesome-icon
                  icon="trash"
                  class="text-lg text-red-600 ml-2"
                />
              </td>
            </tr>
            <tr v-for="account in allAccount" :key="account.id">
              <td>{{ account.name }}</td>
              <td>{{ account.email }}</td>
              <td>{{ account.birthdate }}</td>
              <td>
                <font-awesome-icon
                  icon="pen-square"
                  class="text-lg text-blue-600"
                />
                <font-awesome-icon
                  icon="trash"
                  class="text-lg text-red-600 ml-2"
                />
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
      menuName: "List akun yang tersedia",
      alert: {
        turn: false,
        mode: "",
        message: "",
      },
      allAccount: [],
    };
  },
  methods: {
    getAllAccount() {
      this.allAccount = this.$store.getters["auth/getAllAccount"];
    },
    turnOnAlert(operation, isSucceed) {
      this.alert.turn = true;

      if (isSucceed == "true") {
        this.alert.mode = "success";
        if (operation == "create") {
          this.alert.message = "Berhasil menambahkan akun";
        } else if (operation == "delete") {
          this.alert.message = "Berhasil menghapus akun";
        }
      } else if (isSucceed == "false") {
        this.alert.mode = "error";
        if (operation == "create") {
          this.alert.message = "Gagal menambahkan akun";
        } else if (operation == "delete") {
          this.alert.message = "Gagal menghapus akun";
        }
      }
    },
  },
  created() {
    this.getAllAccount();
  },
  mounted() {
    if (this.$route.query.c) {
      this.turnOnAlert("create", this.$route.query.c);
    } else if (this.$route.query.d) {
      this.turnOnAlert("delete", this.$route.query.d);
    }
  },
};
</script>