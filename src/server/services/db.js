const Sequelize = require('sequelize');
const sequelize = new Sequelize('books', 'postgres', 'docker', {
  host: 'localhost',
  port: 5438,
  dialect: 'postgres',
  // logging: false
});

class Genres extends Sequelize.Model {}
Genres.init({
  id: { type: Sequelize.INTEGER, primaryKey: true,  foreignKey:true, autoIncrement: true },
  name: Sequelize.STRING,
}, { sequelize });

class Users extends Sequelize.Model {}
Users.init({
  id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  name: Sequelize.STRING,
  surname: Sequelize.STRING,
  address: Sequelize.STRING,
  phone: {
    type: Sequelize.STRING,
    allowNull: true,
    unique: true,
  },
}, { sequelize });


class Books extends Sequelize.Model {}
Books.init({
  id: { type: Sequelize.INTEGER, primaryKey: true, foreignKey:true, autoIncrement: true },
  name: Sequelize.STRING,
  author: Sequelize.STRING,
  price: Sequelize.INTEGER,
}, { sequelize });

Books.hasMany(Genres);

Genres.sync({ force: true});
Books.sync({ force: true});
Users.sync({ force: true});

module.exports ={ sequelize, Genres, Books };
