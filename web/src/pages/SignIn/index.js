import React from 'react';
// import { Link } from 'react-router-dom';

import book from '../../assets/book.svg';

// import { Container } from './styles';

export default function SignIn() {
  return (
    <>
      <form>
        <img src={book} alt="GoBarber" />

        <input type="email" name="" placeholder="E-mail" />
        <input type="password" name="" placeholder="Senha" />

        <button type="submit">Acessar</button>
      </form>
    </>
  );
}
