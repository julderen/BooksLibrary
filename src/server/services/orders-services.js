
/*
order=
userId,
booksId,
*/
let storage = [];

function create(data) {
  storage.push(data);

  return 'save order';
}

function list() {
  return '\n' + 'ORDERS' + '\n'+storage.map((order, index) =>
    (`${index}) userId: ${order.userId}, booksId: ${order.booksId}`)).join('\n')
}

module.exports = {
  create,
  list
}
