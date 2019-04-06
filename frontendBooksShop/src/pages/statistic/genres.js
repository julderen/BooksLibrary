import Card from '@material-ui/core/Card/Card';
import CardContent from '@material-ui/core/CardContent/CardContent';
import FormControlLabel from '@material-ui/core/FormControlLabel/FormControlLabel';
import Grid from '@material-ui/core/Grid/Grid';
import Radio from '@material-ui/core/Radio/Radio';
import RadioGroup from '@material-ui/core/RadioGroup/RadioGroup';
import Typography from '@material-ui/core/Typography/Typography';
import React, { useState } from 'react';

const Genres = (props) => {
  const [sort, setSort] = useState('countBook');
  console.log('sort', sort, props);
  return  (
    <Grid container spacing={24}>
    <Grid item xs={12}>
      <RadioGroup row onChange={(e) => setSort(e.target.value)} value={sort} >
        <FormControlLabel value="countBook" control={<Radio />} label="by number of books" />
        <FormControlLabel value="purchasedCount" control={<Radio />} label="by number of purchased" />
        <FormControlLabel value="totalAmount" control={<Radio />} label="by total amount" />
      </RadioGroup>
    </Grid>
    {props.geres.sort((a, b) => {
      console.log('sort', sort);
      if (a[sort] < b[sort]) {
        return 1;
      }
      if (a[sort] > b[sort]) {
        return -1;
      }
      return 0;
    }).map((genre) => (
      <Grid key={genre.id} item xs={3}>
        <Card>
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              genre: {genre.name}
            </Typography>
            <Typography color="primary" gutterBottom>
              number of books: {genre.countBook}
            </Typography>
            <Typography color="primary" gutterBottom>
              number of purchased: {genre.purchasedCount}
            </Typography>
            <Typography color="primary" gutterBottom>
              total amount: {genre.totalAmount}
            </Typography>
          </CardContent>
        </Card>
      </Grid>))}
  </Grid>
  )
};

export default Genres;
