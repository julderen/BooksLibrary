const menu = require(`../../cli/menu`);
const askUtils = require(`../../cli/utils/ask-utils`);
const di = require(`../services/di`);
const genresServices = di.get('genres');
const booksServices = di.get('books');

const create = {
  name: `create`,
  description: `Create books`,
  async execute() {
    const name = await askUtils.stringAsk('write book name: ');
    const author = await askUtils.stringAsk('write book author: ');
    const price = await askUtils.numberAsk('write book price: ');
    console.log(await genresServices.list());
    const genreId = await askUtils.numberAsk('write book genre: ');

    return booksServices.create({ name, author, genreId, price });
  },
};

const booksList = {
  name: `list`,
  description: `Shows books`,
  execute() {
    return booksServices.list();
  },
};

const list = [create, booksList];

module.exports = {
  name: `books`,
  description: `menu works with books`,
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
