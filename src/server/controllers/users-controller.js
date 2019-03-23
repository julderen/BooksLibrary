const menu = require(`../../cli/menu`);
const askUtils = require(`../../cli/utils/ask-utils`);
const di = require(`../services/di`);
const usersServices = di.get('users');

const create = {
  name: `create`,
  description: `Create user`,
  async execute() {
    const name = await askUtils.stringAsk('write user name: ');
    const surname = await askUtils.stringAsk('write user surname: ');
    const address = await askUtils.stringAsk('write user address: ');
    const phone = await askUtils.stringAsk('write user phone: ');

    return usersServices.create({ name, surname, address, phone});
  },
};

const usersList = {
  name: `list`,
  description: `Shows users`,
  execute() {
    return usersServices.list();
  },
};

const list = [create, usersList];

module.exports = {
  name: `users`,
  description: `menu works with users`,
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
