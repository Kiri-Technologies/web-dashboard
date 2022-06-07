export default {
    setHalteVirtualById(state, { id, route_id, nama_lokasi, lat, lng }) {
        state.id = id;
        state.route_id = route_id;
        state.nama_lokasi = nama_lokasi;
        state.lat = lat;
        state.lng = lng;
    },
    addAllHalteVirtual(state, { data }){
        state.allHalteVirtual = data;
    }
}