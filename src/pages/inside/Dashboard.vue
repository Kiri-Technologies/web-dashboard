<template>
  <loading v-if="isLoading"></loading>
  <div class="p-5" v-else>
    <div class="grid grid-flow-row auto-rows-auto gap-4">
      <div class="grid grid-cols-2 gap-4">
        <!-- Total users -->

        <card>
          <card-body class="grid grid-flow-row auto-rows-auto p-3">
            <div>
              <h1 class="text-lg font-medium text-center">Total Users This Month</h1>
            </div>

            <stats-container>
              <single-stat title="Penumpang" :value="totalUsers.penumpang.this_month" :statDesc="true">
                <span class="font-bold" :class="{
                  'text-green-500': usersPercentage.penumpang > userTarget.target,
                  'text-red-500': usersPercentage.penumpang < userTarget.target,
                  'text-black': usersPercentage.penumpang == userTarget.target,
                }">{{ usersPercentage.penumpang }}% <span
                    v-if="usersPercentage.penumpang > 0">↗︎</span><span
                    v-if="usersPercentage.penumpang < 0">↘︎</span><span
                    v-if="usersPercentage.penumpang == 0">~</span></span>
                than last month
              </single-stat>
              <single-stat title="Supir" :value="totalUsers.supir.this_month" :statDesc="true">
                <span class="font-bold" :class="{
                  'text-green-500': usersPercentage.supir > userTarget.target,
                  'text-red-500': usersPercentage.supir < userTarget.target,
                  'text-black': usersPercentage.supir == userTarget.target,
                }">{{ usersPercentage.supir }}% <span
                    v-if="usersPercentage.supir > 0">↗︎</span><span
                    v-if="usersPercentage.supir < 0">↘︎</span><span
                    v-if="usersPercentage.supir == 0">~</span></span>
                than last month
              </single-stat>
              <single-stat title="Owner" :value="totalUsers.owner.this_month" :statDesc="true">
                <span class="font-bold" :class="{
                  'text-green-500': usersPercentage.owner > userTarget.target,
                  'text-red-500': usersPercentage.owner < userTarget.target,
                  'text-black': usersPercentage.owner == userTarget.target,
                }">{{ usersPercentage.owner }}% <span
                    v-if="usersPercentage.owner > 0">↗︎</span><span
                    v-if="usersPercentage.owner < 0">↘︎</span><span
                    v-if="usersPercentage.owner == 0">~</span></span>
                than last month
              </single-stat>
            </stats-container>
          </card-body>
        </card>

        <!-- Total feedback app -->
        <card>
          <card-body class="grid grid-flow-row auto-rows-auto p-3">
            <div>
              <h1 class="text-lg font-medium text-center">
                Feedback user yang masuk pada bulan ini
              </h1>
            </div>
            <stats-container>
              <single-stat title="Submitted" :value="totalFeedbackApp.submitted" :color="{ 'text-blue-500': true }" />
              <single-stat title="Cancelled" :value="totalFeedbackApp.cancelled" :color="{ 'text-red-500': true }" />
              <single-stat title="Pending" :value="totalFeedbackApp.pending" :color="{ 'text-yellow-500': true }" />
              <single-stat title="Processed" :value="totalFeedbackApp.processed" :color="{ 'text-green-500': true }" :statDesc="true">
                <span class="text-red-500" v-if="feedbackUserTarget.target - totalFeedbackApp.processed > 0">{{ feedbackUserTarget.target - totalFeedbackApp.processed }} feedbacks remaining</span>
                <span class="text-green-500" v-if="feedbackUserTarget.target - totalFeedbackApp.processed < 0 || feedbackUserTarget.target - totalFeedbackApp.processed == 0">feedbacks processed <span v-if="feedbackUserTarget.target - totalFeedbackApp.processed <= 0">>=</span> {{ feedbackUserTarget.target}}</span>
              </single-stat>
            </stats-container>
          </card-body>
        </card>
      </div>

      <div class="grid grid-cols-4 gap-4">
        <!-- pendapatan supir -->
        <card class="col-span-2">
          <card-body class="p-3">
            <bar-chart :dataProps="pendapatanChart.totalPendapatanHarian" :labelsProps="pendapatanChart.labels"
              :title="pendapatanChart.title"></bar-chart>
          </card-body>
        </card>

        
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import StatsContainer from "../../components/molecules/chart/StatsContainer.vue";
import SingleStat from "../../components/atoms/chart/SingleStat.vue";
import CardBody from "../../components/atoms/card/CardBody.vue";

