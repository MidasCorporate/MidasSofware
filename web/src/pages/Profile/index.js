import React from 'react';
import { Form, Input } from '@rocketseat/unform';

import { Container } from './styles';

function Profile() {
  return (
    <Container>
      <Form>
        <Input name="name" placeholder="Nome completo" />
        <Input name="email" type="email" placeholder="E-mail" />

        <hr />

        <Input type="password" name="oldPassword" placeholder="Senha atual" />
        <Input type="password" name="password" placeholder="Nova senha" />
        <Input
          type="password"
          name="confirmPassword"
          placeholder="Confirmação de senha"
        />

        <button type="submit">Atualizar perfil</button>
      </Form>
    </Container>
  );
}

export default Profile;
