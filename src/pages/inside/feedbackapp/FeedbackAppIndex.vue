<template>
  <section class="flex justify-center mt-4">
    <card class="shadow-lg w-11/12">
      <card-body>
        <base-bread-crumb :crumbs="crumbs"></base-bread-crumb>
        <p>
          <menu-title :path="{ path: '/' }" heading="Feedback" subHeading="Menampilkan list feedback untuk aplikasi">
          </menu-title>
        </p>

        <div class="tabs mt-5">
          <a v-for="tab in tabs" :key="tab" class="tab tab-bordered" :class="{ 'tab-active': currentTab == tab }"
            @click="currentTab = tab">{{ tab }}</a>
        </div>

        <base-alert v-if="alert.turn" :mode="alert.mode" :message="alert.message"></base-alert>

        <loading v-if="isLoading"></loading>
        <div class="overflow-x-auto mt-4" v-else>
          <feedback-app-data-table :entries="filteredFeedbackApp" :currentTab="currentTab"
            v-if="currentTab == 'All Feedback'" @changeStatus="changeStatus"></feedback-app-data-table>
          <feedback-app-data-table :entries="filteredFeedbackApp" :currentTab="currentTab"
            v-if="currentTab == 'Cancelled'" @changeStatus="changeStatus"></feedback-app-data-table>
          <feedback-app-data-table :entries="filteredFeedbackApp" :currentTab="currentTab"
            v-if="currentTab == 'Pending'" @changeStatus="changeStatus"></feedback-app-data-table>
          <feedback-app-data-table :entries="filteredFeedbackApp" :currentTab="currentTab"
            v-if="currentTab == 'Processed'" @changeStatus="changeStatus"></feedback-app-data-table>
        </div>
      </card-body>
    </card>
  </section>
</template>

<script>
import FeedbackAppDataTable from '../../../components/molecules/datatable/FeedbackAppDataTable.vue';

export default {
  components: {
    FeedbackAppDataTable,
  },
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
  },
  methods: {
    async loadAllFeedbackApp() {
      try {
        await this.$store.dispatch("feedbackApp/getAllFeedbackApp");
        const allFeedbackApp =
          this.$store.getters["feedbackApp/getAllFeedbackApp"];
        this.allFeedbackApp = allFeedbackApp;

        this.allFeedbackApp.filter(fa => fa.status == "processed" || fa.status == "process");
      } catch (error) {
        this.turnOnAlert(false);
      }
    },
    async changeStatus(isSucceed) {
      this.isLoading = true;
      if (isSucceed) {
        await this.loadAllFeedbackApp();
        this.turnOnAlert(true);
      } else {
        this.turnOnAlert(false);
      }
      this.isLoading = false;
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

      setTimeout(() => {
        this.alert.turn = false;
      }, 5000);
    },
  },
  async created() {
    this.isLoading = true;
    try {
      await this.loadAllFeedbackApp();
    } catch (error) {
      console.log(error.message);
    }
    this.isLoading = false;
  },
};
</script>