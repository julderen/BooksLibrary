const books = require(`../server/controllers/books-controller`);
const genres = require(`../server/controllers/genres-controller`);
const users = require(`../server/controllers/users-controller`);
const orders = require(`../server/controllers/orders-controller`);
const menu = require(`./menu`);
const askUtils = require('./utils/ask-utils');

const list = [orders, users, books,genres];

(async function IEE() {
  try {
    await menu(list);
  } catch (err) {
    console.error(err)
  }

  askUtils.close();
})();
