/* eslint-disable no-nested-ternary */
import React from 'react';
import { Form } from '@unform/web';

import { makeStyles } from '@material-ui/core/styles';

import api from '~/services/api';
import history from '~/services/history';

import GridContainer from '~/components/Grid/GridContainer';
import GridItem from '~/components/Grid/GridItem';
import Card from '~/components/Card/Card';
import CardIcon from '~/components/Card/CardIcon';
import { Input } from '~/components/Form';
import Image from './Image';

import styles from '~/assets/jss/material-dashboard-react/views/dashboardStyle';
import { Container } from './styles';

const useStyles = makeStyles(styles);

export default function ProductCreate() {
  const classes = useStyles();

  async function handleSubmit(data) {
    const { image_id, name, description, price, category } = data;
    await api.post('products', {
      image_id,
      name,
      description,
      price,
      category,
    });
  }

  function handleBack() {
    history.push('products');
  }

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardIcon color="danger">
            <h4 className={classes.cardTitleTable}>Cadastro de produtos</h4>
            <p className={classes.cardCategoryTable}>
              Ultimo produto cadastrado há 2 horas
            </p>
          </CardIcon>

          <Container>
            <Form onSubmit={handleSubmit}>
              <Image />
              <Input name="name" placeholder="Nome do produto" />
              <Input name="description" placeholder="Descrição do produto" />
              <div className="form-div-1">
                <Input
                  name="price"
                  type="text"
                  placeholder="Preço do produto"
                />
                <Input name="category" placeholder="Categoria do produto" />
              </div>
              <button type="submit">Salvar</button>
              <button type="button" onClick={handleBack}>
                Voltar
              </button>
            </Form>
          </Container>
        </Card>
      </GridItem>
    </GridContainer>
  );
}
