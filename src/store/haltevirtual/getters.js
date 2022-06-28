export default {
    getAllHalteVirtual(state){
        return state.allHalteVirtual;
    },
    getHalteVirtual(state){
        return {
            id: state.id,
            route_id: state.route_id,
            nama_lokasi: state.nama_lokasi,
            lat: state.lat,
            lng: state.lng,
            arah: state.arah
        }
    }
}