const Home = {
  allowAccess: async () => true,
  render: async () => {
    return `
      <h1>Willkommen</h1>
      <button id="login">Anmelden</button>
    `;
  },
  postRender: async () => {
      document.getElementById("login").addEventListener("click", async (e) => {
      e.preventDefault();
      await window.auth0Client.loginWithRedirect();
    });
  }
};

export default Home;
