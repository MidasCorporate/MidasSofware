/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { parseISO, formatDistance, format } from 'date-fns';
import pt from 'date-fns/locale/pt';

import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

import {
  MdArrowBack,
  MdDone,
  MdClear,
  MdAdd,
  MdAttachFile,
} from 'react-icons/md';

import { toast } from 'react-toastify';

import GridContainer from '~/components/Grid/GridContainer';
import GridItem from '~/components/Grid/GridItem';
import Card from '~/components/Card/Card';
import CardIcon from '~/components/Card/CardIcon';
import CardBody from '~/components/Card/CardBody';
import Table from '~/components/Table/Table';

import Decodifiq from '~/components/Decodifiq';
import Response from '../Response';

import Button from '~/components/CustomButtons/Button';

import { OpButon, Add, FileOrder } from './styles';
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
  const [tagFile, setTagFile] = useState(false);
  const { segment_id } = useSelector((state) => state.user.profile);

  useEffect(() => {
    async function loadUsersOrder() {
      const { match } = props;
      const orderId = parseInt(decodeURIComponent(match.params.id), 10);
      const response = await api.get(`ordersres?segment_id=${segment_id}`);
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
      if (dataOrder.fileRequest !== null) {
        setTagFile(true);
      }
      if (orderDetals.response !== null) {
        setSituation(!situation);
      }

      setDetalsUser(dataOrder.user);
      setDateUser(formattedDateUser);
      setDateOrder(dateDetalsOrder);
      setOrderDetals(dataOrder);
    }
    loadUsersOrder();
  }, []);

  async function tagleFinished() {
    await api.delete(`ordersreq/${orderDetals.id}/Finalizado`);

    toast.success('Ordem finalizada com sucesso!');
  }
  async function tagleCanceled() {
    await api.delete(`ordersreq/${orderDetals.id}/Cancelada`);

    toast.success('Ordem cancelada com sucesso!');
  }

  function openUrl() {
    window.location.href = orderDetals.fileRequest.url;
  }

  function handleTableOrders() {
    history.push('/requestsorders');
  }

  function handleResponseRequest() {
    setSituation(!situation);
  }

  const buttonCancel = (
    <Button
      onClick={tagleCanceled}
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
      onClick={tagleFinished}
      // onClick={() => handleClickProfile(order.id)}
      color="success"
      className={classes.buttonLink}
    >
      <MdDone color="#fff" size={30} />
      Atender
    </Button>
  );
  const buttonReturn = (
    <Button
      onClick={handleTableOrders}
      // onClick={() => handleClickProfile(order.id)}
      color="info"
      className={classes.buttonLink}
    >
      <MdArrowBack color="#fff" size={30} />
      Voltar
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
              {buttonReturn}
              {orderDetals.status === 'Finalizado' ||
              orderDetals.status === 'Cancelada' ? (
                ''
              ) : (
                <>
                  {' '}
                  {buttonCancel}
                  {buttonFinished}
                </>
              )}
            </OpButon>
          </Card>
        </GridItem>
      </GridContainer>

      <GridContainer>
        <GridItem xs={12} sm={6} md={5}>
          <Card>
            <FileOrder tag={tagFile}>
              <div>Visualizar Anexo</div>
              <Button
                className={classes.buttonLink}
                onClick={openUrl}
                color="danger"
                aria-haspopup="true"
                justIcon
                round
              >
                <MdAttachFile size={30} color="#fff" />
              </Button>
            </FileOrder>
            <CardIcon color={Decodifiq(orderDetals)}>
              <h4 className={classes.cardTitleTable}>
                Informações da Solicitação
              </h4>
            </CardIcon>
            <CardBody>
              <Table
                tableHeaderColor={Decodifiq(orderDetals)}
                tableHead={['Descrição']}
                tableData={[[`${orderDetals.request}`]]}
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

        {orderDetals.status !== 'Cancelada' ? (
          <>
            <Add>
              <Button
                onClick={handleResponseRequest}
                // onClick={() => handleClickProfile(order.id)}
                color="info"
                aria-label="edit"
                justIcon
                round
                type="button"
              >
                <MdAdd size={30} color="#fff" />
              </Button>
            </Add>
            <Response
              status={orderDetals.status}
              color={Decodifiq(orderDetals)}
              tag={situation}
              id={orderDetals.id}
              user_id={userDetals.id}
              urlFile={orderDetals.fileResponse}
              description={orderDetals.response}
            />
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
