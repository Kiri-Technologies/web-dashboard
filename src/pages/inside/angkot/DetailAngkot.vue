<template>
  <section class="flex justify-center mt-4">
    <card class="shadow-lg w-11/12">
      <card-body>
        <base-bread-crumb :crumbs="crumbs"></base-bread-crumb>
        <p>
          <menu-title :path="{ path: '/angkot' }" heading="Detail Angkot" subHeading="Menampilkan data angkot terpilih">
          </menu-title>
        </p>

        <div class="tabs mt-5">
          <a v-for="tab in tabs" :key="tab" class="tab tab-bordered" :class="{ 'tab-active': currentTab == tab }"
            @click="currentTab = tab">
            {{ tabName(tab) }}
          </a>
        </div>
        <component :is="currentTab"></component>
      </card-body>
    </card>
  </section>
</template>

<script>
import InfoAngkot from "./detail/InfoAngkot.vue";
import RiwayatPerjalanan from "./detail/RiwayatPerjalanan.vue";
import RiwayatPendapatan from "./detail/RiwayatPendapatan.vue";
import UlasanPenumpang from "./detail/UlasanPenumpang.vue";

export default {
  props: ["id"],
  components: {
    InfoAngkot,
    RiwayatPerjalanan,
    RiwayatPendapatan,
    UlasanPenumpang,
  },
  data() {
    return {
      currentTab: "InfoAngkot",
      tabs: [
        "InfoAngkot",
        "RiwayatPerjalanan",
        "RiwayatPendapatan",
        "UlasanPenumpang",
      ],
      crumbs: [
        {
          title: "Angkot",
          link: {
            path: "/angkot",
          },
        },
        {
          title: "Detail Angkot",
          link: {
            path: `/angkot/${this.id}/detail`,
          },
        },
      ],
    };
  },
  methods: {
    tabName(tab) {
      if (tab == "InfoAngkot") {
        return "Info Angkot";
      } else if (tab == "RiwayatPerjalanan") {
        return "Riwayat Perjalanan";
      } else if (tab == "RiwayatPendapatan") {
        return "Riwayat Pendapatan";
      }
      return "Ulasan Penumpang";
    },
  },
  created(){
    document.title = "Detail Angkot";
  }
};
</script>