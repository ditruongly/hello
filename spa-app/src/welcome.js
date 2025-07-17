import usernameApi from "./usernameApi.js";

const Welcome = {
  allowAccess: async () => true,

  render: async () => {

    const result = await usernameApi.getUsername();

    console.log("API-Antwort:", result);

    const username = result || "Gast";

    return `
      <h1>Hallo ${username}</h1>
      <a href="#">Abmelden</a>
    `;
  },

  postRender: async () => {}
};

export default Welcome;