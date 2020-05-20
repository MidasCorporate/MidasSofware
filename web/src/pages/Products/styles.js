import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin: auto;

  form {
    display: flex;
    flex-direction: column;
    max-width: 800px;
    margin: 10px auto;
    background: #fff;
    padding: 20px;
    border-radius: 4px;

    input {
      width: 95%;
      margin: 10px 0;
      border: 1px solid hsl(0, 0%, 80%);
      height: 38px;
      border-radius: 4px;
      color: #808080;
      font-weight: bold;
      padding-left: 10px;
    }
  }
`;
