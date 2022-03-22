export default {
    getAllHalteVirtual(state){
        return state.allHalteVirtual;
    },
    getHalteVirtual(state){
        return {
            id: state.id,
            name: state.name,
            lat: state.lat,
            lng: state.lng,
        }
    }
}