const config = require("./env-config");
const axios = require("axios");

async function getAccessToken() {
    const url = `${config.ISSUER_BASE_URL}/oauth/token`;
    const payload = {
        grant_type: "client_credentials",
        client_id: config.CLIENT_ID,
        client_secret: config.CLIENT_SECRET,
        audience: config.AUDIENCE
    };
    const header = {
        headers: {"Content-Type": "application/json"}
    };

    const response = await axios.post(url, payload, header);
    //console.log(response.data);
    return response.data.access_token;
}

async function getUsername(accessToken) {
    const url = `${config.API_URL}/username`;
    const payload = {};
    const header = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`
        }
    };

    const response = await axios.post(url, payload, header);
    //console.log(response.data);
    return response.data.username;
}

async function main() {
    const accessToken = await getAccessToken();
    console.log(`accessToken: ${accessToken}`);
    
    console.log();
    
    const username = await getUsername(accessToken);
    console.log(`username: ${username}`);
}

main();



