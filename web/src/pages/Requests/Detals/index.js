import React, { useEffect } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

import { MdArrowBack } from 'react-icons/md';

import GridContainer from '~/components/Grid/GridContainer';
import GridItem from '~/components/Grid/GridItem';
import Card from '~/components/Card/Card';
import CardIcon from '~/components/Card/CardIcon';
import CardBody from '~/components/Card/CardBody';
import Table from '~/components/Table/Table';

import Button from '~/components/CustomButtons/Button';

import { OpButon } from './styles';
import styles from '~/assets/jss/material-dashboard-react/views/dashboardStyle';

import history from '~/services/history';

const useStyles = makeStyles(styles);

export default function Request(props) {
  const classes = useStyles();

  // useEffect(() => {
  //   async function
  //   const { match } = props;
  //   const orderId = decodeURIComponent(match.params.id);

  // })

  function handleTableOrders() {
    history.push('/requestsorders');
  }

  return (
    <>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardIcon color="warning">
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
            </OpButon>
          </Card>
        </GridItem>
      </GridContainer>

      <GridContainer>
        <GridItem xs={12} sm={6} md={5}>
          <Card>
            <CardIcon color="warning">
              <h4 className={classes.cardTitleTable}>Produto</h4>
            </CardIcon>
            <CardBody>
              <Table
                tableHeaderColor="warning"
                tableHead={[
                  'ID',
                  'Nome',
                  'Valor',
                  'Categoria',
                  'Cadastro',
                  'Descrição',
                ]}
                tableData={[
                  [
                    '1',
                    'Dakota Rice',
                    '$36,738',
                    'Niger',
                    'hdgveded',
                    'qrweyfvbyelrfbvadcnejjsdkanckjdsnkjancdjkncjksdn',
                  ],
                  [
                    '1',
                    'Dakota Rice',
                    '$36,738',
                    'Niger',
                    'hdgveded',
                    'qrweyfvbyelrfbvadcnejjsdkanckjdsnkjancdjkncjksdn',
                  ],
                ]}
              />
            </CardBody>
          </Card>
        </GridItem>

        <GridItem xs={12} sm={6} md={5}>
          <Card>
            <CardIcon color="warning">
              <h4 className={classes.cardTitleTable}>Transacionador</h4>
            </CardIcon>
            <CardBody>
              <Table
                tableHeaderColor="warning"
                tableHead={['ID', 'Nome', 'Email', 'Cadastro']}
                tableData={[
                  ['1', 'Dakota Rice', 'teste@teste.com', '27/05/2020'],
                ]}
              />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
      <GridContainer>
        <GridItem xs={12} sm={6} md={5}>
          <Card>
            <CardIcon color="warning">
              <h4 className={classes.cardTitleTable}>
                Informações da Solicitação
              </h4>
            </CardIcon>
            <CardBody>
              <Table
                tableHeaderColor="warning"
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
