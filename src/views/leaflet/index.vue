<template>
  <div id="map"></div>
</template>

<script setup>
import * as L from 'leaflet'
import 'leaflet/dist/leaflet.css'

import { onMounted } from 'vue';

onMounted(()=>{
  const map = L.map('map').setView([51.505, -0.09], 13);

  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(map);
})



</script>

<style lang="scss" scoped>
#map{ height: 180px; }

</style>