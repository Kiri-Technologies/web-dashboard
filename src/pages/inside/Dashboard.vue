<template>
  <loading v-if="isLoading"></loading>
  <div class="p-5" v-else>
    <div class="grid grid-flow-row auto-rows-auto gap-4">
      <div class="grid grid-cols-2 gap-4">
        <!-- Total users -->

        <card>
          <card-body class="grid grid-flow-row auto-rows-auto p-3">
            <div>
              <h1 class="text-lg font-medium text-center">Total Users</h1>
            </div>

            <stats-container>
              <single-stat title="Penumpang" :value="totalUsers.penumpang" />
              <single-stat title="Supir" :value="totalUsers.supir" />
              <single-stat title="Owner" :value="totalUsers.owner" />
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
              <single-stat
                title="Submitted"
                :value="totalFeedbackApp.submitted"
                :color="{ 'text-blue-500': true }"
              />
              <single-stat
                title="Cancelled"
                :value="totalFeedbackApp.cancelled"
                :color="{ 'text-red-500': true }"
              />
              <single-stat
                title="Pending"
                :value="totalFeedbackApp.pending"
                :color="{ 'text-yellow-500': true }"
              />
              <single-stat
                title="Processed"
                :value="totalFeedbackApp.processed"
                :color="{ 'text-green-500': true }"
              />
            </stats-container>
          </card-body>
        </card>
      </div>

      <div class="grid grid-cols-4 gap-4">
        <!-- pendapatan supir -->
        <card class="col-span-2">
          <card-body class="p-3">
            <bar-chart
              :dataProps="pendapatanChart.totalPendapatanHarian"
              :labelsProps="pendapatanChart.labels"
              :title="pendapatanChart.title"
            ></bar-chart>
          </card-body>
        </card>

        <!-- most used trayek -->
        <card>
          <card-body class="grid grid-flow-row auto-rows-max p-3">
            <div>
              <h1 class="text-md font-medium">
                Trayek yang paling banyak dinaiki oleh penumpang
              </h1>
            </div>

            <div class="overflow-auto max-h-80">
              <div
                class="
                  p-1
                  grid grid-flow-row
                  auto-rows-auto
                  border-solid border border-gray-400
                  rounded-md
                  mt-1
                "
                v-for="(trayek, index) in mostUsedTrayek"
                :key="trayek.id"
              >
                <div class="grid grid-cols-3">
                  <div class="col-span-2 font-semibold">
                    {{ index + 1 }}. {{ trayek.kode_trayek }}
                  </div>
                  <div class="text-right">{{ trayek.count }}</div>
                </div>
                <div>{{ trayek.titik_awal }} - {{ trayek.titik_akhir }}</div>
              </div>
            </div>
          </card-body>
        </card>

        <!-- most used halte virtual -->
        <card>
          <card-body class="grid grid-flow-row auto-rows-max p-3">
            <div>
              <h1 class="font-medium">
                Halte virtual yang paling banyak digunakan oleh penumpang
              </h1>
            </div>
            <div class="overflow-auto max-h-80">
              <div
                class="
                  p-1
                  grid grid-cols-6
                  border-solid border border-gray-400
                  rounded-md
                  mt-1
                "
                v-for="(hv, index) in mostUsedHalteVirtual"
                :key="hv.id"
              >
                <div class="col-span-5">
                  <span class="font-semibold">{{ index + 1 }}</span
                  >. {{ hv.nama_lokasi }}
                </div>
                <div class="text-right">{{ hv.count }}</div>
              </div>
            </div>
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
        owner: 0,
        penumpang: 0,
        supir: 0,
      },
      totalFeedbackApp: {
        submitted: 0,
        pending: 0,
        processed: 0,
        cancelled: 0,
      },
      mostUsedTrayek: [],
      mostUsedHalteVirtual: [],
      isLoading: false,
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
    async getTotalUsers() {
      try {
        await this.$store.dispatch("chart/getTotalUsers");
        this.totalUsers = this.$store.getters["chart/getTotalUsers"];
      } catch (error) {
        console.log(error.message);
      }
    },
    async getMostUsedTrayek() {
      try {
        await this.$store.dispatch("chart/getMostUsedTrayek");
        this.mostUsedTrayek = this.$store.getters["chart/getMostUsedTrayek"];
        this.mostUsedTrayek = this.mostUsedTrayek.slice(0, 10);
      } catch (error) {
        console.log(error.message);
      }
    },
    async getMostUsedHalteVirtual() {
      try {
        await this.$store.dispatch("chart/getMostUsedHalteVirtual");
        this.mostUsedHalteVirtual =
          this.$store.getters["chart/getMostUsedHalteVirtual"];
        this.mostUsedHalteVirtual = this.mostUsedHalteVirtual.slice(0, 10);
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
  },
  async created() {
    this.isLoading = true;
    try {
      await this.getTotalPendapatanHarian();
      await this.getTotalUsers();
      await this.getMostUsedTrayek();
      await this.getMostUsedHalteVirtual();
      await this.getTotalFeedbackApp();
    } catch (error) {
      console.log(error.message);
    }
    this.isLoading = false;
  },
};
</script>