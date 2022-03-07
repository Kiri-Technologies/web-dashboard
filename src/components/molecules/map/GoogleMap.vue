<template>
  <GoogleMap
  api-key="AIzaSyCSp0Qa1rl3Yrqb-Mpcwc5Ibjq_brcUckA"
  style="width: 100%; height: 500px"
  :center="center"
  :zoom="15"
  >
    <Marker :options="{ position: center }" />
  </GoogleMap>
</template>

<script>
import { GoogleMap, Marker } from 'vue3-google-map'

export default{
  components: { GoogleMap, Marker },
  setup() {
    const center = { lat: 40.689247, lng: -74.044502 }

    return { center }
  },
}
</script>
