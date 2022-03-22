<template>
  <section class="mt-4">
    <div>
      <div class="grid grid-cols-2 gap-4">
        <div>
          <div class="grid grid-cols-2">
            <div>Kode Trayek</div>
            <div class="text-gray-500">: S-101</div>
          </div>
          <div class="grid grid-cols-2">
            <div>Plat Nomor</div>
            <div class="text-gray-500">: B 1234 AM</div>
          </div>
        </div>
        <div>
          <div class="grid grid-cols-2">
            <div>Trayek Angkot</div>
            <div class="text-gray-500">: Cipagalo Buah Batu</div>
          </div>
        </div>
      </div>
    </div>
    <div class="overflow-x-auto mt-4">
      <table class="table w-full">
        <!-- head -->
        <thead>
          <tr>
            <th>Tanggal</th>
            <th>Nama</th>
            <th>Rating</th>
            <th>Review</th>
            <th>Komentar</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>23 Agustus 2022 13:59</td>
            <td>Komeng</td>
            <td>
              <font-awesome-icon
                icon="star"
                class="text-lg text-yellow-400"
              />
              <font-awesome-icon
                icon="star"
                class="text-lg text-yellow-400"
              />
              <font-awesome-icon
                icon="star"
                class="text-lg text-yellow-400"
              />
              <font-awesome-icon
                icon="star"
                class="text-lg text-yellow-400"
              />
              <font-awesome-icon
                icon="star"
                class="text-lg text-yellow-400"
              />
            </td>
            <td>Sangat Nyaman</td>
            <td>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis culpa tempora minus id perferendis porro animi molestiae quia. Sit assumenda pariatur numquam a atque placeat fugiat ratione repellat. Mollitia, cumque.</td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>