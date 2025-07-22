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

  const response = await axios.post(url, payload, header);
  return response.data;
}

const usernameApi = {
  getUsername
};

module.exports = usernameApi;