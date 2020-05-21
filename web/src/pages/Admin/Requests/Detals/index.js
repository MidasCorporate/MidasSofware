/* eslint-disable no-nested-ternary */
import React, { useEffect, useState, useMemo } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

import { MdArrowBack, MdDone, MdClear } from 'react-icons/md';

import GridContainer from '~/components/Grid/GridContainer';
import GridItem from '~/components/Grid/GridItem';
import Card from '~/components/Card/Card';
import CardIcon from '~/components/Card/CardIcon';
import CardBody from '~/components/Card/CardBody';
import Table from '~/components/Table/Table';

import Decodifiq from '~/components/Decodifiq';

import Button from '~/components/CustomButtons/Button';

import { OpButon } from './styles';
import styles from '~/assets/jss/material-dashboard-react/views/dashboardStyle';

import history from '~/services/history';
import api from '~/services/api';

const useStyles = makeStyles(styles);
export default function Request(props) {
  const classes = useStyles();
  const [orderDetals, setOrderDetals] = useState([]);

  useEffect(() => {
    async function loadUsersOrder() {
      const { match } = props;
      const orderId = parseInt(decodeURIComponent(match.params.id), 10);
      const response = await api.get('orders');
      const data = response.data.find((order) => order.id === orderId);

      setOrderDetals(data);
    }
    loadUsersOrder();
  }, []);

  function handleTableOrders() {
    history.push('/requestsorders');
  }

  const buttonCancel = (
    <Button
      onClick={handleTableOrders}
      // onClick={() => handleClickProfile(order.id)}
      color="danger"
      className={classes.buttonLink}
    >
      <MdClear color="#fff" size={30} />
      Cancelar
    </Button>
  );
  const buttonFinished = (
    <Button
      onClick={handleTableOrders}
      // onClick={() => handleClickProfile(order.id)}
      color="success"
      className={classes.buttonLink}
    >
      <MdDone color="#fff" size={30} />
      Atender
    </Button>
  );

  return (
    <>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardIcon color={Decodifiq(orderDetals)}>
              <h4 className={classes.cardTitleTable}>
                Detalhes da solicitação de compra #ID
              </h4>
              <p className={classes.cardCategoryTable}>
                Ultima venda realizada há 2 horas
              </p>
            </CardIcon>
            <OpButon>
              <Button
                onClick={handleTableOrders}
                // onClick={() => handleClickProfile(order.id)}
                color="info"
                className={classes.buttonLink}
              >
                <MdArrowBack color="#fff" size={30} />
                Voltar
              </Button>

              {orderDetals.status === 'Cancelado' ? (
                <>
                  {buttonCancel}
                  {buttonFinished}
                </>
              ) : orderDetals.status === 'Preparando' ? (
                <>
                  {buttonCancel}
                  {buttonFinished}
                </>
              ) : (
                ''
              )}
            </OpButon>
          </Card>
        </GridItem>
      </GridContainer>

      <GridContainer>
        <GridItem xs={12} sm={6} md={5}>
          <Card>
            <CardIcon color={Decodifiq(orderDetals)}>
              <h4 className={classes.cardTitleTable}>
                Informações da Solicitação
              </h4>
            </CardIcon>
            <CardBody>
              <Table
                tableHeaderColor={Decodifiq(orderDetals)}
                tableHead={['Descrição']}
                tableData={[
                  [
                    'Solicito a compra de 22 canetas cores aleátórias, preciso deste produto com extrema urgência ',
                  ],
                ]}
              />
            </CardBody>
          </Card>
        </GridItem>

        <GridItem xs={12} sm={6} md={5}>
          <Card>
            <CardIcon color={Decodifiq(orderDetals)}>
              <h4 className={classes.cardTitleTable}>Transacionador</h4>
            </CardIcon>
            <CardBody>
              <Table
                tableHeaderColor={Decodifiq(orderDetals)}
                tableHead={['ID', 'Nome', 'Email', 'Cadastro']}
                tableData={[
                  ['1', 'Dakota Rice', 'teste@teste.com', '27/05/2020'],
                ]}
              />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </>
  );
}

Request.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.number,
    }),
  }).isRequired,
};
