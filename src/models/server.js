const express = require("express");
const cors = require("cors");
const usersRoutes = require("../routes/users");
const authRoutes = require("../routes/auth");
const { dbConnection } = require("../database/config");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 3000;
    this.usersPath = "/users";
    this.authPath = "/auth";

    // Connect to database
    this.connectDB();

    // Middlewares
    this.middlewares();

    // Routes of my application
    this.routes();
  }

  async connectDB() {
    await dbConnection();
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
    this.app.use(this.authPath, authRoutes);
    this.app.use(this.usersPath, usersRoutes);
  }

  listen() {
    this.app.listen(this.port);

    console.log(`Server on port ${this.port}`);
  }
}

module.exports = Server;
