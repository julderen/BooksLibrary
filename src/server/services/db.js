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

class Orders extends Sequelize.Model {}
Orders.init({
  id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
}, { sequelize });

class OrdersBooks extends Sequelize.Model {}
OrdersBooks.init({
  id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  count: Sequelize.INTEGER
}, { sequelize });

Genres.hasMany(Books, {foreignKey: 'genreId', sourceKey: 'id'});
Books.belongsTo(Genres, {foreignKey: 'genreId', targetKey: 'id'});

Users.hasMany(Orders, {foreignKey: 'userId', sourceKey: 'id'});
Orders.belongsTo(Users, {foreignKey: 'userId', targetKey: 'id'});

Books.belongsToMany(Orders, { through: OrdersBooks });
Orders.belongsToMany(Books, { through: OrdersBooks });


Users.sync();
Genres.sync();
Books.sync();
Orders.sync();
OrdersBooks.sync();

module.exports ={ sequelize, Genres, Books, Orders, Users, OrdersBooks };
