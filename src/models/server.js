const express = require("express");
const cors = require("cors");
const usersRoutes = require("../routes/users");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.usersPath = "/users";

    // Middlewares
    this.middlewares();

    // Routes of my application
    this.routes();
  }

  middlewares() {
    // CORS
    this.app.use(cors());

    // Reading and parsing the body
    this.app.use(express.json());

    // Public directory
    this.app.use(express.static("src/public"));
  }

  routes() {
    this.app.use(this.usersPath, usersRoutes);
  }

  listen() {
    this.app.listen(this.port);

    console.log(`Server on port ${this.port}`);
  }
}

module.exports = Server;
