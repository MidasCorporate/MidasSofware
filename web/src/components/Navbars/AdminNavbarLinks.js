/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import classNames from 'classnames';

import { Link } from 'react-router-dom';

// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
import {
  MenuItem,
  MenuList,
  Grow,
  Paper,
  ClickAwayListener,
  Hidden,
  Divider,
} from '@material-ui/core';

import Poppers from '@material-ui/core/Popper';

// @material-ui/icons
import { Person, Notifications, Dashboard, Search } from '@material-ui/icons';

// core components
import { parseISO, formatDistance } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { signOut } from '~/store/modules/auth/actions';
import CustomInput from '~/components/CustomInput/CustomInput';
import Button from '~/components/CustomButtons/Button';

import styles from '~/assets/jss/material-dashboard-react/components/headerLinksStyle';

import api from '~/services/api';

const useStyles = makeStyles(styles);

export default function AdminNavbarLinks() {
  const classes = useStyles();
  // DESTINADOS ESPECIFICAMENTE PARA A LOGICA DE ABRIR E FECHAR AS CAIXAS
  const [openNotification, setOpenNotification] = useState(null);
  const [openProfile, setOpenProfile] = useState(null);
  const [notifications, setNotification] = useState([]);
  const dispatch = useDispatch();

  // CARREGANDO MSG DO MONGO
  useEffect(() => {
    async function load() {
      const response = await api.get('notifications');
      const data = response.data.map((notification) => ({
        ...notification,
        timeDistance: formatDistance(
          parseISO(notification.createdAt),
          new Date(),
          { addSuffix: true, locale: pt }
        ),
      }));

      setNotification(data);
    }
    load();
  }, []);
  // RESPONSAVEL ICONE DE MSG NÃO LIDA
  const hasUnread = useMemo(
    () => !!notifications.find((notification) => notification.read === false),
    [notifications]
  );

  // VERIFICA QUANTIDADE DE MSG NÃO LIDAS
  const hasUnreadQuant = useMemo(
    () =>
      notifications.filter((notification) => notification.read === false)
        .length,
    [notifications]
  );

  // COLOCA NOTIFICAÇÃO COMO LIDA
  async function handleMarkAsRead(id) {
    await api.put(`notifications/${id}`);

    setNotification(
      notifications.map((notification) =>
        notification._id === id ? { ...notification, read: true } : notification
      )
    );
  }

  // ABRE A CAIXA DE NOTIFICAÇÃO
  function handleClickNotification(event) {
    if (openNotification && openNotification.contains(event.target)) {
      setOpenNotification(null);
    } else {
      setOpenNotification(event.currentTarget);
    }
  }

  // FECHA A CAIXA DE NOTIFICAÇÕES AO EVENTO CLIK
  function handleCloseNotification() {
    setOpenNotification(null);
  }

  // ABRE A CAIXA DE SELEÇÃO DO PERFIL
  function handleClickProfile(event) {
    if (openProfile && openProfile.contains(event.target)) {
      setOpenProfile(null);
    } else {
      setOpenProfile(event.currentTarget);
    }
  }
  // FECHA A CAIXA DE NOTIFICAÇÃO
  function handleCloseProfile() {
    dispatch(signOut());
    // setOpenProfile(null);
  }

  return (
    <div>
      {/* { BARRA DE PESQUISA } */}
      <div className={classes.searchWrapper}>
        <CustomInput
          formControlProps={{
            className: `${classes.margin} ${classes.search}`,
          }}
          inputProps={{
            placeholder: 'Search',
            inputProps: {
              'aria-label': 'Search',
            },
          }}
        />
        <Button color="white" aria-label="edit" justIcon round>
          <Search />
        </Button>
      </div>
      {/* {BOTÃO DASHBOARD} */}
      <Link to="/dashboardadmin">
        <Button
          color={window.innerWidth > 959 ? 'transparent' : 'white'}
          justIcon={window.innerWidth > 959}
          simple={!(window.innerWidth > 959)}
          aria-label="Dashboard"
          className={classes.buttonLink}
        >
          <Dashboard className={classes.icons} />
          <Hidden mdUp implementation="css">
            <p className={classes.linkText}>Dashboard</p>
          </Hidden>
        </Button>
      </Link>
      {/* {IDENTIFICAR A FUNÇÃO DESSAS classes} */}
      <div className={classes.manager}>
        {/* { BOTÃO DAS NOTIFICAÇÕES } */}
        <Button
          color={window.innerWidth > 959 ? 'transparent' : 'white'}
          justIcon={window.innerWidth > 959}
          simple={!(window.innerWidth > 959)}
          aria-owns={openNotification ? 'notification-menu-list-grow' : null}
          aria-haspopup="true"
          onClick={handleClickNotification}
          className={classes.buttonLink}
        >
          <Notifications className={classes.icons} />
          {hasUnread ? (
            <>
              <span className={classes.notifications}>{hasUnreadQuant}</span>
            </>
          ) : (
            ''
          )}
          <Hidden mdUp implementation="css">
            <p onClick={handleCloseNotification} className={classes.linkText}>
              NOTIFICAÇÕES
            </p>
          </Hidden>
        </Button>
        {/* { CAIXA DE NOTIFICAÇÕES } */}
        <Poppers
          open={Boolean(openNotification)}
          anchorEl={openNotification}
          transition
          disablePortal
          className={`${classNames({
            [classes.popperClose]: !openNotification,
          })} ${classes.popperNav}`}
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              id="notification-menu-list-grow"
              style={{
                transformOrigin:
                  placement === 'bottom' ? 'center top' : 'center bottom',
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleCloseNotification}>
                  <MenuList role="menu">
                    {notifications.map((notification) =>
                      notification.read === false ? (
                        <>
                          <MenuItem
                            key={notification._id}
                            onClick={() => handleMarkAsRead(notification._id)}
                            className={classes.dropdownItem}
                          >
                            <div>{notification.content}</div>

                            <span>{notification.timeDistance}</span>
                          </MenuItem>
                        </>
                      ) : (
                        ''
                      )
                    )}
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Poppers>
      </div>
      {/* {CAIXA DE OPÇÃO PROFILE} */}
      <div className={classes.manager}>
        <Button
          color={window.innerWidth > 959 ? 'transparent' : 'white'}
          justIcon={window.innerWidth > 959}
          simple={!(window.innerWidth > 959)}
          aria-owns={openProfile ? 'profile-menu-list-grow' : null}
          aria-haspopup="true"
          onClick={handleClickProfile}
          className={classes.buttonLink}
        >
          <Person className={classes.icons} />
          <Hidden mdUp implementation="css">
            <p className={classes.linkText}>Profile</p>
          </Hidden>
        </Button>
        <Poppers
          open={Boolean(openProfile)}
          anchorEl={openProfile}
          transition
          disablePortal
          className={`${classNames({ [classes.popperClose]: !openProfile })} ${
            classes.popperNav
          }`}
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              id="profile-menu-list-grow"
              style={{
                transformOrigin:
                  placement === 'bottom' ? 'center top' : 'center bottom',
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleCloseProfile}>
                  <MenuList role="menu">
                    <Link to="/profile">
                      <MenuItem
                        onClick={handleCloseProfile}
                        className={classes.dropdownItem}
                      >
                        Profile
                      </MenuItem>
                    </Link>
                    <MenuItem
                      onClick={handleCloseProfile}
                      className={classes.dropdownItem}
                    >
                      Settings
                    </MenuItem>
                    <Divider light />
                    <MenuItem
                      onClick={handleCloseProfile}
                      className={classes.dropdownItem}
                    >
                      Logout
                    </MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Poppers>
      </div>
    </div>
  );
}
