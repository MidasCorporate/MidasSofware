/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/require-default-props */
import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Hidden from '@material-ui/core/Hidden';
// @material-ui/icons
import Menu from '@material-ui/icons/Menu';
// core components
import Button from '~/components/CustomButtons/Button';
import styles from '~/assets/jss/material-dashboard-react/components/headerStyle';
import AdminNavbarLinks from './AdminNavbarLinks';

import history from '~/services/history';

const useStyles = makeStyles(styles);

export default function Header(props) {
  const profile = useSelector((state) => state.user.profile);
  const classes = useStyles();
  // PEGA NOME DA WINDOW LOGADA E COLOCA NO BUTTON
  function handlePageInitial() {
    if (profile.admin) {
      history.push('/dashboardadmin');
      return;
    }
    history.push('/dashboardclient');
  }
  const { color } = props;
  const appBarClasses = classNames({
    [` ${classes[color]}`]: color,
  });
  return (
    <AppBar className={classes.appBar + appBarClasses}>
      <Toolbar className={classes.container}>
        <div className={classes.flex}>
          {/* Here we create navbar brand, based on route name */}
          <Button
            onClick={handlePageInitial}
            color="transparent"
            href="#"
            className={classes.title}
          >
            Seja bem vindo de volta {profile.name}
          </Button>
        </div>
        <Hidden smDown implementation="css">
          <AdminNavbarLinks />
        </Hidden>
        {/* {BOTÃO ABRE SIDEBAR} */}
        <Hidden smDown implementation="css">
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={props.handleDrawerToggle}
          >
            <Menu />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
}

Header.propTypes = {
  color: PropTypes.oneOf(['primary', 'info', 'success', 'warning', 'danger']),
  rtlActive: PropTypes.bool,
  handleDrawerToggle: PropTypes.func,
};
