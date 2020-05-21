/* eslint-disable no-nested-ternary */
import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { MdAdd } from 'react-icons/md';

import api from '~/services/api';
import history from '~/services/history';

import GridContainer from '~/components/Grid/GridContainer';
import GridItem from '~/components/Grid/GridItem';
import Card from '~/components/Card/Card';
import CardIcon from '~/components/Card/CardIcon';

import styles from '~/assets/jss/material-dashboard-react/views/dashboardStyle';
import { Container, Add } from './styles';

const useStyles = makeStyles(styles);

export default function Products() {
  const classes = useStyles();

  function handleCreate() {
    history.push('productcreate');
  }

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardIcon color="danger">
            <h4 className={classes.cardTitleTable}>Gerenciando produtos</h4>
            <p className={classes.cardCategoryTable}>
              Ultimo produto atualizado há 2 horas
            </p>
          </CardIcon>

          <Container>
            <Add onClick={handleCreate} type="button">
              <MdAdd size={26} color="#FFF" />
              <strong>CADASTRAR</strong>
            </Add>
          </Container>
        </Card>
      </GridItem>
    </GridContainer>
  );
}
