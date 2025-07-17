const Home = {
  allowAccess: async () => true,

  render: async () => {
    return `
      <h1>Willkommen</h1>
      <a href="#welcome">Anmelden</a>
    `;
  },

  postRender: async () => {}
};

export default Home;
