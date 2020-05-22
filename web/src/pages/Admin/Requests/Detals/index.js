/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from 'react';

import { parseISO, formatDistance, format } from 'date-fns';
import pt from 'date-fns/locale/pt';

import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

import { MdArrowBack, MdDone, MdClear, MdAdd } from 'react-icons/md';

import GridContainer from '~/components/Grid/GridContainer';
import GridItem from '~/components/Grid/GridItem';
import Card from '~/components/Card/Card';
import CardIcon from '~/components/Card/CardIcon';
import CardBody from '~/components/Card/CardBody';
import Table from '~/components/Table/Table';

import Decodifiq from '~/components/Decodifiq';
import Response from '../Response';

import Button from '~/components/CustomButtons/Button';

import { OpButon, Add } from './styles';
import styles from '~/assets/jss/material-dashboard-react/views/dashboardStyle';

import history from '~/services/history';
import api from '~/services/api';

const useStyles = makeStyles(styles);
export default function Request(props) {
  const classes = useStyles();
  const [orderDetals, setOrderDetals] = useState([]);
  const [dateOrder, setDateOrder] = useState('');
  const [dateUser, setDateUser] = useState('');
  const [userDetals, setDetalsUser] = useState([]);
  const [situation, setSituation] = useState(false);

  useEffect(() => {
    async function loadUsersOrder() {
      const { match } = props;
      const orderId = parseInt(decodeURIComponent(match.params.id), 10);
      const response = await api.get('orders');
      const dataOrder = response.data.find((order) => order.id === orderId);
      const dateDetalsOrder = formatDistance(
        parseISO(dataOrder.created_at),
        new Date(),
        {
          addSuffix: false,
          locale: pt,
        }
      );
      const formatdateUser = parseISO(dataOrder.user.created_at);

      const formattedDateUser = format(
        formatdateUser,
        "'Dia' dd 'de' MMMM', às ' HH:mm'h'"
      );

      setDetalsUser(dataOrder.user);
      setDateUser(formattedDateUser);
      setDateOrder(dateDetalsOrder);
      setOrderDetals(dataOrder);
    }
    loadUsersOrder();
  }, []);

  function handleTableOrders() {
    history.push('/requestsorders');
  }

  function handleResponseRequest() {
    setSituation(!situation);
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
                Detalhes da solicitação de orçamento #ID {orderDetals.id}
              </h4>
              <p className={classes.cardCategoryTable}>
                Solicitação realizada há {dateOrder}
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

              {buttonCancel}
              {buttonFinished}
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
                tableData={[[`${orderDetals.body}`]]}
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
                  [
                    `${userDetals.id}`,
                    `${userDetals.name}`,
                    `${userDetals.email}`,
                    `${dateUser}`,
                  ],
                ]}
              />
            </CardBody>
          </Card>
        </GridItem>
        {orderDetals.status === 'Cancelado' ? (
          <>
            <Add>
              <Button
                onClick={handleResponseRequest}
                // onClick={() => handleClickProfile(order.id)}
                color="info"
                aria-label="edit"
                justIcon
                round
              >
                <MdAdd size={30} color="#fff" />
              </Button>
              <Response color={Decodifiq(orderDetals)} tag={situation} />
            </Add>
          </>
        ) : (
          ''
        )}
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
