import styled from 'styled-components';

export const Create = styled.div`
  display: flex;
  margin: 20px auto;
  /* text-align: center; */

  button {
    margin: 0 5px;
  }

  strong {
    color: #fff;
    margin-left: 4px;
  }
`;

export const Container = styled.div`
  padding: 30px 100px;
  margin: auto;

  table {
    width: 100%;
    border-collapse: collapse;
    thead th {
      text-align: center;
      padding: 20px;
      color: #333;
      height: 50px;
      border-bottom: 1px solid #ef4336;
    }
    tbody {
      td {
        text-align: center;
        background: #fff;
        color: #666;
        padding: 0 30px;
        height: 66px;
        border-bottom: 1px solid #eee;
        img {
          height: 30px;
          width: 30px;
          border-radius: 15px;
          margin-right: 10px;
        }
        span {
          display: flex;
          align-items: center;
          justify-content: center;
          button {
            border: 0;
            background: none;
          }
        }
      }
    }
  }
`;

export const Tr = styled.tr`
  > td {
    .div-status {
      padding: none;
      > span {
        text-align: center;
        background: ${(props) =>
          props.status === 'Finalizado' ? '#c5fcb3' : ''};
        background: ${(props) =>
          props.status === 'Preparando' ? '#6baaff' : ''};
        background: ${(props) =>
          props.status === 'Aguardando' ? '#fcf6b3' : ''};
        background: ${(props) =>
          props.status === 'Cancelada' ? '#fcb3b3' : ''};
        color: ${(props) => (props.status === 'Finalizado' ? '#409800' : '')};
        color: ${(props) => (props.status === 'Preparando' ? '#0045a0' : '')};
        color: ${(props) => (props.status === 'Aguardando' ? '#c4c000' : '')};
        color: ${(props) => (props.status === 'Cancelada' ? '#fc5757' : '')};
        border-radius: 32px;
        max-width: 200px;
        font-weight: 700;
        padding: 0 7px;
      }

      > svg {
        color: ${(props) => (props.status === 'Finalizado' ? '#409800' : '')};
        color: ${(props) => (props.status === 'Preparando' ? '#0045a0' : '')};
        color: ${(props) => (props.status === 'Aguardando' ? '#c4c000' : '')};
        color: ${(props) => (props.status === 'Cancelada' ? '#fc5757' : '')};
      }
    }
  }
`;
