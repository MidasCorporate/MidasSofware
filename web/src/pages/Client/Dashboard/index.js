/* eslint-disable func-names */
import React, { useState, useEffect } from 'react';
import { Grid, Placeholder, Segment } from 'semantic-ui-react';

import { makeStyles } from '@material-ui/core/styles';

import {
  GiDigDug,
  GiOverdose,
  GiOpenBook,
  GiBleedingEye,
  GiNoseSide,
  GiGriffinSymbol,
  GiInfo,
} from 'react-icons/gi';

import GridContainer from '~/components/Grid/GridContainer';
import GridItem from '~/components/Grid/GridItem';
import Card from '~/components/Card/Card';
import CardSearch from '~/components/Card/CardSearch';
import CardHeader from '~/components/Card/CardHeader';
import CardIcon from '~/components/Card/CardIcon';
import CardFooter from '~/components/Card/CardFooter';

import CustomInput from '~/components/CustomInput/CustomInput';

import { ButtonSelectSegment, Constainer } from './styles';
import styles from '~/assets/jss/material-dashboard-react/views/dashboardStyle';

import api from '~/services/api';
import history from '~/services/history';

const useStyles = makeStyles(styles);

export default function Dashboard() {
  const classes = useStyles();
  const [sgm, setSgm] = useState([]);
  const [filterSeg, setFilter] = useState([]);
  const [temp, setTemp] = useState(true);
  const [segmentsFile, setSegmentFile] = useState([]);

  useEffect(() => {
    async function loadCardSegments() {
      const response = await api.get('segments');
      const { data } = response;

      setFilter(data);
      setSegmentFile(data);
    }
    loadCardSegments();
  }, []);

  function handleChange(e) {
    const filterFinish = segmentsFile.filter(function (category) {
      return (
        category.segment.toLowerCase().indexOf(e.target.value.toLowerCase()) >
        -1
      );
    });

    setFilter(filterFinish);
  }

  function handleSelectSegment(segment) {
    const { id, name } = segment;
    history.push({
      pathname: '/ordercreate',
      state: { id, name },
    });
  }

  // eslint-disable-next-line no-use-before-define
  setTimeout(setPLaceholder, 3000);

  function setPLaceholder() {
    setTemp(false);
  }
  const placehold = [4];
  const placeholderExampleGrid = (
    <Card test>
      {placehold.map((place) => (
        <Grid columns={4} stackable>
          <Grid.Column>
            <Segment raised>
              <Placeholder>
                <Placeholder.Header image style={{ height: 45 }}>
                  <Placeholder.Line />
                  <Placeholder.Line />
                  <Placeholder.Line />
                </Placeholder.Header>
                <Placeholder.Paragraph>
                  <Placeholder.Line length="medium" />
                  <Placeholder.Line length="short" />
                </Placeholder.Paragraph>
              </Placeholder>
            </Segment>
          </Grid.Column>

          <Grid.Column>
            <Segment raised>
              <Placeholder>
                <Placeholder.Header image style={{ height: 45 }}>
                  <Placeholder.Line />
                  <Placeholder.Line />
                  <Placeholder.Line />
                </Placeholder.Header>
                <Placeholder.Paragraph>
                  <Placeholder.Line length="medium" />
                  <Placeholder.Line length="short" />
                </Placeholder.Paragraph>
              </Placeholder>
            </Segment>
          </Grid.Column>
          <Grid.Column>
            <Segment raised>
              <Placeholder>
                <Placeholder.Header image style={{ height: 45 }}>
                  <Placeholder.Line />
                  <Placeholder.Line />
                  <Placeholder.Line />
                </Placeholder.Header>
                <Placeholder.Paragraph>
                  <Placeholder.Line length="medium" />
                  <Placeholder.Line length="short" />
                </Placeholder.Paragraph>
              </Placeholder>
            </Segment>
          </Grid.Column>
          <Grid.Column>
            <Segment raised>
              <Placeholder>
                <Placeholder.Header image style={{ height: 45 }}>
                  <Placeholder.Line />
                  <Placeholder.Line />
                  <Placeholder.Line />
                </Placeholder.Header>
                <Placeholder.Paragraph>
                  <Placeholder.Line length="medium" />
                  <Placeholder.Line length="short" />
                </Placeholder.Paragraph>
              </Placeholder>
            </Segment>
          </Grid.Column>
        </Grid>
      ))}
    </Card>
  );

  useEffect(() => {
    const mat = 'Materiais para construção';
    const farm = 'Farmácias';
    const liv = 'Livrarias';
    const oti = 'Óticas';
    const red = 'Rede Alimenticias';
    const cli = 'Clinicas';
    const mec = 'Mecanicas';
    const segmentos = [
      {
        id: 1,
        name: mat,
        img: <GiDigDug color="#fff" size={45} />,
        description:
          'Empresas relacionadas a materiais de construção, como casa de tintas.',
      },
      {
        id: 2,
        name: farm,
        img: <GiOverdose color="#fff" size={45} />,
        description: 'Drogarias, Farmacias naturais e empresas de cósmeticos',
      },
      {
        id: 3,
        name: liv,
        img: <GiOpenBook color="#fff" size={45} />,
        description: 'Livrarias, bancas de jornais e papelarias',
      },
      {
        id: 4,
        name: oti,
        img: <GiBleedingEye color="#fff" size={45} />,
        description: 'Empresas especializadas em visão, como oticas e clinicas',
      },
      {
        id: 5,
        name: red,
        img: <GiNoseSide color="#fff" size={45} />,
        description: 'Todas os restaurantes e lojas de bebidas e alimento',
      },
      {
        id: 6,
        name: cli,
        img: <GiOpenBook color="#fff" size={45} />,
        description: 'Livrarias, bancas de jornais e papelarias',
      },
      {
        id: 7,
        name: mec,
        img: <GiBleedingEye color="#fff" size={45} />,
        description: 'Empresas especializadas em visão, como oticas e clinicas',
      },
      {
        id: 8,
        name: red,
        img: <GiNoseSide color="#fff" size={45} />,
        description: 'Todas os restaurantes e lojas de bebidas e alimento',
      },
      {
        id: 10,
        name: mat,
        img: <GiDigDug color="#fff" size={45} />,
        description:
          'Empresas relacionadas a materiais de construção, como casa de tintas.',
      },
      {
        id: 11,
        name: farm,
        img: <GiOverdose color="#fff" size={45} />,
        description: 'Drogarias, Farmacias naturais e empresas de cósmeticos',
      },
      {
        id: 12,
        name: liv,
        img: <GiOpenBook color="#fff" size={45} />,
        description: 'Livrarias, bancas de jornais e papelarias',
      },
      {
        id: 13,
        name: oti,
        img: <GiBleedingEye color="#fff" size={45} />,
        description: 'Empresas especializadas em visão, como oticas e clinicas',
      },
      {
        id: 19,
        name: red,
        img: <GiNoseSide color="#fff" size={45} />,
        description: 'Todas os restaurantes e lojas de bebidas e alimento',
      },
      {
        id: 14,
        name: liv,
        img: <GiOpenBook color="#fff" size={45} />,
        description: 'Livrarias, bancas de jornais e papelarias',
      },
      {
        id: 15,
        name: oti,
        img: <GiBleedingEye color="#fff" size={45} />,
        description: 'Empresas especializadas em visão, como oticas e clinicas',
      },
      {
        id: 16,
        name: red,
        img: <GiNoseSide color="#fff" size={45} />,
        description: 'Todas os restaurantes e lojas de bebidas e alimento',
      },
    ];

    setSgm(segmentos);
  }, []);
  return (
    <Constainer>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <CardHeader color="danger">
            <p className={classes.cardCategoryTitleHome}>Somos a praticidade</p>
          </CardHeader>
          <CardSearch>
            <CustomInput
              type="input"
              formControlProps={{
                className: `${classes.margin} ${classes.search}`,
              }}
              onChange={handleChange}
              success={filterSeg.length !== 0}
              error={filterSeg.length === 0}
              inputProps={{
                placeholder: 'Procure pelos segmentos de sua cidade',
                inputProps: {
                  'aria-label': 'Search',
                },
              }}
            />
          </CardSearch>
        </GridItem>
      </GridContainer>
      {temp ? (
        <>
          <GridContainer>{placeholderExampleGrid}</GridContainer>
        </>
      ) : (
        <>
          {filterSeg.length !== 0 ? (
            <>
              <GridContainer>
                {filterSeg.map((segment) => (
                  <GridItem key={segment.id} xs={12} sm={6} md={3}>
                    <Card>
                      <ButtonSelectSegment
                        onClick={() => handleSelectSegment(segment)}
                      >
                        <CardHeader color="danger">
                          <CardIcon color="danger">
                            <img src={segment.img} alt="book" />
                          </CardIcon>
                          <p className={classes.cardTitle}>{segment.segment}</p>
                          <p className={classes.cardCategoryMoney}>
                            {segment.description}
                          </p>
                        </CardHeader>
                      </ButtonSelectSegment>
                      <CardFooter stats>
                        <div className={classes.stats}>
                          <GiInfo color="#999" size={30} />
                          <span>Atualizações conforme cadastro</span>
                        </div>
                      </CardFooter>
                    </Card>
                  </GridItem>
                ))}
              </GridContainer>
            </>
          ) : (
            <GridContainer>
              <GridItem xs={12} sm={12} md={12}>
                <CardHeader color="danger">
                  <p className={classes.cardCategoryTitleHomeError}>
                    Segmento não encontrado
                  </p>
                  <p className={classes.cardCategoryTitleHome}>
                    <GiGriffinSymbol size={50} />
                  </p>
                </CardHeader>
              </GridItem>
            </GridContainer>
          )}
        </>
      )}
    </Constainer>
  );
}
