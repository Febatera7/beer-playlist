const { CLIENT_ID, CLIENT_SECRET, SPOTIFY_TOKEN_API, SPOTIFY_SEARCH_API } = process.env;

const tokenApiUrl = SPOTIFY_TOKEN_API;

const searchApiUrl = SPOTIFY_SEARCH_API;

const tokenApiFormUrl = {
    grant_type: "client_credentials",
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET
};

export default {
    tokenApiUrl,
    searchApiUrl,
    tokenApiFormUrl,
};
