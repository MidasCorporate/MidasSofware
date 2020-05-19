import styled from 'styled-components';
import { darken } from 'polished';

export const Wrapper = styled.div`
  height: 100%;
  background: #b80404;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Content = styled.div`
  width: 100%;
  max-width: 315px;
  text-align: center;
  form {
    display: flex;
    width: 360px;
    height: 400px;
    flex-direction: column;
    background: #fff;
    border-radius: 4px;
    align-items: center;
  }
  img {
    width: 86px;
    height: 98px;
    margin-top: 30px;
    margin-bottom: 20px;
  }
  input {
    margin-top: 15px;
    width: 300px;
    height: 40px;
    border: 1px solid #eee;
    font-weight: bold;
    color: #666;
    border-radius: 4px;
    padding: 4px;
  }
  span {
    color: #b80404;
    font-weight: bold;
    margin-top: 10px;
    align-self: center;
  }
  button {
    margin-top: 30px;
    background: #b80404;
    border: none;
    width: 300px;
    height: 40px;
    color: #fff;
    border-radius: 4px;
    font-weight: bold;
    transition: background 0.6s;
    &:hover {
      background: ${darken(0.1, '#b80404')};
    }
  }
`;
