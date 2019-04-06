import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import SupervisedUserCircle from '@material-ui/icons/SupervisedUserCircle';
import Book from '@material-ui/icons/Book';
import ListIcon from '@material-ui/icons/List';
import MoneyIcon from '@material-ui/icons/Money';
import SortIcon from '@material-ui/icons/Sort';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

const AppBarShift = styled(AppBar)`
    width: calc(100% - 200px);
    margin-left: 200px;
`

const Wrapper = styled.div`
       display: flex;
`

const DrawerStyle = styled(Drawer)`
           width: 157px;
    flex-shrink: 0;
`

const MainStyle = styled.main`
       flex-grow: 1;
`


const Layout = ({ children }) => {
  return (
    <Wrapper>
      <CssBaseline />
      <DrawerStyle
        variant="persistent"
        anchor="left"
        open
      >
        <Divider />
        <Divider />
        <List>
          <ListItem button component={NavLink} to="/genres">
            <ListItemIcon><ListIcon /></ListItemIcon>
            <ListItemText primary="Genres" />
          </ListItem>
          <ListItem button component={NavLink} to="/books">
            <ListItemIcon><Book /></ListItemIcon>
            <ListItemText primary="Books" />
          </ListItem>
          <ListItem button component={NavLink} to="/users">
            <ListItemIcon><SupervisedUserCircle /></ListItemIcon>
            <ListItemText primary="Users" />
          </ListItem>
          <ListItem button component={NavLink} to="/orders">
            <ListItemIcon><MoneyIcon /></ListItemIcon>
            <ListItemText primary="Orders" />
          </ListItem>
          <ListItem button component={NavLink} to="/statistic">
            <ListItemIcon><SortIcon /></ListItemIcon>
            <ListItemText primary="Statistic" />
          </ListItem>
        </List>
      </DrawerStyle>
      <MainStyle>
        {children}
      </MainStyle>
    </Wrapper>

  )
};

export default Layout;
