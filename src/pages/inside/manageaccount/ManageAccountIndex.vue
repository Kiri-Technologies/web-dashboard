<template>
  <section class="flex justify-center mt-4">
    <card class="shadow-lg w-11/12">
      <p>
        <menu-title>
          <template v-slot:default> Akun </template>
          <template v-slot:menuName>
            {{ menuName }}
          </template>
        </menu-title>
      </p>
      <div class="flex flex-row justify-end">
        <button-primary
          :link="true"
          to="create new account"
          size="sm"
        >
          Tambah Akun
        </button-primary>
      </div>
      <div class="overflow-x-auto mt-2">
        <table class="table w-full">
          <!-- head -->
          <thead>
            <tr>
              <th>Nama</th>
              <th>Email</th>
              <th>Tanggal Lahir</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <!-- row 1 -->
            <tr>
              <th>Sahudi Jaya</th>
              <td>sahudijaya@gmail.com</td>
              <td>28 - Maret - 1987</td>
              <td>
                <font-awesome-icon icon="pen-square" class="text-lg text-blue-600" />
                <font-awesome-icon icon="trash" class="text-lg text-red-600 ml-2" />
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
      menuName: "List akun yang tersedia",
    };
  },
};
</script>