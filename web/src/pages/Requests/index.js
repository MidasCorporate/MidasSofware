/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from 'react';

import { makeStyles } from '@material-ui/core/styles';

import { Link } from 'react-router-dom';
import classNames from 'classnames';

import Poppers from '@material-ui/core/Popper';
import { MdInfo } from 'react-icons/md';
import {
  MenuItem,
  MenuList,
  Grow,
  Paper,
  ClickAwayListener,
  Divider,
} from '@material-ui/core';
import GridContainer from '~/components/Grid/GridContainer';
import GridItem from '~/components/Grid/GridItem';
import Card from '~/components/Card/Card';
import CardIcon from '~/components/Card/CardIcon';

import Button from '~/components/CustomButtons/Button';

// import { toast } from 'react-toastify';

// import { store } from '~/store';

// import history from '~/services/history';

// import Actions from '~/components/Actions';
import { Theade, Tbody } from './styles';
import styles from '~/assets/jss/material-dashboard-react/views/dashboardStyle';
import api from '~/services/api';

const useStyles = makeStyles(styles);

export default function Request() {
  const classes = useStyles();
  const [openProfile, setOpenProfile] = useState(null);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    async function loadOrders() {
      const response = await api.get('orders');
      const { data } = response;
      setOrders(data);
    }
    loadOrders();
  }, []);

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
    setOpenProfile(null);
  }

  return (
    <>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardIcon color="info">
              <h4 className={classes.cardTitleTable}>Ultimas Vendas</h4>
              <p className={classes.cardCategoryTable}>
                Ultima venda realizada há 2 horas
              </p>
            </CardIcon>

            <table cellSpacing="0">
              <Theade>
                <tr>
                  <th>ID</th>
                  <th>Quantidade</th>
                  <th>Produto</th>
                  <th>Valor Unt</th>
                  <th>Cliente</th>
                  <th>Status</th>
                  <th>Valor Total</th>
                  <th>Detalhes</th>
                </tr>
              </Theade>
              <Tbody>
                {orders.map((order) => (
                  <tr key={order.id}>
                    <td>#{order.id}</td>
                    <td>{order.amount}</td>
                    <td>{order.products.name}</td>
                    <td>{order.products.price}</td>
                    <td>{order.user.name}</td>
                    <td>{order.status}</td>
                    <td>{order.products.price}</td>
                    <td>
                      <Button
                        onClick={handleClickProfile}
                        color="transparent"
                        className={classes.buttonLink}
                      >
                        <MdInfo color="#999" size={30} />
                      </Button>
                    </td>
                  </tr>
                ))}
              </Tbody>
            </table>
          </Card>
        </GridItem>
      </GridContainer>
      <Poppers
        open={Boolean(openProfile)}
        anchorEl={openProfile}
        transition
        disablePortal
        className={`${classNames({
          [classes.popperClose]: !openProfile,
        })} ${classes.popperNav}`}
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
                      Finalizar
                    </MenuItem>
                  </Link>
                  <MenuItem
                    onClick={handleCloseProfile}
                    className={classes.dropdownItem}
                  >
                    Visualizar
                  </MenuItem>
                  <Divider light />
                  <MenuItem
                    onClick={handleCloseProfile}
                    className={classes.dropdownItem}
                  >
                    Cancelar
                  </MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Poppers>
    </>
  );
}
