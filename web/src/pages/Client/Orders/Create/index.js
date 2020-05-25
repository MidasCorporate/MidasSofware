/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Form } from '@unform/web';
import { toast } from 'react-toastify';

import { makeStyles } from '@material-ui/core/styles';
import { MdArrowBack, MdDone } from 'react-icons/md';

import api from '~/services/api';
import history from '~/services/history';

import GridContainer from '~/components/Grid/GridContainer';
import GridItem from '~/components/Grid/GridItem';
import Card from '~/components/Card/Card';
import CardIcon from '~/components/Card/CardIcon';
import { Input, Select } from '~/components/Form';
import CustomButtons from '~/components/CustomButtons/Button';
import Request from './Request';

import styles from '~/assets/jss/material-dashboard-react/views/dashboardStyle';
import { Container, Actions } from './styles';

const useStyles = makeStyles(styles);

export default function ProductCreate({ location }) {
  const [segments, setSegments] = useState([]);
  const classes = useStyles();
  const profile = useSelector((state) => state.user.profile);

  // const { id, name } = location.state;

  useEffect(() => {
    async function loadSegments() {
      const response = await api.get('segments');

      setSegments(response.data);
    }
    loadSegments();
  }, []);

  const optionsSegments = segments.map((segment) => {
    return {
      id: segment.id,
      value: segment.id,
      label: segment.segment,
    };
  });

  async function handleSubmit(data) {
    const { file_req_id, amount, category, request } = data;
    await api.post('ordersreq', {
      user_id: profile.id,
      file_req_id,
      amount,
      status: 'Aguardando',
      request,
      segment_id: category,
    });

    toast.success('Orçamento enviado com sucesso');
  }

  function handleBack() {
    history.push('ordersclient');
  }

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardIcon color="danger">
            <h4 className={classes.cardTitleTable}>Criando orçamento</h4>
            <p className={classes.cardCategoryTable}>
              Ultimo produto cadastrado há 2 horas
            </p>
          </CardIcon>

          <Container>
            <Form initialData={profile} onSubmit={handleSubmit}>
              <Actions>
                <CustomButtons onClick={handleBack} size={43} color="info">
                  <MdArrowBack size={30} color="#fff" />
                  Voltar
                </CustomButtons>
                <CustomButtons type="submit" color="success">
                  <MdDone size={30} color="#fff" />
                  Enviar
                </CustomButtons>
              </Actions>
              <Input name="name" placeholder="Nome completo" />
              <Input name="email" placeholder="E-mail" />
              <div className="form-div-1">
                <Input name="amount" type="number" placeholder="Quantidade" />
                <Select
                  name="category"
                  // placeholder="Categoria"
                  options={optionsSegments}
                />
              </div>
              <Request />
            </Form>
          </Container>
        </Card>
      </GridItem>
    </GridContainer>
  );
}
