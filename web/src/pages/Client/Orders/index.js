/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { format } from 'date-fns';

import { makeStyles } from '@material-ui/core/styles';
import { MdAdd, MdFiberManualRecord } from 'react-icons/md';

import api from '~/services/api';
import history from '~/services/history';

import GridContainer from '~/components/Grid/GridContainer';
import GridItem from '~/components/Grid/GridItem';
import Card from '~/components/Card/Card';
import CardIcon from '~/components/Card/CardIcon';
import CustomButton from '~/components/CustomButtons/Button';
import Actions from './Actions';

import styles from '~/assets/jss/material-dashboard-react/views/dashboardStyle';
import { Create, Container, Tr } from './styles';

const useStyles = makeStyles(styles);

export default function Products() {
  const [orders, setOrders] = useState([]);
  const { id } = useSelector((state) => state.user.profile);
  const classes = useStyles();

  useEffect(() => {
    async function loadOrders() {
      const response = await api.get(`ordersreq?user_id=${id}`);
      setOrders(response.data);
    }
    loadOrders();
  }, []);

  function handleCreate() {
    history.push('ordercreate');
  }

  function formatDate(date) {
    return format(new Date(date), 'dd/MM/yyyy');
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

          <Create>
            <CustomButton
              size={30}
              color="danger"
              onClick={handleCreate}
              type="button"
            >
              <MdAdd size={30} color="#FFF" />
              <strong>Criar Orçamento</strong>
            </CustomButton>
          </Create>

          <Container>
            <table>
              <thead>
                <tr>
                  <th>Resposta</th>
                  <th>Data</th>
                  <th>Segmento</th>
                  <th>Status</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <Tr status={order.status} key={order.id}>
                    <td>{order.response}</td>
                    <td>{formatDate(order.created_at)}</td>

                    <td>{order.category.segment}</td>
                    <td>
                      <div className="div-status">
                        <span>
                          <MdFiberManualRecord size={10} /> {order.status}
                        </span>
                      </div>
                    </td>
                    <td>
                      <Actions>{order}</Actions>
                    </td>
                  </Tr>
                ))}
              </tbody>
            </table>
          </Container>
        </Card>
      </GridItem>
    </GridContainer>
  );
}
