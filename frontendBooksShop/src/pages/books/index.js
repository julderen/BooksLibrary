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
`;
const TextFieldStyled = styled(TextField)`
     width: 100%;
`;
const INIT_VALUE = { name: '', author: '', price: '', genreId: ''};

function BooksPage(props) {
  const [data, setData] = useState([]);
  const [genres, setGenres] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [values, setValues] = useState(INIT_VALUE);

  const fetchData = () => {
    axios.get('http://localhost:3001/api/books')
      .then(({data})=> setData(data))
      .catch((e) => console.error(e))
  };

  const fetchGenres = () => {
    axios.get('http://localhost:3001/api/genres')
      .then(({data})=> setGenres(data))
      .catch((e) => console.error(e))
  };

  useEffect(() => {
    fetchData()
    fetchGenres()
  }, []);

  const handleSubmit = () => {
    axios.post('http://localhost:3001/api/books', values).then(
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
            Books
          </Typography>
          <FabStyled size="small" color="secondary" aria-label="Add" onClick={() => setIsOpen(true)}>
            <AddIcon />
          </FabStyled>
        </Toolbar>
      </AppBar>
      <Wrapper>
        <Grid container spacing={24}>
          {data.map((book) => (
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
              </CardContent>
            </Card>
            </Grid>
          ))}
        </Grid>
        <Dialog
          open={isOpen}
          onClose={() => setIsOpen(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Create books</DialogTitle>
          <DialogContent>
            <Grid container spacing={24}>
              <Grid item xs={12}>
            <TextFieldStyled label="name" value={values.name} onChange={inputChange('name')} />
              </Grid>
              <Grid item xs={12}>

              <TextFieldStyled label="author" value={values.author} onChange={inputChange('author')} />
              </Grid>
                <Grid item xs={12}>

                <TextFieldStyled label="price" value={values.price} onChange={inputChange('price')} />
                </Grid>
                  <Grid item xs={12}>

                  <TextFieldStyled
              select
              label="genre"
              value={values.genreId}
              onChange={inputChange('genreId')}
            >
              {genres.map(option => (
                <MenuItem key={option.id} value={option.id}>
                  {option.name}
                </MenuItem>
              ))}
            </TextFieldStyled>
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

export default BooksPage;
