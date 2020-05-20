/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-unused-prop-types */
/* eslint-disable react/require-default-props */
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { MdDashboard, MdStore, MdPerson, MdAssignment } from 'react-icons/md';

// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

// core components
import AdminNavbarLinks from '~/components/Navbars/AdminNavbarLinks';

import styles from '~/assets/jss/material-dashboard-react/components/sidebarStyle';

import { Text } from './styles';

const useStyles = makeStyles(styles);

export default function Sidebar(props) {
  const classes = useStyles();

  const { logo, image, logoText } = props;

  const links = (
    <List>
      <Link to="/dashboardadmin">
        <ListItem button className={classes.itemLink}>
          <MdDashboard className={classes.itemIcon} />
          <Text>DASHBOARD</Text>
        </ListItem>
      </Link>

      <Link to="/products">
        <ListItem button className={classes.itemLink}>
          <MdStore className={classes.itemIcon} />
          <Text>PRODUTOS</Text>
        </ListItem>
      </Link>
      <Link to="/requests">
        <ListItem button className={classes.itemLink}>
          <MdAssignment className={classes.itemIcon} />
          <Text>PEDIDOS</Text>
        </ListItem>
      </Link>

      <Link to="/profile">
        <ListItem button className={classes.itemLink}>
          <MdPerson className={classes.itemIcon} />
          <Text>PERFIL</Text>
        </ListItem>
      </Link>
    </List>
  );
  const brand = (
    <div className={classes.logo}>
      <a href="http//www.teste.com.br" className={classes.logoLink}>
        <div className={classes.logoImage}>
          <img src={logo} alt="logo" className={classes.img} />
        </div>
        {logoText}
      </a>
    </div>
  );
  return (
    <div>
      <Hidden mdUp implementation="css">
        <Drawer
          variant="temporary"
          anchor={props.rtlActive ? 'left' : 'right'}
          open={props.open}
          onClose={props.handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          {brand}
          <div className={classes.sidebarWrapper}>
            <AdminNavbarLinks />
            {links}
          </div>
          {image !== undefined ? (
            <div
              className={classes.background}
              style={{ backgroundImage: `url(${image})` }}
            />
          ) : null}
        </Drawer>
      </Hidden>
      <Hidden smDown implementation="css">
        <Drawer
          anchor={props.rtlActive ? 'right' : 'left'}
          variant="permanent"
          open
        >
          {brand}
          <div className={classes.sidebarWrapper}>{links}</div>
          {image !== undefined ? (
            <div
              className={classes.background}
              style={{ backgroundImage: `url(${image})` }}
            />
          ) : null}
        </Drawer>
      </Hidden>
    </div>
  );
}

Sidebar.propTypes = {
  rtlActive: PropTypes.bool,
  handleDrawerToggle: PropTypes.func,

  logo: PropTypes.string,
  image: PropTypes.string,
  logoText: PropTypes.string,

  open: PropTypes.bool,
};
