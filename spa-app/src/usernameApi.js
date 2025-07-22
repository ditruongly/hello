import axios from "axios";
import env from "./environment.js";

async function getUsername() {

  const accessToken = await window.auth0Client.getTokenSilently();

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

export default usernameApi;