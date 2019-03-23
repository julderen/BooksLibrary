const timeSpend = require(`./timeSpend`);

/*
order=
userId,
booksId,
*/

class ordersServices {
  constructor(){
    this.storage = []
  }

  create(data) {
    timeSpend.startTimer();
    this.storage.push(data);
    timeSpend.endTimer();

    return 'save order';
  }

  list() {
    timeSpend.startTimer();
    const list = '\n' + 'ORDERS' + '\n'+this.storage.map((order, index) =>
        (`${index}) userId: ${order.userId}, booksId: ${order.booksId}`)).join('\n')
    timeSpend.endTimer();

    return list
  }
}

module.exports = ordersServices;
