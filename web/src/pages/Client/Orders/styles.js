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
  padding: 40px 120px;
  margin: auto;

  table {
    width: 100%;
    border-collapse: collapse;
    thead th {
      text-align: center;
      padding: 20px;
      color: #333;
      height: 50px;
    }
    tbody {
      td {
        text-align: center;
        background: #fff;
        color: #666;
        padding: 0 30px;
        height: 66px;
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
