<template>
  <GoogleMap
    api-key="AIzaSyCSp0Qa1rl3Yrqb-Mpcwc5Ibjq_brcUckA"
    style="width: 100%; height: 500px"
    :center="{ lat: center.lat, lng: center.lng }"
    :zoom="15"
  >
    <Marker v-for="halteVirtual in allHalteVirtual" :key="halteVirtual.id" :options="{ position: { lat: halteVirtual.lat, lng: halteVirtual.lng }, label: 'L', title: halteVirtual.name }" />
  </GoogleMap>
</template>

<script>
import { GoogleMap, Marker } from "vue3-google-map";

export default {
  props: {
    allHalteVirtual: {
      type: Array
    },
    center: {
      type: Object
    }
  },
  components: { GoogleMap, Marker },
};
</script>
