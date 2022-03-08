export default {
    namespaced: true,
    state(){
        return {
            operation: "",
            isSucceed: null,
            isActive: false
        }
    },
    mutations: {
        setAlert(state, { operation, isSucceed }){
            state.operation = operation;
            state.isSucceed = isSucceed;
            state.isActive = true;
        },
        revokeAlert(state){
            state.operation = "";
            state.isSucceed = null;
            state.isActive = false;
        }
    },
    getters: {
        getAlert(state){
            return {
                operation: state.operation,
                isSucceed: state.isSucceed,
                isActive: state.isActive,
            }
        },
        getAlertStatus(state){
            return state.isActive;
        }
    }
}