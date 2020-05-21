/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from 'react';

import { makeStyles } from '@material-ui/core/styles';

// import { Link } from 'react-router-dom';
import classNames from 'classnames';

import Poppers from '@material-ui/core/Popper';
import {
  MdInfo,
  MdFiberManualRecord,
  MdArrowDownward,
  MdArrowUpward,
} from 'react-icons/md';
import {
  MenuItem,
  MenuList,
  Grow,
  Paper,
  ClickAwayListener,
  Divider,
} from '@material-ui/core';

import { toast, ToastContainer } from 'react-toastify';
import GridContainer from '~/components/Grid/GridContainer';
import GridItem from '~/components/Grid/GridItem';
import Card from '~/components/Card/Card';
import CardIcon from '~/components/Card/CardIcon';

import Button from '~/components/CustomButtons/Button';

// import { toast } from 'react-toastify';

// import { store } from '~/store';

// import history from '~/services/history';

// import Actions from '~/components/Actions';
import { Theade, Tbody, Tr, Table, OpButon } from './styles';
import styles from '~/assets/jss/material-dashboard-react/views/dashboardStyle';
import api from '~/services/api';

const useStyles = makeStyles(styles);

export default function Request() {
  const classes = useStyles();
  const [openDetals, setOpenDetals] = useState(null);
  const [orders, setOrders] = useState([]);
  const [component, setComponent] = useState(0);
  const [tableOpen, setTableOpen] = useState(false);

  useEffect(() => {
    async function loadOrders() {
      const response = await api.get('orders');
      const { data } = response;
      setOrders(data);
    }
    loadOrders();
  }, []);

  async function tagleFinished() {
    const { status } = orders.find((order) => order.id === component);
    if (status === 'Preparando') {
      await api.delete(`orders/${component}/Finalizada`);
      // document.location.reload(true);
      toast.success('Ordem finalizada com sucesso!');
    } else {
      toast.warn(`Orderm já está ${status}`);
    }
  }
  async function tagleCanceled() {
    const { status } = orders.find((order) => order.id === component);
    if (status === 'Preparando') {
      await api.delete(`orders/${component}/Cancelada`);
      // document.location.reload(true);
      toast.success('Ordem cancelada com sucesso!');
    } else {
      toast.warn(`Orderm já está ${status}`);
    }
  }

  // ABRE A CAIXA DE SELEÇÃO
  function handleClickProfile(event) {
    // console.log(event.target.id);
    if (openDetals && openDetals.contains(event.target)) {
      setOpenDetals(null);
    } else if (event.target.id !== '') {
      setComponent(parseInt(event.target.id, 10));
      setOpenDetals(event.currentTarget);
    }
  }

  // FECHA A CAIXA DE OPÇÕES
  function handleCloseProfile() {
    setOpenDetals(null);
  }

  function handleTable() {
    setTableOpen(!tableOpen);
  }

  return (
    <>
      <GridContainer>
        <ToastContainer />
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardIcon color="danger">
              <h4 className={classes.cardTitleTable}>Ultimas vendas</h4>
              <p className={classes.cardCategoryTable}>
                Ultima venda realizada há 2 horas
              </p>
            </CardIcon>
            <OpButon>
              <Button
                onClick={handleTable}
                // onClick={() => handleClickProfile(order.id)}
                color="danger"
                className={classes.buttonLink}
              >
                {tableOpen ? (
                  <>
                    <MdArrowUpward color="#fff" size={30} />
                    Fechar
                  </>
                ) : (
                  <>
                    <MdArrowDownward color="#fff" size={30} />
                    Visualizar ordens
                  </>
                )}
              </Button>
            </OpButon>
            <Table tableOpen={tableOpen} cellSpacing="0">
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
                  <Tr status={order.status} key={order.id}>
                    <td>#{order.id}</td>
                    <td>{order.amount}</td>
                    <td>{order.products.name}</td>
                    <td>{order.products.price}</td>
                    <td>{order.user.name}</td>
                    <td>
                      <div>
                        <span>
                          <MdFiberManualRecord size={10} /> {order.status}
                        </span>
                      </div>
                    </td>
                    <td>{order.products.price}</td>
                    <td>
                      <Button
                        onClick={handleClickProfile}
                        // onClick={() => handleClickProfile(order.id)}
                        color="transparent"
                        className={classes.buttonLink}
                        id={order.id}
                      >
                        <MdInfo color="#999" size={30} />
                      </Button>
                    </td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Card>
        </GridItem>
      </GridContainer>
      <Poppers
        open={Boolean(openDetals)}
        anchorEl={openDetals}
        transition
        disablePortal
        className={`${classNames({
          [classes.popperClose]: !openDetals,
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
                  <MenuItem
                    onClick={tagleFinished}
                    className={classes.dropdownItem}
                  >
                    Finalizar
                  </MenuItem>

                  <MenuItem
                    onClick={handleCloseProfile}
                    className={classes.dropdownItem}
                  >
                    Visualizar
                  </MenuItem>
                  <Divider light />
                  <MenuItem
                    onClick={tagleCanceled}
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
