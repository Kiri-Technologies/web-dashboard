export default {
    setHalteVirtualById(state, { id, route_id, nama_lokasi, lat, lng, arah }) {
        state.id = id;
        state.route_id = route_id;
        state.nama_lokasi = nama_lokasi;
        state.lat = lat;
        state.lng = lng;
        state.arah = arah;
    },
    addAllHalteVirtual(state, { data }){
        state.allHalteVirtual = data;
    }
}