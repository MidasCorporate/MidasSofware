/* eslint-disable no-nested-ternary */
import React from 'react';
import { Form } from '@unform/core';

import { makeStyles } from '@material-ui/core/styles';

import GridContainer from '~/components/Grid/GridContainer';
import GridItem from '~/components/Grid/GridItem';
import Card from '~/components/Card/Card';
import CardIcon from '~/components/Card/CardIcon';
import { Input } from '~/components/Form';
import Image from './Image';

import styles from '~/assets/jss/material-dashboard-react/views/dashboardStyle';
import { Container } from './styles';

const useStyles = makeStyles(styles);

export default function Produto() {
  const classes = useStyles();

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardIcon color="danger">
            <h4 className={classes.cardTitleTable}>Cadastro de Produtos</h4>
            <p className={classes.cardCategoryTable}>
              Ultimo produto cadastrado há 2 horas
            </p>
          </CardIcon>

          <Container>
            <Form>
              <Image />
              <Input name="name" placeholder="Nome do produto" />
              <Input name="description" placeholder="Descrição do produto" />
              <Input
                name="price"
                type="number"
                placeholder="Preço do produto"
              />
              <Input name="category" placeholder="Categoria do produto" />
              <button type="submit">Salvar</button>
            </Form>
          </Container>
        </Card>
      </GridItem>
    </GridContainer>
  );
}
