import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 600px;
  margin: 0 auto 60px;

  form {
    display: flex;
    flex-direction: column;
    width: 100%;
    margin: 0 auto;
    /* padding: 20px; */
    border-radius: 4px;

    input {
      /* background: rgba(0, 0, 0, 0.1); */
      /* background: rgba(0, 0, 0, 0.1); */
      border: 1px solid hsl(0, 0%, 80%);
      /* border: 0; */
      border-radius: 4px;
      height: 44px;
      padding: 0 15px;
      color: #666666;
      margin: 0 0 10px;
      font-weight: bold;

      &::placeholder {
        color: #666666;
        /* color: rgba(255, 255, 255, 0.7); */
      }
    }

    .form-div-1 {
      display: flex;
      justify-content: space-between;
      width: 100%;

      > input {
        width: 50%;
        margin: 0 2px;
      }
    }

    button {
      margin: 15px 0 0;
      height: 44px;
      background: #ee524e;
      font-weight: bold;
      color: #fff;
      border: 0;
      border-radius: 4px;
      font-size: 16px;
      transition: background 0.5s;

      &:hover {
        background: ${darken(0.2, '#ee524e')};
      }
    }
  }
`;
