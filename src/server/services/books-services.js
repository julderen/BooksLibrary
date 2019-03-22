
/*
book=
name,
author,
genres
*/
let storage = [];

function create(data) {
  storage.push(data);

  return 'save book';
}

function list() {
  return '\n' + 'BOOKS' + '\n'+storage.map((book, index) =>
    (`${index}) name: ${book.name}, author: ${book.author}, genres: ${book.genres}, price: ${book.price}`)).join('\n')
}

module.exports = {
  create,
  list
}
