import React, { useState, useEffect } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import Fab from '@material-ui/core/Fab';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import AddIcon from '@material-ui/icons/Add';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import styled from 'styled-components';
import axios from 'axios';

import Layout from '../shared/layout/index';

const FabStyled = styled(Fab)`
    margin-left: auto !important;
`;
const Wrapper = styled.div`
     flex-grow: 1;
     padding: 20px;
     min-width: 900px;
`;
const TextFieldStyled = styled(TextField)`
     width: 100%;
`;
const INIT_VALUE = { userId: '', booksArray: [] };

function OrdersPage(props) {
  const [data, setData] = useState([]);
  const [books, setBooks] = useState([]);
  const [users, setUsers] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [values, setValues] = useState(INIT_VALUE);

  const fetchData = () => {
    axios.get('http://localhost:3001/api/orders')
      .then(({data})=> setData(data))
      .catch((e) => console.error(e))
  };

  const fetchBooks = () => {
    axios.get('http://localhost:3001/api/books')
      .then(({data})=> setBooks(data))
      .catch((e) => console.error(e))
  };
  const fetchUsers = () => {
    axios.get('http://localhost:3001/api/users')
      .then(({data})=> setUsers(data))
      .catch((e) => console.error(e))
  };

  useEffect(() => {
    fetchData()
    fetchBooks()
    fetchUsers()
  }, []);

  const handleSubmit = () => {
    axios.post('http://localhost:3001/api/orders', values).then(
      () => {
        setIsOpen(false);
        setValues(INIT_VALUE);
        fetchData();
      })
      .catch((e) => console.error(e))
  };

  const inputChange = (name) => (e) => setValues({ ...values, [name]: e.target.value });
  console.log(values);

  return (
    <Layout>
      <AppBar position="static">
        <Toolbar variant="dense">
          <Typography variant="h6" color="inherit">
            Orders
          </Typography>
          <FabStyled size="small" color="secondary" aria-label="Add" onClick={() => setIsOpen(true)}>
            <AddIcon />
          </FabStyled>
        </Toolbar>
      </AppBar>
      <Wrapper>
        <Grid container spacing={24}>
          {data.map((order) => (
            <Grid key={order.id} item xs={3}>
            <Card>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  user: {[order.User.name, order.User.surname].join(' ')}
                </Typography>
                <Typography color="textSecondary" gutterBottom>
                  books:
                  <ul>
                    {
                      order.Books.map((book) => <li>name: {book.name} author: {book.author} price: {book.price} count: {book.OrdersBooks.count}</li>)
                    }
                  </ul>
                </Typography>
                <Typography color="primary">
                  Total price = {order.Books.reduce(((res, book) => res + book.price * book.OrdersBooks.count),0)}
                </Typography>
              </CardContent>
            </Card>
            </Grid>
          ))}
        </Grid>
        <Dialog
          fullScreen
          open={isOpen}
          onClose={() => setIsOpen(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Create orders</DialogTitle>
          <DialogContent>
            <Grid container spacing={24}>
              <Grid item xs={12}>
                <TextFieldStyled
              select
              label="user"
              value={values.userId}
              onChange={inputChange('userId')}
            >
              {users.map(option => (
                <MenuItem key={option.id} value={option.id}>
                  {[option.name, option.surname].join(' ')}
                </MenuItem>
              ))}
            </TextFieldStyled>
                <Wrapper>
                <Grid container spacing={24}>
                  {books.map((book) => (
                    <Grid key={book.id} item xs={3}>
                      <Card>
                        <CardContent>
                          <Typography color="textSecondary" gutterBottom>
                            name: {book.name}
                          </Typography>
                          <Typography color="textSecondary" gutterBottom>
                            author: {book.author}
                          </Typography>
                          <Typography color="textSecondary" gutterBottom>
                            price: {book.price}
                          </Typography>
                          <Typography color="textSecondary" gutterBottom>
                            genre: {book.Genre.name}
                          </Typography>
                          <CardActions>
                            {console.log('values.booksArray', values.booksArray)}
                            {values.booksArray.find(({ id }) => console.log('id === book.id', id, book.id) || id === book.id) ?
                              <TextFieldStyled
                                label="count"
                                value={values.booksArray.find(({ id }) => id === book.id).count}
                                onChange={(e) => setValues({ ...values, booksArray: values.booksArray.reduce(
                                  (res, selectedBook) => {
                                    if (selectedBook.id !== book.id) return [...res, selectedBook];

                                    if (e.target.value <= 0 && e.target.value !== '') return res;

                                    return [...res, { ...selectedBook, count: e.target.value }]
                                  }, [])})}
                              /> :
                              <Button onClick={() => setValues({ ...values, booksArray: [...values.booksArray, { id: book.id, count: 1 }] })}>
                                Add
                              </Button>
                            }
                          </CardActions>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
                </Wrapper>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setIsOpen(false)} color="primary">
              Cancel
            </Button>
            <Button onClick={handleSubmit} color="primary">
              Create
            </Button>
          </DialogActions>
        </Dialog>
      </Wrapper>
    </Layout>
  );
}

export default OrdersPage;
