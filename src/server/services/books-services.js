const timeSpend = require(`./timeSpend`);

/*
book=
name,
author,
genres
*/

class booksServices {
  constructor(){
    this.storage = []
  }

  create(data) {
    timeSpend.startTimer();
    this.storage.push(data);
    timeSpend.endTimer();
    return 'save book';
  }

  list() {
    timeSpend.startTimer();
    const list = '\n BOOKS \n'+this.storage.map((book, index) =>
        (`${index}) name: ${book.name}, author: ${book.author}, genres: ${book.genres}, price: ${book.price}`)).join('\n')
    timeSpend.endTimer();

    return list
  }
}

module.exports = booksServices;
