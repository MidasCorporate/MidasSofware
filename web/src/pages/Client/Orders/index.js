/* eslint-disable no-nested-ternary */
import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { MdAdd, MdDescription } from 'react-icons/md';

// import api from '~/services/api';
import history from '~/services/history';

import GridContainer from '~/components/Grid/GridContainer';
import GridItem from '~/components/Grid/GridItem';
import Card from '~/components/Card/Card';
import CardIcon from '~/components/Card/CardIcon';
import CustomButton from '~/components/CustomButtons/Button';

import styles from '~/assets/jss/material-dashboard-react/views/dashboardStyle';
import { Container } from './styles';

const useStyles = makeStyles(styles);

export default function Products() {
  const classes = useStyles();

  function handleCreate() {
    history.push('ordercreate');
  }

  function handleListBudget() {
    // history.push();
  }

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardIcon color="danger">
            <h4 className={classes.cardTitleTable}>Gerenciando orçamentos</h4>
            <p className={classes.cardCategoryTable}>
              Ultimo orçamento atualizado há 2 horas
            </p>
          </CardIcon>

          <Container>
            <CustomButton
              size={30}
              color="warning"
              onClick={handleListBudget}
              type="button"
            >
              <MdDescription size={30} color="#FFF" />
              <strong>Listar meus orçamentos</strong>
            </CustomButton>
            <CustomButton
              size={30}
              color="danger"
              onClick={handleCreate}
              type="button"
            >
              <MdAdd size={30} color="#FFF" />
              <strong>Criar Orçamento</strong>
            </CustomButton>
          </Container>
        </Card>
      </GridItem>
    </GridContainer>
  );
}
