import React, { useState, useEffect } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import RadioGroup from '@material-ui/core/RadioGroup';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import styled from 'styled-components';
import axios from 'axios';

import Layout from '../shared/layout/index';

import Books from './books';
import Genres from './genres';
import Users from './users';

const FabStyled = styled(Fab)`
    margin-left: auto !important;
`;
const Wrapper = styled.div`
     flex-grow: 1;
     padding: 20px;
`;
const TextFieldStyled = styled(TextField)`
     width: 100%;
`;
const INIT_VALUE = { name: '', author: '', price: '', genreId: ''};

function BooksPage(props) {
  const [field, setField] = useState('genres');
  const [orders, setOrders] = useState([]);
  const [genres, setGenres] = useState([]);
  const [books, setBooks] = useState([]);
  const [users, setUsers] = useState([]);

  const fetchOrders = () => {
    axios.get('http://localhost:3001/api/orders')
      .then(({data})=> setOrders(data))
      .catch((e) => console.error(e))
  };

  const fetchBooks = () => {
    axios.get('http://localhost:3001/api/books')
      .then(({data})=> setBooks(data.map(book => ({
        ...book,
        ordersCount: book.Orders.length,
        purchasedCount: book.Orders.reduce((res, { OrdersBooks }) => res+ OrdersBooks.count, 0),
        totalAmount: book.Orders.reduce((res, { OrdersBooks }) => res+ OrdersBooks.count, 0) * book.price
      }))))
      .catch((e) => console.error(e))
  };
  const fetchUsers = () => {
    axios.get('http://localhost:3001/api/users')
      .then(({data})=> setUsers(data.map(user => ({
        ...user,
        ordersCount: user.Orders.length,
        purchasedCount: user.Orders.reduce((res, {Books}) => res + Books.reduce((res, { OrdersBooks }) => res + OrdersBooks.count, 0), 0),
        totalAmount: user.Orders.reduce((res, {Books}) => res + Books.reduce((res, { OrdersBooks, price }) => res + OrdersBooks.count * price, 0), 0),
      }))))
      .catch((e) => console.error(e))
  };

  const fetchGenres = () => {
    axios.get('http://localhost:3001/api/genres')
      .then(({data})=> setGenres(data.map(genre => ({
        ...genre,
        countBook: genre.Books.length,
        purchasedCount: genre.Books.reduce((res, {Orders}) => res + Orders.reduce((res, { OrdersBooks }) => res+ OrdersBooks.count, 0), 0),
        totalAmount: genre.Books.reduce((res, {Orders, price}) => res + price * Orders.reduce((res, { OrdersBooks }) => res+ OrdersBooks.count, 0), 0),
      }))))
      .catch((e) => console.error(e))
  };

  useEffect(() => {
    fetchUsers()
    fetchBooks()
    fetchOrders()
    fetchGenres()
  }, []);

  return (
    <Layout>
      <AppBar position="static">
        <Toolbar variant="dense">
          <Typography variant="h6" color="inherit">
            Statistic
          </Typography>
        </Toolbar>
      </AppBar>
      <Wrapper>
        <Grid container spacing={8}>
          <Grid item xs={3}>
        <Typography color="primary">
          Total users = {users.length}
        </Typography>
          </Grid>
          <Grid item xs={3}>
        <Typography color="primary">
          Total books = {books.length}
        </Typography>
          </Grid>
          <Grid item xs={3}>
        <Typography color="primary">
          Total orders = {orders.length}
        </Typography>
          </Grid>
          <Grid item xs={3}>
        <Typography color="primary">
          Total amount = {books.reduce((res, { totalAmount }) => res + totalAmount, 0)}
        </Typography>
          </Grid>
        </Grid>
        <RadioGroup row onChange={(e) => setField(e.target.value)} value={field} >
          <FormControlLabel value="genres" control={<Radio />} label="Genre" />
          <FormControlLabel value="books" control={<Radio />} label="Books" />
          <FormControlLabel value="users" control={<Radio />} label="Users" />
        </RadioGroup>
        {field === 'books' && <Books books={books} />}
        {field === 'genres' && <Genres geres={genres} />}
        {field === 'users' && <Users users={users} />}
      </Wrapper>
    </Layout>
  );
}

export default BooksPage;
