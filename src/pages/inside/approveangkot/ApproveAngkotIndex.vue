<template>
  <section class="flex justify-center mt-4">
    <card class="shadow-lg w-11/12">
      <base-bread-crumb :crumbs="crumbs"></base-bread-crumb>
      <p>
        <menu-title>
          <template v-slot:default> Approval Angkot </template>
          <template v-slot:menuName>
            Menampilkan list angkot yang akan disetujui untuk beroperasi
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
              <td>Nama Pemilik</td>
              <td>Plat Nomor</td>
              <td>Nomor HP Owner</td>
              <td>Trayek Angkot</td>
              <td>Email</td>
              <td v-if="currentTab == 'Pending'">Action</td>
            </tr>
          </thead>
          <tbody>
            <td>Nanang</td>
            <td>B 4466 US</td>
            <td>081312341234</td>
            <td>Kebayoran Lama - Ciledug</td>
            <td>nanang@gmail.com</td>
            <td v-if="currentTab == 'Pending'">
              <font-awesome-icon
                icon="check-square"
                class="text-lg text-green-600"
              />
              <font-awesome-icon
                icon="window-close"
                class="text-lg text-red-600 ml-2"
              />
            </td>
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
      currentTab: "Pending",
      tabs: ["Pending", "Approved", "Declined"],
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
};
</script>