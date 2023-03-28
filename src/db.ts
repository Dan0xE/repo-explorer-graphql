const github = {
  baseURL: "https://api.github.com/graphql",
  username: `${process.env.REACT_APP_GITHUB_USERNAME}`,
  headers: {
    "Content-Type": "application/json",
    Authorization: `bearer ${process.env.REACT_APP_GITHUB_CLIENT_ID}`,
  },
};

export default github;
