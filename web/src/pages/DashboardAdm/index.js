import React, { useState, useEffect, useMemo } from 'react';
import ChartistGraph from 'react-chartist';

import { makeStyles } from '@material-ui/core/styles';

import {
  MdWeb,
  MdArrowBack,
  MdShop,
  MdAttachMoney,
  MdHistory,
} from 'react-icons/md';

import GridContainer from '~/components/Grid/GridContainer';
import GridItem from '~/components/Grid/GridItem';
import Card from '~/components/Card/Card';
import CardHeader from '~/components/Card/CardHeader';
import CardIcon from '~/components/Card/CardIcon';
import CardFooter from '~/components/Card/CardFooter';
import CardBody from '~/components/Card/CardBody';

import {
  dailySalesChart,
  // emailsSubscriptionChart,
  // completedTasksChart
} from '~/variables/charts';

import styles from '~/assets/jss/material-dashboard-react/views/dashboardStyle';

import api from '~/services/api';

const useStyles = makeStyles(styles);

export default function Dashboard() {
  const classes = useStyles();
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [stock, setStock] = useState([]);

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
    loadOrders();
    loadProducts();
    loadStock();
  }, []);

  // QUANTIDADE ORDES PENDENTES
  const hasStatusNull = useMemo(
    () => orders.filter((order) => order.status === null).length
  );

  // QUANTIDADE ORDES FINALIZADAS
  const hasStatusFinished = useMemo(
    () => orders.filter((order) => order.status === 'finished').length
  );

  // QUANTIDADE DE PRODUTOS
  const amountStock = useMemo(() =>
    stock.reduce((total, deposit) => total + deposit.amount, 0)
  );

  // QUANTIDADE PRODUTOS INATIVOS
  const amountProduct = useMemo(
    () => products.filter((product) => product.active === false).length
  );

  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="info">
              <CardIcon color="info">
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
                <a href="#pablo" onClick={(e) => e.preventDefault()}>
                  Acessar minhas orders
                </a>
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="info">
              <CardIcon color="info">
                <MdShop size={45} color="#fff" />
              </CardIcon>
              <p className={classes.cardCategory}>Itens cadastrados</p>
              <h2 className={classes.cardTitle}>{amountStock}</h2>
              <p className={classes.cardCategory}>Itens Inativos</p>
              <h2 className={classes.cardTitle}>{amountProduct}</h2>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <MdArrowBack color="#999" size={20} />
                <a href="#pablo" onClick={(e) => e.preventDefault()}>
                  Acessar meus produtos
                </a>
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="info">
              <CardIcon color="info">
                <MdAttachMoney size={45} color="#fff" />
              </CardIcon>
              <p className={classes.cardCategory}>Estoque Atual</p>
              <h3 className={classes.cardTitle}>{amountStock}</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <MdHistory color="#999" size={30} />
                <span>Acessar meus produtos</span>
              </div>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
      <GridContainer>
        <GridItem xs={12} sm={12} md={4}>
          <Card chart>
            <CardHeader color="success">
              <ChartistGraph
                className="ct-chart"
                data={dailySalesChart.data}
                type="Line"
                options={dailySalesChart.options}
                listener={dailySalesChart.animation}
              />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>Daily Sales</h4>
              <p className={classes.cardCategory}>
                <span className={classes.successText}>
                  {/* <ArrowUpward className={classes.upArrowCardCategory} /> 55% */}
                </span>{' '}
                increase in today sales.
              </p>
            </CardBody>
            <CardFooter chart>
              <div className={classes.stats}>
                {/* <AccessTime /> updated 4 minutes ago */}
              </div>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
