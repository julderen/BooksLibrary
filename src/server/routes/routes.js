const express = require(`express`);
const bodyParser = require(`body-parser`);
const apiGenres = require(`./api/genres`);
const apiBooks = require(`./api/books`);
const apiUsers = require(`./api/users`);
const apiOrders = require(`./api/orders`);
const corsMiddleware = require(`../middleware/cors-middleware`);

module.exports = {
  init(server) {
    console.log('server', server);
    server.use(`/api`, corsMiddleware, bodyParser.json());
    server.use(`/api`, apiGenres);
    server.use(`/api`, apiBooks);
    server.use(`/api`, apiUsers);
    server.use(`/api`, apiOrders);
    server.use(express.static(`static`));
  }
};
