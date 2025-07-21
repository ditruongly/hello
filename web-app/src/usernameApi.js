const { API_URL } = require("./env-config");

const usernameApi = {
  getUsername: async () => {
    try {
      const res = await fetch(`${API_URL}/username`, { method: "POST"});
      const json = await res.json();
      return json;
    } catch (err) {
      console.error("Fehler beim Abrufen des Benutzernames:", err);
      return null;
    }
  }
};

module.exports = usernameApi;