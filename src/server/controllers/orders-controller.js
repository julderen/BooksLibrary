const menu = require(`../../cli/menu`);
const askUtils = require(`../../cli/utils/ask-utils`);
const booksServices = require(`../services/books-services`);
const ordersServices = require(`../services/orders-services`);
const usersServices = require(`../services/users-services`);

const create = {
  name: `create`,
  description: `Create order`,
  async execute() {
    console.log(usersServices.list());
    const userId = await askUtils.numberAsk('write user id: ');
    console.log(booksServices.list());
    let booksArray = [];
    try {
      const books = await askUtils.stringAsk(`write books id (', '): `);
      booksArray = books.split(', ').map(value => parseInt(value, 10));
    } catch (e) {
      console.error('Error in the input books')
    }

    return ordersServices.create({ userId, booksId: booksArray });
  },
};

const booksList = {
  name: `list`,
  description: `Shows orders`,
  execute() {
    return ordersServices.list();
  },
};

const list = [create, booksList];

module.exports = {
  name: `orders`,
  description: `menu works with orders`,
  execute() {
    return (async function IEE() {
      try {
        await menu(list);
      } catch (err) {
        console.error(err);
      }
    })();
  },
};
