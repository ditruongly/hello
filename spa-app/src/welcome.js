import usernameApi from "./usernameApi.js";

const Welcome = {
  allowAccess: async () => true,

  render: async () => {

    const result = await usernameApi.getUsername();

    console.log(result?.username);

    const username = result?.username || "Gast";

    return `
      <h1>Hallo ${username}</h1>
      <a href="#">Abmelden</a>
    `;
  },

  postRender: async () => {}
};

export default Welcome;