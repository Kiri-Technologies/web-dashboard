<template>
  <BarChart :chartData="testData" />
</template>

<script>
import { BarChart } from "vue-chart-3";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

export default {
  name: "Home",
  components: { BarChart },
  props: ["labelsProps", "dataProps", "title"],
  data() {
    return {
      testData: {
        labels: this.labelsProps,
        datasets: [
          {
            label: this.title,
            data: this.dataProps,
            backgroundColor: ["#39ac00"],
          },
        ],
      },
    };
  },
};
</script>
