export default {
  getAllPremiumUser(state) {
    return state.premiumUser;
  },
  getPremiumUser(state) {
    return {
      id: state.id,
      user_id: state.user_id,
      payment_date: state.payment_date,
      from: state.from,
      to: state.to,
    };
  },
};
