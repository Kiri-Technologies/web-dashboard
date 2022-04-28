export default {
    getAllHalteVirtual(state){
        return state.allHalteVirtual;
    },
    getHalteVirtual(state){
        return {
            id: state.id,
            nama_lokasi: state.nama_lokasi,
            lat: state.lat,
            lng: state.lng,
        }
    }
}