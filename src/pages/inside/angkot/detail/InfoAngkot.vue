<template>
  <section class="mt-4">
    <div class="grid grid-cols-5">
      <div class="col-span-2">
        <div class="grid grid-cols-2">
          <div>Kode Trayek</div>
          <div class="text-gray-500">: S-101</div>
        </div>
        <div class="grid grid-cols-2">
          <div>Plat Nomor</div>
          <div class="text-gray-500">: B 1234 AM</div>
        </div>
        <div class="grid grid-cols-2">
          <div>Trayek Angkot</div>
          <div class="text-gray-500">: Cipagalo - Buah Batu</div>
        </div>
        <div class="grid grid-cols-2">
          <div>Pemilik Angkot</div>
          <div class="text-gray-500">: H Abdurahman Said</div>
        </div>
        <div class="grid grid-cols-2">
          <div>Status Angkot</div>
          <div class="text-gray-500">: Beroperasi</div>
        </div>
      </div>
      <div class="col-span-2">
        <div class="grid grid-cols-2">
          <div>Pajak STNK</div>
          <div class="text-gray-500">: 22 Desember 2022</div>
        </div>
        <div class="grid grid-cols-2">
          <div>Plat Tahunan</div>
          <div class="text-gray-500">: 22 Desember 2022</div>
        </div>
        <div class="grid grid-cols-2">
          <div>KIR</div>
          <div class="text-gray-500">: 22 Desember 2022</div>
        </div>
      </div>
      <div>
        <img
          src="https://api.lorem.space/image/face?hash=64318"
          class="w-36 h-36"
        />
      </div>
    </div>

    <div class="grid grid-cols-2 mt-4">
      <div>
        <div>
          <p>List Supir</p>
          <div class="overflow-x-auto">
            <table class="table w-full">
              <thead>
                <tr>
                  <th>Nama Supir</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Abdul Gabriel Batistuta</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="mt-2">
          <p>Pendapatan</p>
          <div class="overflow-x-auto">
            <table class="table w-full">
              <thead>
                <tr>
                  <th>Tanggal</th>
                  <th>Jumlah</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Senin, 22 Desember 2022</td>
                  <td>Rp. 200.000</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div></div>
    </div>
  </section>
</template>