<template>
  <section class="flex justify-center mt-4">
    <card class="shadow-lg w-11/12">
      <base-bread-crumb :crumbs="crumbs"></base-bread-crumb>
      <p>
        <menu-title>
          <template v-slot:default> Detail Angkot </template>
          <template v-slot:menuName>
            Menampilkan data angkot terpilih
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

      <div class="overflow-x-auto mt-4">
        <table class="table w-full">
          <!-- head -->
          <thead>
            <tr>
              <th>Nama</th>
              <th>Review</th>
              <th>Tanggapan</th>
              <th>Change Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Andre</td>
              <td>Happy</td>
              <td>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum,
                excepturi magni? Id dolores, asperiores beatae dolorem tempora
                qui illum doloribus dolore animi quo fugit. Id, asperiores ea.
                Esse, soluta adipisci.
              </td>
              <td>
                <save-modal :id="'1'" @saveButtonClicked="saveButtonClicked">
                  <template v-slot:default>
                    <button class="btn btn-success">Pending</button>
                  </template>
                  <template v-slot:title> Edit Status </template>
                  <template v-slot:body>
                    Anda yakin untuk mengubah status menjadi pending?
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
  methods: {
    saveButtonClicked(id) {
      console.log(id, "kepencet");
    },
  },
};
</script>