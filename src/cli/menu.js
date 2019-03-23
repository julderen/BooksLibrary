const paramsUtils = require(`./utils/params-utils`);
const askUtils = require(`./utils/ask-utils`);

const menu = async options => {
  let isExit = false;
  const exitOption = {
    name: 'exit',
    condition(param) {
      return paramsUtils.defaultCondition(this.name, param);
    },
    execute() {
      isExit = true;
    },
  };

  const list = [].concat(options, [exitOption]);

  while (!isExit) {
    console.log();
    list.map(({ name }, key) => console.log(`${key + 1}) ${name}`));

    const userChoose = (await askUtils.numberAsk(`Write the item number `)) - 1;
    console.log();
    if (list[userChoose]) {
      const result = await list[userChoose].execute();

      result && console.log('result: ', result);
    } else {
      console.error(`You choose bad comand`);
    }
  }
};

module.exports = menu;
