/* eslint-disable no-nested-ternary */
import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

import GridContainer from '~/components/Grid/GridContainer';
import GridItem from '~/components/Grid/GridItem';
import Card from '~/components/Card/Card';
import CardIcon from '~/components/Card/CardIcon';
import styles from '~/assets/jss/material-dashboard-react/views/dashboardStyle';

const useStyles = makeStyles(styles);

export default function Produto() {
  const classes = useStyles();

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardIcon color="info">
            <h4 className={classes.cardTitleTable}>Cadastro de Produtos</h4>
            <p className={classes.cardCategoryTable}>
              Ultimo produto cadastrado há 2 horas
            </p>
          </CardIcon>
        </Card>
      </GridItem>
    </GridContainer>
  );
}
