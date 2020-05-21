import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

import { MdAssessment, MdShoppingCart, MdSubject } from 'react-icons/md';

import GridContainer from '~/components/Grid/GridContainer';
import GridItem from '~/components/Grid/GridItem';
import CardMenu from '~/components/Card/CardMenu';
import CardIcon from '~/components/Card/CardIcon';

import Button from '~/components/CustomButtons/Button';

import { OpButon } from './styles';
import styles from '~/assets/jss/material-dashboard-react/views/dashboardStyle';

import history from '~/services/history';

const useStyles = makeStyles(styles);

export default function Request() {
  const classes = useStyles();

  function handleTableOrders() {
    history.push('requestsorders');
  }

  return (
    <>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <CardMenu>
            <CardIcon color="danger">
              <h4 className={classes.cardTitleTable}>Gerenciar Solicitações</h4>
              <p className={classes.cardCategoryTable}>
                Ultima venda realizada há 2 horas
              </p>
            </CardIcon>
            <OpButon>
              <Button
                onClick={handleTableOrders}
                // onClick={() => handleClickProfile(order.id)}
                color="danger"
                className={classes.buttonLink}
              >
                <MdSubject color="#fff" size={30} />
                Visualizar ordens
              </Button>
              <Button
                // onClick={() => handleClickProfile(order.id)}
                color="info"
                className={classes.buttonLink}
              >
                <MdAssessment color="#fff" size={30} />
                Detalhar vendas
              </Button>
              <Button
                // onClick={() => handleClickProfile(order.id)}
                color="success"
                className={classes.buttonLink}
              >
                <MdShoppingCart color="#fff" size={30} />
                Área de vendas
              </Button>
            </OpButon>
          </CardMenu>
        </GridItem>
      </GridContainer>
    </>
  );
}
