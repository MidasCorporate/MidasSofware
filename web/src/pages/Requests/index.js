/* eslint-disable no-nested-ternary */
import React, { useState } from 'react';

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
// import api from '~/services/api';

// import Actions from '~/components/Actions';
import { Theade, Tbody } from './styles';
import styles from '~/assets/jss/material-dashboard-react/views/dashboardStyle';

const useStyles = makeStyles(styles);

export default function Request() {
  const classes = useStyles();
  const [openProfile, setOpenProfile] = useState(null);

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
                <tr>
                  <td>#ID</td>
                  <td>Bruno Luiz</td>
                  <td>Paulinho veloster</td>
                  <td>SGO</td>
                  <td>MS</td>
                  <td>Concluido</td>
                  <td>R$250,00</td>
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
                <tr>
                  <td>#ID</td>
                  <td>Bruno Luiz</td>
                  <td>Paulinho veloster</td>
                  <td>SGO</td>
                  <td>MS</td>
                  <td>Concluido</td>
                  <td>R$250,00</td>
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
