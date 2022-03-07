<template>
  <section class="flex justify-center mt-4">
    <card class="shadow-lg w-11/12">
      <p>
        <menu-title>
          <template v-slot:default> Trayek </template>
          <template v-slot:menuName> List Trayek yang Tersedia </template>
        </menu-title>
      </p>
      <div class="flex flex-row justify-end">
        <button-primary
          :link="true"
          :to="{ name: 'create new trayek' }"
          size="sm"
        >
          Tambah Trayek
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
              <th>Kode Trayek</th>
              <th>Titik Awal</th>
              <th>Titik Akhir</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="trayek in allTrayek" :key="trayek.id">
              <td>{{ trayek.kode_trayek }}</td>
              <td>{{ trayek.titik_awal }}</td>
              <td>{{ trayek.titik_akhir }}</td>
              <td>
                <router-link
                  :to="{
                    name: 'detail trayek',
                    params: {
                      id: trayek.id,
                    },
                  }"
                >
                  <font-awesome-icon
                    icon="info-circle"
                    class="text-lg text-yellow-500"
                  />
                </router-link>

                <router-link
                  :to="{
                    name: 'update trayek',
                    params: {
                      id: trayek.id,
                    },
                  }"
                >
                  <font-awesome-icon
                    icon="pen-square"
                    class="text-lg text-blue-600 ml-2"
                  />
                </router-link>

                <delete-modal
                  :id="trayek.id"
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
export default {
  data() {
    return {
      menuName: "List akun yang tersedia",
      alert: {
        turn: false,
        mode: "",
        message: "",
      },
      allTrayek: null,
      dummyAccount: null,
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
      }
    },
    turnOnAlert(operation, isSucceed) {
      this.alert.turn = true;

      if (isSucceed == "true") {
        this.alert.mode = "success";
        if (operation == "create") {
          this.alert.message = "Berhasil menambahkan trayek";
        } else if (operation == "delete") {
          this.alert.message = "Berhasil menghapus trayek";
        } else if (operation == "update") {
          this.alert.message = "Berhasil mengubah trayek";
        }
      } else if (isSucceed == "false") {
        this.alert.mode = "error";
        if (operation == "create") {
          this.alert.message = "Gagal menambahkan trayek";
        } else if (operation == "delete") {
          this.alert.message = "Gagal menghapus trayek";
        } else if (operation == "update") {
          this.alert.message = "Gagal mengupdate trayek";
        }
      }
    },
    async deleteButtonClicked(id) {
      try {
        await this.$store.dispatch("auth/deleteAdminAccount", {
          id: id,
        });
        this.$router.push({ name: "trayek angkot", params: { d: "true" } });
      } catch (error) {
        this.$router.push({ name: "trayek angkot", params: { d: "false" } });
      }
    },
  },
  created() {
    this.loadAllTrayek();
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