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
    border-radius: 4px;

    input {
      border: 1px solid hsl(0, 0%, 80%);
      border-radius: 4px;
      height: 44px;
      padding: 0 15px;
      color: #666666;
      margin: 0 0 10px;
      font-weight: bold;

      &::placeholder {
        color: #666666;
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
  }
`;

export const Actions = styled.div`
  /* display: flex;
  width: 222px;
  height: 30px;
  float: right; */
  margin: 10px 0;
  svg {
    margin-right: 5px;
  }

  button {
    margin-left: 10px;
  }
`;

export const ButtonComeBack = styled.button`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  background: #cccccc;
  color: #fff;
  font-weight: bold;
  border: none;
  margin-right: 5px;
  border-radius: 4px;
  transition: background 0.9s;
  &:hover {
    background: #e63a36;
  }
`;

export const ButtonDone = styled.button`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  background: #e63a36;
  color: #fff;
  font-weight: bold;
  border: none;
  margin-right: 5px;
  border-radius: 4px;
  svg {
    margin-right: 5px;
  }

  &:hover {
    background: ${darken(0.2, '#e63a36')};
  }
`;
