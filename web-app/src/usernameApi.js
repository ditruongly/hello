const axios = require("axios");
const env = require("./environment");

async function getUsername(accessToken) {
  const url = `${env.API_URL}/username`;
  const payload = {};
  const header = {
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${accessToken}`
    }
  };

  try {
    const response = await axios.post(url, payload, header);
    return response.data;
  } catch (err) {
    console.error("Fehler bei usernameApi.getUsername:", err.response?.status, err.response?.data || err.message);
    throw err;
  }
}

const usernameApi = {
  getUsername
};

module.exports = usernameApi;