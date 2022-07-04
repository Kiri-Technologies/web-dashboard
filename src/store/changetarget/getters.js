export default {
  getAllTarget(state) {
    return state.targets;
  },
  getTarget(state) {
    return {
      id: state.id,
      name: state.name,
      input: state.input,
      target: state.target,
    };
  },
  getTargetById(state){
    return (id) => {
      state.targets.filter(target => target.id == id);
    }
  }
};
