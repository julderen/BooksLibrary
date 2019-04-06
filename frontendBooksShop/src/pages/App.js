import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import styled from 'styled-components';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import GenresPage from './genres/index';
import BooksPage from './books/index';
import UsersPage from './users/index';
import OrdersPage from './orders/index';
import StatisticPage from './statistic/index';

const IconButtonStyled = styled(IconButton)`
    margin-left: -18px;
    margin-right: 10px;
`;
const Wrapper = styled.div`
     flex-grow: 1,
`;
function DenseAppBar(props) {
  const history = createBrowserHistory();

  return (
    <Wrapper>
      <Router history={history}>
      <Switch>
        <Route
          path={'/genres'}
          component={GenresPage}
        />
        <Route
          path={'/books'}
          component={BooksPage}
        />
        <Route
          path={'/users'}
          component={UsersPage}
        />
        <Route
          path={'/orders'}
          component={OrdersPage}
        />
        <Route
          path={'/statistic'}
          component={StatisticPage}
        />
        <Redirect to="genres" />
      </Switch>
      </Router>
    </Wrapper>
  );
}

export default DenseAppBar;
