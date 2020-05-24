/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect } from 'react';

import { makeStyles } from '@material-ui/core/styles';
// import { Confirm } from 'semantic-ui-react';

import { format } from 'date-fns';

import classNames from 'classnames';

import Poppers from '@material-ui/core/Popper';
import { MdInfo, MdFiberManualRecord, MdArrowBack } from 'react-icons/md';
import {
  MenuItem,
  MenuList,
  Grow,
  Paper,
  ClickAwayListener,
  Divider,
} from '@material-ui/core';

import { toast } from 'react-toastify';
import GridContainer from '~/components/Grid/GridContainer';
import GridItem from '~/components/Grid/GridItem';
import Card from '~/components/Card/Card';
import CardIcon from '~/components/Card/CardIcon';

import Button from '~/components/CustomButtons/Button';

import { Theade, Tbody, Tr, OpButon } from './styles';
import styles from '~/assets/jss/material-dashboard-react/views/dashboardStyle';

import api from '~/services/api';
import history from '~/services/history';

const useStyles = makeStyles(styles);

export default function Request() {
  const classes = useStyles();
  const [openDetals, setOpenDetals] = useState(null);
  const [orders, setOrders] = useState([]);
  const [OrderUnit, setOrderUnit] = useState(0);
  const [statusOrder, setStatusOrder] = useState(null);
  // const [openConfirm, setOpenConfirm] = useState(false);

  useEffect(() => {
    async function loadOrders() {
      const response = await api.get('ordersres');
      const { data } = response;

      setOrders(data);
    }
    loadOrders();
  }, []);

  async function tagleFinished() {
    if (statusOrder === 'Preparar') {
      await api.delete(`ordersreq/${OrderUnit}/Preparando`);

      toast.info('Ordem está em Preparo!');
      return;
    }

    if (statusOrder === 'Finalizar') {
      await api.delete(`ordersreq/${OrderUnit}/Finalizado`);

      toast.success('Ordem finalizada com sucesso!');
    } else {
      toast.warn(`Orderm já está ${statusOrder}`);
    }
  }
  async function tagleCanceled() {
    if (statusOrder === 'Preparar' || statusOrder === 'Finalizar') {
      await api.delete(`ordersreq/${OrderUnit}/Cancelada`);

      toast.success('Ordem cancelada com sucesso!');
    } else {
      toast.warn(`Orderm já está ${statusOrder}`);
    }
  }

  // ABRE A CAIXA DE SELEÇÃO
  function handleClickProfile(event) {
    if (openDetals && openDetals.contains(event.target)) {
      setOpenDetals(null);
    } else if (event.target.id !== '') {
      setOrderUnit(parseInt(event.target.id, 10));
      setOpenDetals(event.currentTarget);

      // DEFINE OPÇÕES DE DETALHES
      if (event.target.name === 'Aguardando') {
        // console.log(event.target.name);
        setStatusOrder('Preparar');
        return;
      }
      if (event.target.name === 'Preparando') {
        // console.log(event.target.name);
        setStatusOrder('Finalizar');
        return;
      }
      if (event.target.name === 'Cancelada') {
        // console.log(event.target.name);
        setStatusOrder('Cancelada');
      }
      if (event.target.name === 'Finalizado') {
        // console.log(event.target.name);
        setStatusOrder('Finalizado');
      }
    }
  }

  function formatDate(date) {
    const dateFormated = format(new Date(date), 'MM/dd/yyyy');
    return dateFormated;
  }
  function formatFile(file) {
    if (file !== null) {
      const fileFormated = file.path.slice(-3);
      return fileFormated;
    }
    return 'Sem Anexo';
  }

  // FECHA A CAIXA DE OPÇÕES
  function handleCloseProfile() {
    setOpenDetals(null);
  }

  function handleTableRequest() {
    history.push('dashboardadmin');
  }

  function handleOpenDetals() {
    history.push(`requestsordetal/${encodeURIComponent(OrderUnit)}/`);
  }

  // function openBoxConfirm() {
  //   setOpenConfirm(true);
  // }
  // function closeBoxConfirm() {
  //   setOpenConfirm(false);
  // }

  return (
    <>
      {/* <Confirm
        open={openConfirm}
        onCancel={closeBoxConfirm}
        onConfirm={closeBoxConfirm}
        className={classes.popperClose}
      /> */}

      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardIcon color="danger">
              <h4 className={classes.cardTitleTable}>
                Gerenciando Socilitações
              </h4>
              <p className={classes.cardCategoryTable}>
                Ultima venda realizada há 2 horas
              </p>
            </CardIcon>
            <OpButon>
              <Button
                onClick={handleTableRequest}
                // onClick={() => handleClickProfile(order.id)}
                color="info"
                className={classes.buttonLink}
              >
                <MdArrowBack color="#fff" size={30} />
                Voltar
              </Button>
            </OpButon>
            <table cellSpacing="0">
              <Theade className={classes.cardTitleUser}>
                <tr>
                  <th>ID</th>
                  <th>Data</th>
                  <th>Usuário</th>
                  <th>Seguimento</th>
                  <th>Documento</th>
                  <th>Status</th>
                  <th>Detalhes</th>
                </tr>
              </Theade>
              <Tbody>
                {orders.map((order) => (
                  <Tr status={order.status} key={order.id}>
                    <td>#{order.id}</td>
                    <td>{formatDate(order.created_at)}</td>
                    <td>{order.user.name}</td>
                    <td>Materiais para construção</td>
                    <td>{formatFile(order.fileRequest)}</td>
                    <td>
                      <div>
                        <span>
                          <MdFiberManualRecord size={10} /> {order.status}
                        </span>
                      </div>
                    </td>
                    <td>
                      <Button
                        onClick={handleClickProfile}
                        // onClick={() => handleClickProfile(order.id)}
                        color="transparent"
                        className={classes.buttonLink}
                        id={order.id}
                        name={order.status}
                      >
                        <MdInfo color="#999" size={30} />
                      </Button>
                    </td>
                  </Tr>
                ))}
              </Tbody>
            </table>
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
                  {statusOrder !== 'Cancelada' &&
                  statusOrder !== 'Finalizado' ? (
                    <>
                      <MenuItem
                        type="button"
                        onClick={tagleFinished}
                        className={classes.dropdownItem}
                      >
                        {statusOrder}
                      </MenuItem>
                      <Divider light />
                    </>
                  ) : (
                    ''
                  )}

                  <MenuItem
                    type="button"
                    onClick={handleOpenDetals}
                    className={classes.dropdownItem}
                  >
                    Visualizar
                  </MenuItem>

                  {statusOrder === 'Cancelada' ||
                  statusOrder === 'Finalizado' ? (
                    ''
                  ) : (
                    <>
                      <Divider light />
                      <MenuItem
                        type="button"
                        onClick={tagleCanceled}
                        className={classes.dropdownItem}
                      >
                        Cancelar
                      </MenuItem>
                    </>
                  )}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Poppers>
    </>
  );
}
