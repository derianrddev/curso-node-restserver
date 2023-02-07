const express = require("express");
const cors = require("cors");
const authRoutes = require("../routes/auth");
const categoriesRoutes = require("../routes/categories");
const productsRoutes = require("../routes/products");
const searchRoutes = require("../routes/search");
const usersRoutes = require("../routes/users");
const { dbConnection } = require("../database/config");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 3000;
    this.paths = {
      auth: "/auth",
      categories: "/categories",
      products: "/products",
      search: "/search",
      users: "/users",
    };

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
    this.app.use(this.paths.auth, authRoutes);
    this.app.use(this.paths.categories, categoriesRoutes);
    this.app.use(this.paths.products, productsRoutes);
    this.app.use(this.paths.search, searchRoutes);
    this.app.use(this.paths.users, usersRoutes);
  }

  listen() {
    this.app.listen(this.port);

    console.log(`Server on port ${this.port}`);
  }
}

module.exports = Server;
