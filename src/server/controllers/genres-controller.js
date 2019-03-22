const menu = require(`../../cli/menu`);
const askUtils = require(`../../cli/utils/ask-utils`);
const genresServices = require(`../services/genres-services`);

const create = {
  name: `create`,
  description: `Create genre`,
  async execute() {
    const name = await askUtils.stringAsk('write genre name: ');

    return genresServices.create({ name });
  },
};

const genresList = {
  name: `list`,
  description: `Shows genres`,
  execute() {
    return genresServices.list();
  },
};

const list = [create, genresList];

module.exports = {
  name: `genres`,
  description: `menu works with genres`,
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
