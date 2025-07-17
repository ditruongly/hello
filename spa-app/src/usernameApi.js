const usernameApi = {
  getUsername: async () => {
    try {
      const options = {
        method: "POST",
      };

      console.log("API-URL:", window.env.API_URL); 
      const res = await fetch(`${window.env.API_URL}/username`, options);
      const text = await res.text(); 
      return text;
    } catch (err) {
      console.log("Error getting username", err);
    }
  },
};

export default usernameApi;
