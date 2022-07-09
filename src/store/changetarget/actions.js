import axios from "axios";
export default {
  async getAllTarget(context) {
    const url = `https://kiri.mfaiztriputra.id/api/admin/target`;

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

    context.commit("addAllTarget", {
      targets: response.data.data,
    });
  },
  async getTargetById(context, { id }) {
    const url = `https://kiri.mfaiztriputra.id/api/admin/target/${id}`;

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

    context.commit("setTarget", {
      id: response.data.data.id,
      name: response.data.data.name,
      input: response.data.data.input == null ? 0 : response.data.data.input,
      target: response.data.data.target,
    });
  },
  async updateTargetById(
    context,
    { id, input, target }
  ) {
    const url = `https://kiri.mfaiztriputra.id/api/admin/target/${id}/update`;

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
          input,
          target,
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
};
