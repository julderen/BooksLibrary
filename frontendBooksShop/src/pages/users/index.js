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
const INIT_VALUE = { name: '', surname: '', address: '', phone: ''};

function UsersPage(props) {
  const [data, setData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [values, setValues] = useState(INIT_VALUE);

  const fetchData = () => {
    axios.get('http://localhost:3001/api/users')
      .then(({data})=> setData(data))
      .catch((e) => console.error(e))
  };

  useEffect(() => {
    fetchData()
  }, []);

  const handleSubmit = () => {
    axios.post('http://localhost:3001/api/users', values).then(
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
            Users
          </Typography>
          <FabStyled size="small" color="secondary" aria-label="Add" onClick={() => setIsOpen(true)}>
            <AddIcon />
          </FabStyled>
        </Toolbar>
      </AppBar>
      <Wrapper>
        <Grid container spacing={24}>
          {data.map((user) => (
            <Grid key={user.id} item xs={3}>
            <Card>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  name: {[user.name, user.surname].join(', ')}
                </Typography>
                <Typography color="textSecondary" gutterBottom>
                  address: {user.address}
                </Typography>
                <Typography color="textSecondary" gutterBottom>
                  phone: {user.phone}
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
          <DialogTitle id="alert-dialog-title">Create user</DialogTitle>
          <DialogContent>
            <Grid container spacing={24}>
              <Grid item xs={12}>
            <TextFieldStyled label="name" value={values.name} onChange={inputChange('name')} />
              </Grid>
              <Grid item xs={12}>
                <TextFieldStyled label="surname" value={values.surname} onChange={inputChange('surname')} />
              </Grid>
              <Grid item xs={12}>
                <TextFieldStyled label="address" value={values.address} onChange={inputChange('address')} />
              </Grid>
              <Grid item xs={12}>
                <TextFieldStyled label="phone" value={values.phone} onChange={inputChange('phone')} />
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

export default UsersPage;
