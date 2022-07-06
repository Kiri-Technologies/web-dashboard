import axios from "axios";
export default {
  async createPremiumUser(context, { user_id, payment_date, from, to }) {
    const url = `https://kiri.mfaiztriputra.id/api/admin/premiumuser/create`;

    const access_token = localStorage.getItem("access_token");
    const token_type = localStorage.getItem("token_type");
    const authHeader = `${token_type} ${access_token}`;

    try {
      await axios({
        method: "post",
        url: url,
        headers: {
          Authorization: authHeader,
        },
        data: {
          user_id,
          payment_date,
          from,
          to,
        },
      });
    } catch (error) {
      let message;
      if (error.response.status == 400) {
        message = "Pastikan form sudah sesuai";
        if (error.response.data.message == "User tidak ditemukan") {
          message = error.response.data.message;
        }
      } else {
        message = "Failed to store data!";
      }
      const errorMessage = new Error(message);
      throw errorMessage;
    }
  },
  async getAllPremiumUser(context) {
    const url = `https://kiri.mfaiztriputra.id/api/admin/premiumuser`;

    let response;

    const access_token = localStorage.getItem("access_token");
    const token_type = localStorage.getItem("token_type");
    const authHeader = `${token_type} ${access_token}`;

    try {
      response = await axios({
        method: "get",
        url: url,
        headers: {
          Authorization: authHeader,
        },
      });
    } catch (error) {
      const errorMessage = new Error("Failed to get data!");
      throw errorMessage;
    }

    context.commit("addAllPremiumUser", {
      premiumUser: response.data.data,
    });
  },
  async getPremiumUserById(context, { id }) {
    const url = `https://kiri.mfaiztriputra.id/api/admin/premiumuser/${id}`;

    let response;

    const access_token = localStorage.getItem("access_token");
    const token_type = localStorage.getItem("token_type");
    const authHeader = `${token_type} ${access_token}`;

    try {
      response = await axios({
        method: "get",
        url: url,
        headers: {
          Authorization: authHeader,
        },
      });
    } catch (error) {
      const errorMessage = new Error("Failed to get data!");
      throw errorMessage;
    }

    context.commit("setPremiumUser", {
      id: response.data.data.id,
      user_id: response.data.data.user_id,
      payment_date: response.data.data.payment_date,
      from: response.data.data.from,
      to: response.data.data.to,
    });
  },
  async updatePremiumUserById(
    context,
    { id, user_id, payment_date, from, to }
  ) {
    const url = `https://kiri.mfaiztriputra.id/api/admin/premiumuser/${id}/update`;

    const access_token = localStorage.getItem("access_token");
    const token_type = localStorage.getItem("token_type");
    const authHeader = `${token_type} ${access_token}`;

    try {
      await axios({
        method: "post",
        url: url,
        headers: {
          Authorization: authHeader,
        },
        data: {
          user_id,
          payment_date,
          from,
          to,
        },
      });
    } catch (error) {
      let message;
      if (error.response.status == 400) {
        message = "Pastikan form sudah sesuai";
      } else {
        message = "Failed to store data!";
      }
      const errorMessage = new Error(message);
      throw errorMessage;
    }
  },
  async deletePremiumUserById(context, { id }) {
    const url = `https://kiri.mfaiztriputra.id/api/admin/premiumuser/${id}/delete`;

    const access_token = localStorage.getItem("access_token");
    const token_type = localStorage.getItem("token_type");
    const authHeader = `${token_type} ${access_token}`;

    try {
      await axios({
        method: "delete",
        url: url,
        headers: {
          Authorization: authHeader,
        },
      });
    } catch (error) {
      const errorMessage = new Error("Gagal menghapus trayek");
      throw errorMessage;
    }

    context.dispatch("getAllPremiumUser");
  },
};
