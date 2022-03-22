export default {
    setHalteVirtualData(state, { id, name, lat, lng }) {
        state.id = id;
        state.name = name;
        state.lat = lat;
        state.lng = lng;
    },
    addAllHalteVirtual(state, { data }){
        state.allHalteVirtual = data;
    }
}