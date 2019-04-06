import Card from '@material-ui/core/Card/Card';
import CardContent from '@material-ui/core/CardContent/CardContent';
import FormControlLabel from '@material-ui/core/FormControlLabel/FormControlLabel';
import Grid from '@material-ui/core/Grid/Grid';
import Radio from '@material-ui/core/Radio/Radio';
import RadioGroup from '@material-ui/core/RadioGroup/RadioGroup';
import Typography from '@material-ui/core/Typography/Typography';
import React, { useState } from 'react';

const Books = (props) => {
  const [sort, setSort] = useState('ordersCount');

  return  (
    <Grid container spacing={24}>
    <Grid item xs={12}>
      <RadioGroup row onChange={(e) => setSort(e.target.value)} value={sort} >
        <FormControlLabel value="ordersCount" control={<Radio />} label="by number of orders" />
        <FormControlLabel value="purchasedCount" control={<Radio />} label="by number of purchased" />
        <FormControlLabel value="totalAmount" control={<Radio />} label="by total amount" />
      </RadioGroup>
    </Grid>
    {props.books.sort((a, b) => {
      if (a[sort] < b[sort]) {
        return 1;
      }
      if (a[sort] > b[sort]) {
        return -1;
      }
      return 0;
    }).map((book) => (
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
            <Typography color="primary" gutterBottom>
              number of orders: {book.ordersCount}
            </Typography>
            <Typography color="primary" gutterBottom>
              number of purchased: {book.purchasedCount}
            </Typography>
            <Typography color="primary" gutterBottom>
              total amount: {book.totalAmount}
            </Typography>
          </CardContent>
        </Card>
      </Grid>))}
  </Grid>
  )
};

export default Books;
