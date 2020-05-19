import React from 'react';
import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import book from '../../assets/book.svg';

const schema = Yup.object().shape({
  name: Yup.string().required('Nome é obrigatório'),
  email: Yup.string().email('E-mail inválido').required('E-mail é obrigatório'),
  password: Yup.string()
    .min(6, 'No mínimo 6 caracteres')
    .required('Senha é obrigatória'),
});

export default function SignUp() {
  function handleSubmit() {}

  return (
    <>
      <Form schema={schema} onSubmit={handleSubmit}>
        <img src={book} alt="GoBarber" />

        <Input name="name" placeholder="Nome completo" />
        <Input type="email" name="email" placeholder="E-mail" />
        <Input type="password" name="password" placeholder="Senha" />

        <button type="submit">Acessar</button>
        <Link to="/">Já tenho cadastro</Link>
      </Form>
    </>
  );
}
