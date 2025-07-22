import usernameApi from "./usernameApi.js";

const Welcome = {
  allowAccess: async () => window.auth0Client.isAuthenticated(),

  render: async () => {

    const json = await usernameApi.getUsername();

    console.log("API-Antwort:", json);

    const username = json.username || "Gast";

    return `
      <h1>Hallo ${username}</h1>
      <button id="logout">Abmelden</button>
    `;
  },

  postRender: async () => {
      document.getElementById("logout").addEventListener("click", (e) => {
      e.preventDefault();
      window.auth0Client.logout({
        logoutParams: {
          returnTo: window.env.APP_URL,
        },
      });
    });
  }
};

export default Welcome;