export default {
  components: {
    StatsContainer,
    SingleStat,
    CardBody,
  },
  data() {
    return {
      pendapatanChart: {
        totalPendapatanHarian: [0, 0, 0, 0, 0, 0, 0],
        title: "Riwayat pendapatan supir dalam 7 hari kemarin",
        labels: [
          moment().subtract(6, "days").format("dddd"),
          moment().subtract(5, "days").format("dddd"),
          moment().subtract(4, "days").format("dddd"),
          moment().subtract(3, "days").format("dddd"),
          moment().subtract(2, "days").format("dddd"),
          moment().subtract(1, "days").format("dddd"),
          moment().format("dddd"),
        ],
      },
      totalUsers: {
        owner: {
          this_month: 0,
          last_month: 0,
        },
        admin: {
          this_month: 0,
          last_month: 0,
        },
        user: {
          this_month: 0,
          last_month: 0,
        },
      },
      usersPercentage: {
        owner: 0,
        supir: 0,
        penumpang: 0,
      },
      totalFeedbackApp: {
        submitted: 0,
        pending: 0,
        processed: 0,
        cancelled: 0,
      },

      isLoading: false,
      pengeluaranTarget: {},
      userTarget: {},
      premiumUserTarget: {},
      feedbackUserTarget: {},
    };
  },
  methods: {
    async getTotalPendapatanHarian() {
      try {
        await this.$store.dispatch("chart/getTotalPendapatanHarian");
        let pendapatanHarian =
          this.$store.getters["chart/getTotalPendapatanHarian"];

        let totalPendapatanHarian = [];

        for (const p in pendapatanHarian) {
          totalPendapatanHarian.push(pendapatanHarian[p]);
        }

        this.pendapatanChart.totalPendapatanHarian =
          totalPendapatanHarian.reverse();
      } catch (error) {
        console.log(error.message);
      }
    },
    async getTotalUsersThisMonth() {
      try {
        await this.$store.dispatch("chart/getTotalUsersThisMonth");
        this.totalUsers = this.$store.getters["chart/getTotalUsersThisMonth"];
        console.log(this.totalUsers);
        this.usersPercentage.owner = this.calculatePercentage(this.totalUsers.owner.this_month, this.totalUsers.owner.last_month)
        this.usersPercentage.supir = this.calculatePercentage(this.totalUsers.supir.this_month, this.totalUsers.supir.last_month)
        this.usersPercentage.penumpang = this.calculatePercentage(this.totalUsers.penumpang.this_month, this.totalUsers.penumpang.last_month)
      } catch (error) {
        console.log(error.message);
      }
    },
    async getTotalFeedbackApp() {
      try {
        await this.$store.dispatch("chart/getTotalFeedbackApp");
        this.totalFeedbackApp =
          this.$store.getters["chart/getTotalFeedbackApp"];
      } catch (error) {
        console.log(error.message);
      }
    },
    async loadAllTarget() {
      try {
        await this.$store.dispatch("target/getAllTarget");
        const target = this.$store.getters["target/getAllTarget"];
        this.pengeluaranTarget = target.filter(t => t.name == 'pengeluaran')[0];
        this.userTarget = target.filter(t => t.name == 'user')[0];
        this.premiumUserTarget = target.filter(t => t.name == 'pengguna berlangganan')[0];
        this.feedbackUserTarget = target.filter(t => t.name == 'feedback user')[0];
      } catch (error) {
        this.turnOnAlert("error", error.message);
      }
    },
    calculatePercentage(thisMonth, lastMonth) {
      if (lastMonth == 0) {
        return 100;
      }
      return ((thisMonth - lastMonth) / lastMonth) * 100;
    }
  },
  async created() {
    this.isLoading = true;
    try {
      await this.getTotalPendapatanHarian();
      await this.getTotalUsersThisMonth();
      await this.getTotalFeedbackApp();
      await this.loadAllTarget();
    } catch (error) {
      console.log(error.message);
    }
    this.isLoading = false;
  },
};
</script>