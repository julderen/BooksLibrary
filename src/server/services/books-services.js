const timeSpend = require(`./timeSpend`);
const { Books, Genres, Orders } = require(`./db`);

/*
book=
name,
author,
price,
genres
*/

class booksServices {
  constructor(){
    this.storage = []
  }

  async create(data) {
    timeSpend.startTimer();
    console.log(await Books.create(data, {
      include: [ Genres ]
    }));
    timeSpend.endTimer();
    return 'save book';
  }

  async list() {
    timeSpend.startTimer();
    const list = await Books.findAll({ include: [ Genres, Orders ]});
    const toString = '\n BOOKS \n'+ list.map((book, index) =>
      (`${book.id}) name: ${book.name}, author: ${book.author}, genre: ${book.Genre.name}, price: ${book.price}`)).join('\n')

    timeSpend.endTimer();

    return list
  }
}

module.exports = booksServices;
