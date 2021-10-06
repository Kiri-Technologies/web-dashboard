<template>
  <div class="grid grid-cols-2">
    <div class="flex justify-center items-center h-screen">
      <img
        src="../assets/Loginillustration.png"
        alt="Login illustration"
        class="max-h-screen"
      />
    </div>
    <div class="flex justify-center items-center h-screen">
      <div
        class="
          card
          text-center
          shadow-2xl
          2xl:max-w-lg
          max-w-sm
          w-96
          2xl:w-full
        "
      >
        <figure class="px-2 pt-2 flex justify-center items-center">
          <img src="../assets/logoKiri.png" class="max-w-xs max-h-48 2xl:max-w-sm 2xl:max-h-72" />
        </figure>
        <div class="card-body">
          <div class="form">
            <div class="form-control my-1">
              <label class="label">
                <span class="label-text">Username</span>
              </label>
              <input
                type="text"
                placeholder="username"
                class="input input-bordered"
              />
            </div>
            <div class="form-control my-1">
              <label class="label">
                <span class="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="password"
                class="input input-bordered"
              />
            </div>
            <div class="form-control my-1">
              <label class="cursor-pointer label justify-start">
                <input type="checkbox" checked="checked" class="checkbox" />
                <span class="label-text ml-2">Remember me</span>
              </label>
            </div>
            <button class="btn bg-blue-500 border-none w-full hover:bg-blue-700">Masuk</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>