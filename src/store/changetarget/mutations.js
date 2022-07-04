export default {
    addAllTarget(state, { targets }){
        state.targets = targets;
    },
    setTarget(state, {id, name, input, target}){
        state.id = id;
        state.name = name;
        state.input = input;
        state.target = target;
    },
}