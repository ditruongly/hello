const usernameApi = {
  getUsername: async () => {
    try {
      const options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      };

      const res = await fetch(`${window.env.API_URL}/username`, options);
      const json = await res.json();
      return json;
    } catch (err) {
      console.log("Error getting username", err);
    }
  },
};

export default usernameApi;