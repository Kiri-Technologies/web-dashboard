<template>
  <section class="mt-4">
    <section class="flex justify-center">
      <div class="grid grid-cols-2 gap-4 w-11/12">
        <card class="shadow-lg w-100">
          <div class="grid grid-flow-row auto-rows-auto">
            <div
              class="
                bg-gray-200
                text-center
                py-1
                rounded-md
                text-gray-600
                font-bold
              "
            >
              Total Semua Angkot Terdaftar
            </div>
            <div class="font-bold text-6xl py-4 text-center text-kiri-green">
              1,984,523
            </div>
          </div>
        </card>
        <card class="shadow-lg w-100">
          <div class="grid grid-flow-row auto-rows-auto">
            <div
              class="
                bg-gray-200
                text-center
                py-1
                rounded-md
                text-gray-600
                font-bold
              "
            >
              Total Angkot Mendaftar Bulan Ini
            </div>
            <div class="font-bold text-6xl py-4 text-center text-kiri-green">
              1,984,523
            </div>
          </div>
        </card>
      </div>
    </section>
    <section class="flex justify-center mt-4">
      <card class="shadow-lg w-11/12">
        <base-bread-crumb :crumbs="crumbs"></base-bread-crumb>
        <p>
          <menu-title>
            <template v-slot:default> Angkot </template>
            <template v-slot:menuName> List Angkot yang Tersedia </template>
          </menu-title>
        </p>

        <div class="overflow-x-auto mt-2">
          <table class="table w-full" id="myTable">
            <!-- head -->
            <thead>
              <tr>
                <th>Kode Trayek</th>
                <th>Plat Nomor</th>
                <th>Trayek Angkot</th>
                <th>Pemilik Angkot</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>S-101</td>
                <td>B 4466 US</td>
                <td>Kebayoran Lama - Ciledug</td>
                <td>H. Abdurahman Said</td>
                <td>
                  <router-link :to="{ name: 'detail angkot' }">
                    <font-awesome-icon
                      icon="info-circle"
                      class="text-lg text-yellow-500"
                    />
                  </router-link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </card>
    </section>
  </section>
</template>

<script>
export default {
  data() {
    return {
      crumbs: [
        {
          title: "Angkot",
          link: {
            path: "/angkot",
          },
        },
      ],
    };
  },
};
</script>

<style scoped>
.text-kiri-green {
  color: #39ac00;
}
</style>