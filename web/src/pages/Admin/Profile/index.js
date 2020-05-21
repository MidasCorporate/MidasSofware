/* eslint-disable no-nested-ternary */
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';

import { makeStyles } from '@material-ui/core/styles';
import { updateProfileRequest } from '~/store/modules/user/actions';

import GridContainer from '~/components/Grid/GridContainer';
import GridItem from '~/components/Grid/GridItem';
import Card from '~/components/Card/Card';
import CardIcon from '~/components/Card/CardIcon';

import styles from '~/assets/jss/material-dashboard-react/views/dashboardStyle';
import { Container } from './styles';

const useStyles = makeStyles(styles);

export default function Profile() {
  const classes = useStyles();
  const profile = useSelector((state) => state.user.profile);
  const dispatch = useDispatch();

  function handleSubmit(data) {
    dispatch(updateProfileRequest(data));
  }

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardIcon color="danger">
            <h4 className={classes.cardTitleTable}>Atualizar perfil</h4>
            <p className={classes.cardCategoryTable}>
              Última atualização há 2 horas
            </p>
          </CardIcon>

          <Container>
            <Form initialData={profile} onSubmit={handleSubmit}>
              <Input name="name" placeholder="Nome completo" />
              <Input name="email" type="email" placeholder="E-mail" />

              <hr />

              <Input
                type="password"
                name="oldPassword"
                placeholder="Senha atual"
              />
              <Input type="password" name="password" placeholder="Nova senha" />
              <Input
                type="password"
                name="confirmPassword"
                placeholder="Confirmação de senha"
              />

              <button type="submit">Atualizar perfil</button>
            </Form>
          </Container>
        </Card>
      </GridItem>
    </GridContainer>
  );
}

// import React from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { Form, Input } from '@rocketseat/unform';

// import { updateProfileRequest } from '~/store/modules/user/actions';

// import { Container } from './styles';

// function Profile() {
// const profile = useSelector((state) => state.user.profile);
// const dispatch = useDispatch();

// function handleSubmit(data) {
//   dispatch(updateProfileRequest(data));
// }

//   return (
// <Container>
//   <Form initialData={profile} onSubmit={handleSubmit}>
//     <Input name="name" placeholder="Nome completo" />
//     <Input name="email" type="email" placeholder="E-mail" />

//     <hr />

//     <Input type="password" name="oldPassword" placeholder="Senha atual" />
//     <Input type="password" name="password" placeholder="Nova senha" />
//     <Input
//       type="password"
//       name="confirmPassword"
//       placeholder="Confirmação de senha"
//     />

//     <button type="submit">Atualizar perfil</button>
//   </Form>
// </Container>
//   );
// }

// export default Profile;
