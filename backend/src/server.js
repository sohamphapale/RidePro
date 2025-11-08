const dotenv = require("dotenv");
dotenv.config();
const app = require("./app");
const http = require("http");
const { initializeSocket } = require("./socket");

const port = process.env.PORT || 4000;
const server = http.createServer(app);

// initialize socket.io and attach to the HTTP server
initializeSocket(server);

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

