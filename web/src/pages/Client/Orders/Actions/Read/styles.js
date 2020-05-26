import styled from 'styled-components';

export const ModalContainer = styled.div`
  div {
    border-bottom: 1px solid #eee;
    margin: 10px 0px;
    padding-bottom: 10px;
    strong {
      display: flex;
      margin: 10px 0;
      color: #333;
    }
    > p {
      margin-bottom: 10px;
      color: #595959;
    }
    span {
      display: flex;
      align-items: center;
      /* justify-content: center; */
      text-align: center;
      strong {
        margin-right: 10px;
      }
      p {
        color: #595959;
      }
    }
  }
  strong {
    display: flex;
    margin: 5px 0;
    color: #333;
  }
  img {
    width: 250px;
    height: 39px;
    margin-top: 10px;
  }
`;
