const timeSpend = require(`./timeSpend`);
const { Genres, Books, Orders } = require(`./db`);

/*
genre=
name
*/


const insert = 'INSERT INTO genres(name) VALUES($1) RETURNING *'

class genresServices {
  async create(data) {
    timeSpend.startTimer();
    await Genres.create(data);
    timeSpend.endTimer();

    return 'save genre';
  }

  async list() {
    timeSpend.startTimer();
    const list = await Genres.findAll({ include: [{ model: Books, include: [ Orders ] }]});
    const toString = '\n GENRES \n'+ list.map((genre, index) =>
      (`${genre.id}) name: ${genre.name}`)).join('\n')

    timeSpend.endTimer();

    return list;
  }

  async getById(id) {
    timeSpend.startTimer();
    return await Genres.findByPk(id);
  }
}

module.exports = genresServices;
