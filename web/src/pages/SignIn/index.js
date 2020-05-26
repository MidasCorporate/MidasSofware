import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import { signInRequest } from '~/store/modules/auth/actions';

import book from '../../assets/book.svg';

const schema = Yup.object().shape({
  email: Yup.string().email('E-mail inválido').required('E-mail é obrigatório'),
  password: Yup.string().required('Senha é obrigatória'),
});

export default function SignIn() {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.loading);

  function handleSubmit({ email, password, segment }) {
    dispatch(signInRequest(email, password, segment));
  }

  return (
    <>
      <Form schema={schema} onSubmit={handleSubmit}>
        <img src={book} alt="GoBarber" />

        <Input type="email" name="email" placeholder="E-mail" />
        <Input type="password" name="password" placeholder="Senha" />

        <button type="submit">{loading ? 'Carregando...' : 'Acessar'}</button>
        <Link to="/register">Criar conta</Link>
      </Form>
    </>
  );
}
