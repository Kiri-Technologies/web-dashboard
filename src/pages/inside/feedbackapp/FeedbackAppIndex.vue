<template>
  <section class="flex justify-center mt-4">
    <card class="shadow-lg w-11/12">
      <base-bread-crumb :crumbs="crumbs"></base-bread-crumb>
      <p>
        <menu-title>
          <template v-slot:default> Feedback </template>
          <template v-slot:menuName>
            Menampilkan list feedback untuk aplikasi
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
          >{{ tab }}</a
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
              <td>Nama</td>
              <td>Review</td>
              <td>Tanggapan</td>
              <td v-if="currentTab == 'All Feedback' || currentTab == 'Pending'">Change Status</td>
            </tr>
          </thead>
          <tbody>
            <tr v-for="fa in filteredFeedbackApp" :key="fa.id">
              <td>{{ fa.user_id }}</td>
              <td>{{ fa.review }}</td>
              <td>
                {{ fa.tanggapan }}
              </td>
              <td v-if="currentTab !== 'Cancelled' || currentTab !== 'Processed'">
                <save-modal
                  :id="fa.id + 'pending'"
                  @saveButtonClicked="changeStatusToPending"
                  v-if="currentTab == 'All Feedback'"
                >
                  <template v-slot:default>
                    <button-warning :class="loadingState" size="sm">
                      Pending
                    </button-warning>
                  </template>
                  <template v-slot:title> Edit Status </template>
                  <template v-slot:body>
                    Anda yakin untuk mengubah status menjadi
                    <span class="text-yellow-600">pending</span>?
                  </template>
                </save-modal>

                <save-modal
                  :id="fa.id + 'cancelled'"
                  @saveButtonClicked="changeStatusToCancelled"
                  v-if="currentTab == 'Pending'"
                >
                  <template v-slot:default>
                    <button-danger class="mr-2" :class="loadingState" size="sm">
                      Cancelled
                    </button-danger>
                  </template>
                  <template v-slot:title> Edit Status </template>
                  <template v-slot:body>
                    Anda yakin untuk mengubah status menjadi
                    <span class="text-red-600">cancelled</span>?
                  </template>
                </save-modal>

                <save-modal
                  :id="fa.id + 'processed'"
                  @saveButtonClicked="changeStatusToProcessed"
                  v-if="currentTab == 'Pending'"
                >
                  <template v-slot:default>
                    <button-success :class="loadingState" size="sm">
                      Processed
                    </button-success>
                  </template>
                  <template v-slot:title> Edit Status </template>
                  <template v-slot:body>
                    Anda yakin untuk mengubah status menjadi
                    <span class="text-green-600">processed</span>?
                  </template>
                </save-modal>
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
      currentTab: "All Feedback",
      tabs: ["All Feedback", "Cancelled", "Pending", "Processed"],
      allFeedbackApp: [],
      isLoading: false,
      alert: {
        turn: false,
        mode: "",
        message: "",
      },
      crumbs: [
        {
          title: "Feedback",
          link: {
            path: "/feedbackapp",
          },
        },
      ],
    };
  },
  computed: {
    filteredFeedbackApp() {
      return this.allFeedbackApp.filter((fa) => {
        if (this.currentTab == "All Feedback") {
          return fa.status == "submitted";
        } else if (this.currentTab == "Cancelled") {
          return fa.status == "cancelled";
        } else if (this.currentTab == "Pending") {
          return fa.status == "pending";
        } else if (this.currentTab == "Processed") {
          return fa.status == "processed";
        }
      });
    },
    loadingState() {
      if (this.isLoading) {
        return {
          loading: true,
        };
      } else {
        return {
          loading: false,
        };
      }
    },
  },
  methods: {
    async loadAllFeedbackApp() {
      try {
        await this.$store.dispatch("feedbackApp/getAllFeedbackApp");
        const allFeedbackApp =
          this.$store.getters["feedbackApp/getAllFeedbackApp"];
        this.allFeedbackApp = allFeedbackApp;
      } catch (error) {
        this.turnOnAlert(false);
      }
    },
    async changeStatusToPending(id) {
      this.changeStatus(id, "pending");
    },
    async changeStatusToProcessed(id) {
      this.changeStatus(id, "processed");
    },
    async changeStatusToCancelled(id) {
      this.changeStatus(id, "cancelled");
    },
    async changeStatus(id, status) {
      this.isLoading = true;

      try {
        await this.$store.dispatch("feedbackApp/updateFeedbackAppById", {
          id: id,
          status: status,
        });

        this.loadAllFeedbackApp();

        this.isLoading = false;
        this.turnOnAlert(true);
      } catch (error) {
        this.turnOnAlert(false);
      }
      setTimeout(() => {
        this.alert.turn = false;
      }, 5000);
    },
    turnOnAlert(isSucceed) {
      this.alert.turn = true;

      if (isSucceed) {
        this.alert.mode = "success";
        this.alert.message = "Berhasil mengubah status";
      } else if (!isSucceed) {
        this.alert.mode = "error";
        this.alert.message = "Gagal mengubah status";
      }
    },
  },
  created() {
    this.loadAllFeedbackApp();
  },
};
</script>