<template>
  <loading v-if="isLoading"></loading>
  <div class="p-5" v-else>
    <div class="grid grid-flow-row auto-rows-auto gap-4">
      <div class="grid grid-cols-2 gap-4">
        <!-- Total users -->

        <card>
          <card-body class="grid grid-flow-row auto-rows-auto p-3">
            <div>
              <h1 class="2xl:text-lg xl:text-sm font-medium text-center">Total Pengguna Bulan Ini</h1>
            </div>

            <stats-container>
              <single-stat title="Penumpang" :value="totalUsers.penumpang.this_month" :statDesc="true">
                <span class="font-bold" :class="{
                  'text-green-500': usersPercentage.penumpang > userTarget.target,
                  'text-red-500': usersPercentage.penumpang < userTarget.target,
                  'text-black': usersPercentage.penumpang == userTarget.target,
                }">{{ usersPercentage.penumpang }}% <span v-if="usersPercentage.penumpang > 0">↗︎</span><span
                    v-if="usersPercentage.penumpang < 0">↘︎</span><span
                    v-if="usersPercentage.penumpang == 0">~</span></span>
                dari bulan lalu
              </single-stat>
              <single-stat title="Supir" :value="totalUsers.supir.this_month" :statDesc="true">
                <span class="font-bold" :class="{
                  'text-green-500': usersPercentage.supir > userTarget.target,
                  'text-red-500': usersPercentage.supir < userTarget.target,
                  'text-black': usersPercentage.supir == userTarget.target,
                }">{{ usersPercentage.supir }}% <span v-if="usersPercentage.supir > 0">↗︎</span><span
                    v-if="usersPercentage.supir < 0">↘︎</span><span v-if="usersPercentage.supir == 0">~</span></span>
                dari bulan lalu
              </single-stat>
              <single-stat title="Owner" :value="totalUsers.owner.this_month" :statDesc="true">
                <span class="font-bold" :class="{
                  'text-green-500': usersPercentage.owner > userTarget.target,
                  'text-red-500': usersPercentage.owner < userTarget.target,
                  'text-black': usersPercentage.owner == userTarget.target,
                }">{{ usersPercentage.owner }}% <span v-if="usersPercentage.owner > 0">↗︎</span><span
                    v-if="usersPercentage.owner < 0">↘︎</span><span v-if="usersPercentage.owner == 0">~</span></span>
                dari bulan lalu
              </single-stat>
            </stats-container>
          </card-body>
        </card>

        <!-- Total feedback app -->
        <card>
          <card-body class="grid grid-flow-row auto-rows-auto p-3">
            <div>
              <h1 class="2xl:text-lg xl:text-sm font-medium text-center">
                Feedback user yang masuk pada bulan ini
              </h1>
            </div>
            <stats-container>
              <single-stat title="Submitted" :value="totalFeedbackApp.submitted" :color="{ 'text-blue-500': true }" />
              <single-stat title="Cancelled" :value="totalFeedbackApp.cancelled" :color="{ 'text-red-500': true }" />
              <single-stat title="Pending" :value="totalFeedbackApp.pending" :color="{ 'text-yellow-500': true }" />
              <single-stat title="Processed" :value="totalFeedbackApp.processed" :color="{ 'text-green-500': true }"
                :statDesc="true">
                <span class="text-red-500" v-if="feedbackUserTarget.target - totalFeedbackApp.processed > 0">{{
                feedbackUserTarget.target - totalFeedbackApp.processed
                }} feedbacks tersisa</span>
              </single-stat>
            </stats-container>
          </card-body>
        </card>
      </div>

      <div class="grid grid-cols-4 gap-4">
        <!-- pendapatan supir -->
        <card class="col-span-2">
          <card-body class="p-2">
            <div class="2xl:text-lg xl:text-sm font-medium text-center text-black">Total User Dalam 6 Bulan Terakhir
            </div>
            <bar-chart class="2xl:h-48 xl:h-28" :dataProps="penumpangChart.totalPenumpang"
              :labelsProps="penumpangChart.labels" :title="penumpangChart.title"></bar-chart>
            <bar-chart class="2xl:h-48 xl:h-28" :dataProps="supirChart.totalSupir" :labelsProps="supirChart.labels"
              :title="supirChart.title"></bar-chart>
            <bar-chart class="2xl:h-48 xl:h-28" :dataProps="ownerChart.totalOwner" :labelsProps="ownerChart.labels"
              :title="ownerChart.title"></bar-chart>
          </card-body>
        </card>

        <div class="col-span-2">
          <div class="grid grid-cols-2 gap-4">
            <card>
              <card-body class="flex justify-around xl:py-1 2xl:p-8">
                <div class="text-center 2xl:text-lg xl:text-sm font-medium text-black">Pengguna berlangganan bulan ini
                </div>
                <div class="2xl:text-4xl xl:text-2xl 2xl:my-2 font-semibold text-center" :class="{
                  'text-green-500': premiumUserTarget.target - totalPremiumUserThisMonth < 0,
                  'text-red-500': premiumUserTarget.target - totalPremiumUserThisMonth > 0,
                  'text-black': premiumUserTarget.target - totalPremiumUserThisMonth == 0,
                }">{{ totalPremiumUserThisMonth }}</div>
                <div class="2xl:text-base xl:text-xs text-center text-red-500"
                  v-if="premiumUserTarget.target - totalPremiumUserThisMonth > 0">{{ premiumUserTarget.target -
                  totalPremiumUserThisMonth
                  }} pengguna tersisa</div>
              </card-body>
            </card>
            <card>
              <card-body class="flex justify-around xl:py-1 2xl:p-8">
                <div class="text-center 2xl:text-lg xl:text-sm font-medium text-black">Total pengeluaran bulan ini</div>
                <div class="2xl:text-4xl xl:text-2xl 2xl:my-2 font-semibold text-center" :class="{
                  'text-green-500': pengeluaranTarget.target > pengeluaranTarget.input,
                  'text-red-500': pengeluaranTarget.target < pengeluaranTarget.input,
                  'text-black': pengeluaranTarget.target == pengeluaranTarget.input,
                }">{{ rupiahFormat(pengeluaranTarget.input) }}</div>
                <div class="2xl:text-base xl:text-xs text-center text-red-500"
                  v-if="pengeluaranTarget.target < pengeluaranTarget.input">
                  Melebihi budget sebanyak {{ rupiahFormat(pengeluaranTarget.input -
                  pengeluaranTarget.target)
                  }}</div>
              </card-body>
            </card>
          </div>
          <card class="mt-5">
            <card-body class="p-3">
              <div class="2xl:text-lg xl:text-sm font-medium text-center text-black">Pengguna Berlangganan Dalam 6 Bulan
                Terakhir</div>
              <bar-chart class="2xl:h-96 xl:h-48" :dataProps="premiumUserChart.totalPremiumUser"
                :labelsProps="premiumUserChart.labels" :title="premiumUserChart.title"></bar-chart>
            </card-body>
          </card>
        </div>
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
      premiumUserChart: {
        totalPremiumUser: [0, 0, 0, 0, 0, 0],
        title: "Grafik pengguna berlangganan selama 6 bulan",
        labels: [
          moment().subtract(5, "months").format("MMMM"),
          moment().subtract(4, "months").format("MMMM"),
          moment().subtract(3, "months").format("MMMM"),
          moment().subtract(2, "months").format("MMMM"),
          moment().subtract(1, "months").format("MMMM"),
          moment().format("MMMM"),
        ],
      },
      penumpangChart: {
        totalPenumpang: [0, 0, 0, 0, 0, 0],
        title: "Grafik akun penumpang selama 6 bulan",
        labels: [
          moment().subtract(5, "months").format("MMMM"),
          moment().subtract(4, "months").format("MMMM"),
          moment().subtract(3, "months").format("MMMM"),
          moment().subtract(2, "months").format("MMMM"),
          moment().subtract(1, "months").format("MMMM"),
          moment().format("MMMM"),
        ],
      },
      ownerChart: {
        totalOwner: [0, 0, 0, 0, 0, 0],
        title: "Grafik akun owner selama 6 bulan",
        labels: [
          moment().subtract(5, "months").format("MMMM"),
          moment().subtract(4, "months").format("MMMM"),
          moment().subtract(3, "months").format("MMMM"),
          moment().subtract(2, "months").format("MMMM"),
          moment().subtract(1, "months").format("MMMM"),
          moment().format("MMMM"),
        ],
      },
      supirChart: {
        totalSupir: [0, 0, 0, 0, 0, 0],
        title: "Grafik akun supir selama 6 bulan",
        labels: [
          moment().subtract(5, "months").format("MMMM"),
          moment().subtract(4, "months").format("MMMM"),
          moment().subtract(3, "months").format("MMMM"),
          moment().subtract(2, "months").format("MMMM"),
          moment().subtract(1, "months").format("MMMM"),
          moment().format("MMMM"),
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
      totalPremiumUserThisMonth: 0,
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
    async getTotalUsersLastSixMonth() {
      try {
        await this.$store.dispatch("chart/getTotalUsersLastSixMonth");
        let user =
          this.$store.getters["chart/getTotalUsersLastSixMonth"];

        let userPenumpang = [];

        for (const p in user.penumpang) {
          userPenumpang.push(user.penumpang[p]);
        }

        this.penumpangChart.totalPenumpang =
          userPenumpang.reverse();

        let userOwner = [];

        for (const p in user.owner) {
          userOwner.push(user.owner[p]);
        }

        this.ownerChart.totalOwner =
          userOwner.reverse();

        let userSupir = [];

        for (const p in user.supir) {
          userSupir.push(user.supir[p]);
        }

        this.supirChart.totalSupir =
          userSupir.reverse();
      } catch (error) {
        console.log(error.message);
      }
    },
    async getTotalPremiumUserLastSixMonth() {
      try {
        await this.$store.dispatch("chart/getTotalPremiumUsersLastSixMonth");
        let premiumUser =
          this.$store.getters["chart/getTotalPremiumUsersLastSixMonth"];

        let totalPremiumUser = [];

        for (const p in premiumUser) {
          totalPremiumUser.push(premiumUser[p]);
        }

        this.premiumUserChart.totalPremiumUser =
          totalPremiumUser.reverse();
        console.log(this.premiumUserChart);
      } catch (error) {
        console.log(error.message);
      }
    },
    async getTotalUsersThisMonth() {
      try {
        await this.$store.dispatch("chart/getTotalUsersThisMonth");
        this.totalUsers = this.$store.getters["chart/getTotalUsersThisMonth"];
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
    async getTotalPremiumUsersThisMonth() {
      try {
        await this.$store.dispatch("chart/getTotalPremiumUsersThisMonth");
        this.totalPremiumUserThisMonth =
          this.$store.getters["chart/getTotalPremiumUsersThisMonth"].premium_user;
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
      return (((thisMonth - lastMonth) / lastMonth) * 100).toFixed(2);
    },
    rupiahFormat(number) {
      return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
      }).format(number);
    },
  },
  async created() {
    document.title = "Dashboard";
    this.isLoading = true;
    try {
      await this.getTotalPendapatanHarian();
      await this.getTotalUsersThisMonth();
      await this.getTotalFeedbackApp();
      await this.loadAllTarget();
      await this.getTotalPremiumUsersThisMonth();
      await this.getTotalPremiumUserLastSixMonth();
      await this.getTotalUsersLastSixMonth();
    } catch (error) {
      console.log(error.message);
    }
    this.isLoading = false;
  },
};
</script>