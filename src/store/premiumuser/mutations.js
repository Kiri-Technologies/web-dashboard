export default {
    addAllPremiumUser(state, { premiumUser }){
        state.premiumUser = premiumUser;
    },
    setPremiumUser(state, {id, user_id, payment_date, from, to}){
        state.id = id;
        state.user_id = user_id;
        state.payment_date = payment_date;
        state.from = from;
        state.to = to;
    },
}