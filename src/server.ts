import server from "./app";

const port = process.env.PORT;

server.listen(port, () => console.info(`Beer Playlist running on port: ${port}`));
