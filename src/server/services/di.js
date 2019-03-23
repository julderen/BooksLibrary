const di = require('node-dependency-injector').getDic();

const books = require('./books-services');
const orders = require('./orders-services');
const genres = require('./genres-services');
const users = require('./users-services');


let MyDIC = new di();
MyDIC.set('books', new books());
MyDIC.set('orders', new orders());
MyDIC.set('genres', new genres());
MyDIC.set('users', new users());

module.exports = MyDIC;
