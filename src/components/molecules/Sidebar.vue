<template>
  <div class="rounded-lg bg-base-200 drawer drawer-mobile">
    <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
    <div class="flex flex-col drawer-content overflow-y-scroll">
      <label
        for="my-drawer-2"
        class="mb-4 btn btn-primary drawer-button lg:hidden"
        >open menu</label
      >
      <slot />
    </div>
    <div class="drawer-side">
      <label for="my-drawer-2" class="drawer-overlay"></label>
      <ul class="menu p-4 overflow-y-auto w-80 bg-base-100 text-base-content">
        <li>
          <router-link :to="{ name: 'dashboard' }">Dashboard</router-link>
        </li>
        <li>
          <router-link :to="{ name: 'account' }">Account</router-link>
        </li>
      </ul>
    </div>
  </div>
</template>