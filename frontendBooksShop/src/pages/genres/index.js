import React, { useState, useEffect } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
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

const IconButtonStyled = styled(IconButton)`
    margin-left: -18px;
    margin-right: 10px;
`;
const FabStyled = styled(Fab)`
    margin-left: auto !important;
`;
const Wrapper = styled.div`
     flex-grow: 1;
     padding: 20px;
`;
const INIT_VALUE = { name: ''};

function DenseAppBar(props) {
  const [data, setData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState(INIT_VALUE);

  const fetchData = () => {
    axios.get('http://localhost:3001/api/genres')
      .then(({data})=> setData(data))
      .catch((e) => console.error(e))
  };

  useEffect(fetchData, []);

  const handleSubmit = () => {
    axios.post('http://localhost:3001/api/genres', value).then(
      () => {
        setIsOpen(false);
        setValue(INIT_VALUE);
        fetchData();
      })
      .catch((e) => console.error(e))
  };

  return (
    <Layout>
      <AppBar position="static">
        <Toolbar variant="dense">
          <Typography variant="h6" color="inherit">
            Genres
          </Typography>
          <FabStyled size="small" color="secondary" aria-label="Add" onClick={() => setIsOpen(true)}>
            <AddIcon />
          </FabStyled>
        </Toolbar>
      </AppBar>
      <Wrapper>
        <Grid container spacing={24}>
          {data.map(({ id, name })=> (
            <Grid item xs={3}>
            <Card key={id}>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  name: {name}
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
          <DialogTitle id="alert-dialog-title">Create genre</DialogTitle>
          <DialogContent>
            <TextField label="name" value={value.name} onChange={(e) => console.log(e) || setValue({ ...value, name: e.target.value })} />
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

export default DenseAppBar;
