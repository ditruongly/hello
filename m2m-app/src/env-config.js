require("dotenv").config();

module.exports = {
    API_URL: process.env.API_URL,
    ISSUER_BASE_URL: process.env.ISSUER_BASE_URL,
    AUDIENCE: process.env.AUDIENCE,
    CLIENT_ID: process.env.CLIENT_ID,
    CLIENT_SECRET: process.env.CLIENT_SECRET,
};