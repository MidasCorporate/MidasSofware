import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  max-width: 600px;
  margin: 50px auto;
  position: absolute;

  form {
    display: flex;
    /* width: 360px; */
    /* height: 420px; */
    flex-direction: column;
    /* background: #eee; */
    /* border-radius: 4px; */
    /* align-items: center; */
    margin-top: 30px;
  }
  img {
    width: 86px;
    height: 98px;
    margin-top: 23px;
    margin-bottom: 10px;
  }
  input {
    /* margin-top: 15px; */
    /* width: 300px; */
    height: 44px;
    /* border: 1px solid #eee; */
    border: 0;
    font-weight: bold;
    color: #666;
    border-radius: 4px;
    padding: 0 0 10px;
  }
  span {
    color: #b80404;
    font-weight: bold;
    margin-top: 10px;
    align-self: center;
  }

  hr {
    border: 0;
    height: 1px;
    background: rgba(255, 255, 255, 0.2);
    margin-bottom: 10px;
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
