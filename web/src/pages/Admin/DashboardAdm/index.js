import React, { useState, useEffect, useMemo } from 'react';
// import ChartistGraph from 'react-chartist';

import { makeStyles } from '@material-ui/core/styles';

import { Link } from 'react-router-dom';

import {
  MdWeb,
  MdArrowBack,
  MdStore,
  MdAttachMoney,
  MdHistory,
  MdSupervisorAccount,
} from 'react-icons/md';

import GridContainer from '~/components/Grid/GridContainer';
import GridItem from '~/components/Grid/GridItem';
import Card from '~/components/Card/Card';
import CardHeader from '~/components/Card/CardHeader';
import CardIcon from '~/components/Card/CardIcon';
import CardFooter from '~/components/Card/CardFooter';
import CardBody from '~/components/Card/CardBody';
import Table from '~/components/Table/Table';

// import {
//   dailySalesChart,
// emailsSubscriptionChart,
// completedTasksChart
// } from '~/variables/charts';

import styles from '~/assets/jss/material-dashboard-react/views/dashboardStyle';

import api from '~/services/api';

const useStyles = makeStyles(styles);

export default function Dashboard() {
  const classes = useStyles();
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [stock, setStock] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function loadOrders() {
      const response = await api.get('orders');
      const { data } = response;
      setOrders(data);
    }
    async function loadProducts() {
      const response = await api.get('products');
      const { data } = response;
      setProducts(data);
    }
    async function loadStock() {
      const response = await api.get('stock');
      const { data } = response;
      setStock(data);
    }
    async function loadUsers() {
      const response = await api.get('users');
      const data = response.data.filter((user) => user.admin === true);
      setUsers(data);
    }
    loadOrders();
    loadProducts();
    loadStock();
    loadUsers();
  }, []);

  // QUANTIDADE ORDES PENDENTES
  const hasStatusNull = useMemo(
    () => orders.filter((order) => order.status === 'Preparando').length,
    [orders]
  );

  // QUANTIDADE VENDIDO NA PLATAFORMA
  const valueSold = useMemo(
    () =>
      orders
        .filter((order) => order.status === 'Finalizada')
        .reduce((total, value) => total + value.products.price, 0)
        .toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
    [orders]
  );

  // QUANTIDADE ORDES FINALIZADAS
  const hasStatusFinished = useMemo(
    () => orders.filter((order) => order.status === 'Finalizada').length,
    [orders]
  );

  // QUANTIDADE DE PRODUTOS
  const amountStock = useMemo(
    () => stock.reduce((total, deposit) => total + deposit.amount, 0),
    [stock]
  );

  // QUANTIDADE PRODUTOS INATIVOS
  const amountProduct = useMemo(
    () => products.filter((product) => product.active === false).length,
    [products]
  );

  // GERA TABELA COM INFO DE VENDAS REALIZADAS
  const latestSales = useMemo(
    () =>
      orders
        .filter((order) => order.status === 'Finalizada')
        .map((order) => {
          const value = order.products.price.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          });
          return [order.user.id, order.user.name, value, order.products.name];
        }),
    [orders]
  );

  // GERA TABELA COM MEBROS DA EQUIPE
  const workers = useMemo(
    () =>
      users.map((user) => {
        return [user.id, user.name, user.email, 'Administrador'];
      }),
    [users]
  );

  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="danger">
              <CardIcon color="danger">
                <MdAttachMoney size={45} color="#fff" />
              </CardIcon>
              <p className={classes.cardCategoryMoney}>
                Todas as vendas realizadas dentro da plataforma
              </p>
              <h1 className={classes.cardTitleMoney}>{valueSold}</h1>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <MdHistory color="#999" size={30} />
                <span>Atualizações conforme vendas</span>
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="danger">
              <CardIcon color="danger">
                <MdWeb size={45} color="#fff" />
              </CardIcon>
              <p className={classes.cardCategory}>Pedidos pendentes</p>
              <h2 className={classes.cardTitle}>{hasStatusNull}</h2>
              <p className={classes.cardCategory}>Pedidos finalizados</p>
              <h2 className={classes.cardTitle}>{hasStatusFinished}</h2>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <MdArrowBack color="#999" size={20} />
                <Link className={classes.cardLink} to="/orders">
                  Acessar minhas orders
                </Link>
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="danger">
              <CardIcon color="danger">
                <MdStore size={45} color="#fff" />
              </CardIcon>
              <p className={classes.cardCategory}>Produtos Estoque</p>
              <h2 className={classes.cardTitle}>{amountStock}</h2>
              <p className={classes.cardCategory}>Produtos Inativos</p>
              <h2 className={classes.cardTitle}>{amountProduct}</h2>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <MdArrowBack color="#999" size={20} />
                <Link className={classes.cardLink} to="/products">
                  Acessar meus produtos
                </Link>
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="danger">
              <CardIcon color="danger">
                <MdSupervisorAccount size={45} color="#fff" />
              </CardIcon>
              <p className={classes.cardCategoryMoney}>
                Usuários cadastrados na plataforma
                <h1 className={classes.cardTitleUser}>{hasStatusNull}</h1>
              </p>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <MdHistory color="#999" size={30} />
                <span>Atualizações conforme cadastro</span>
              </div>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
      <GridContainer>
        <GridItem xs={12} sm={12} md={6}>
          <Card>
            <CardIcon color="danger">
              <h4 className={classes.cardTitleWhite}>Ultimas Vendas</h4>
              <p className={classes.cardCategoryWhite}>
                Ultima venda realizada há 2 horas
              </p>
            </CardIcon>
            <CardBody>
              <Table
                tableHeaderColor="danger"
                tableHead={['ID', 'Nome', 'Valor', 'Produto']}
                tableData={latestSales}
              />
            </CardBody>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={6}>
          <Card>
            <CardIcon color="danger">
              <h4 className={classes.cardTitleWhite}>Membros da Equipe</h4>
              <p className={classes.cardCategoryWhite}>
                Ultimo cadastro há 2 horas
              </p>
            </CardIcon>
            <CardBody>
              <Table
                tableHeaderColor="danger"
                tableHead={['ID', 'Nome', 'Email', 'Ordenação']}
                tableData={workers}
              />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
