const timeSpend = require(`./timeSpend`);
const { Orders, Books, Users, OrdersBooks, Genres } = require(`./db`);

/*
order=
userId,
booksId,
*/

class ordersServices {
  async create({ userId, booksArray }) {
    timeSpend.startTimer();
   const order = await Orders.create({ userId }, {
      include: [ Users ]
    });
   console.log('order', order);
   console.log('booksArray', booksArray);

    for(let i = 0; i < booksArray.length; i++) {
      OrdersBooks.create({
        OrderId: order.id,
        BookId: booksArray[i].id,
        count: booksArray[i].count
      })
    }

    timeSpend.endTimer();

    return 'save order';
  }

  async list() {
    timeSpend.startTimer();
    const list = await Orders.findAll({ include: [ Users, Books ]});
    console.log('list order', list);
    const toString = '\n' + 'ORDERS' + '\n'+ list.map((order) =>
        (`${order.id}) userId: ${order.User.name}, booksId:${order.Books.map(({ name }) => name)}`)).join('\n')
    timeSpend.endTimer();

    return list
  }
}

module.exports = ordersServices;
