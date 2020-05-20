import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  /* display: flex; */
  width: 100%;
  max-width: 600px;
  margin: 10px auto 60px;

  form {
    display: flex;
    flex-direction: column;
    margin-top: 30px;

    input {
      background: rgba(0, 0, 0, 0.1);
      border: 0;
      border-radius: 4px;
      height: 44px;
      padding: 0 15px;
      color: #cb2304;
      margin: 0 0 10px;
      font-weight: bold;

      &::placeholder {
        color: #cb2304;
        /* color: rgba(255, 255, 255, 0.7); */
      }
    }

    span {
      color: #cb2304;
      align-self: flex-start;
      margin: 0 0 10px;
      font-weight: bold;
    }

    hr {
      border: 0;
      height: 1px;
      background: rgba(255, 255, 255, 0.2);
      margin: 10px 0 20px;
    }

    button {
      margin: 15px 0 0;
      height: 44px;
      background: #cb2304;
      font-weight: bold;
      color: #eee;
      border: 0;
      border-radius: 4px;
      font-size: 16px;
      transition: background 0.5s;

      &:hover {
        background: ${darken(0.1, '#cb2304')};
      }
    }
  }
`;
