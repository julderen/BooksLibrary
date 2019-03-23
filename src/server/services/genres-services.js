const timeSpend = require(`./timeSpend`);

/*
genre=
name
*/

class genresServices {
  constructor(){
    this.storage = []
  }

  create(data) {
    timeSpend.startTimer();
    this.storage.push(data);
    timeSpend.endTimer();

    return 'save genre';
  }

  list() {
    timeSpend.startTimer();
    const list = '\n' + 'GENRES' + '\n'+ this.storage.map((genre, index) =>
      (`${index}) name: ${genre.name}`)).join('\n')

    timeSpend.endTimer();

    return list
  }
}

module.exports = genresServices;
