import styled from 'styled-components';

export const Theade = styled.thead`
  color: #ec5244;
  /* color: #4ebfd3; */
  font-weight: 100;
  font-size: 16px;
  font-family: "'Roboto', 'Arial', 'sans-serif'";
  text-align: initial;
  th {
    padding-top: 50px;
    font-weight: 100;
  }
`;
export const Tbody = styled.tbody`
  font-size: 15px;
  font-family: "'Roboto', 'Arial', 'sans-serif'";
  text-align: center;
  td {
    border-bottom: 1px solid #eee;
    padding: 5px;

    button {
      font-size: 15px;

      img {
        width: 15px;
        display: block;
      }
    }
  }
`;

export const Tr = styled.tr`
  td {
    > div {
      padding: none;
      span {
        text-align: center;
        background: ${(props) =>
          props.status === 'Finalizada' ? '#c5fcb3' : ''};
        background: ${(props) =>
          props.status === 'Preparando' ? '#fcf6b3' : ''};
        background: ${(props) =>
          props.status === 'Cancelada' ? '#fcb3b3' : ''};
        color: ${(props) => (props.status === 'Finalizada' ? '#409800' : '')};
        color: ${(props) => (props.status === 'Preparando' ? '#c4c000' : '')};
        color: ${(props) => (props.status === 'Cancelada' ? '#fc5757' : '')};
        border-radius: 32px;
        max-width: 200px;
        font-weight: 800;
        padding: 0 7px;
      }

      svg {
        color: ${(props) => (props.status === 'Finalizada' ? '#409800' : '')};
        color: ${(props) => (props.status === 'Preparando' ? '#c4c000' : '')};
        color: ${(props) => (props.status === 'Cancelada' ? '#fc5757' : '')};
      }
    }
  }
  /* :hover {
    background: #eee;
  } */
`;

export const OpButon = styled.div`
  margin-top: 10px;
  margin-right: 12px;
`;
