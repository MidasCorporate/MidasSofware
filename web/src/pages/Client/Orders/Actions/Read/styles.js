import styled from 'styled-components';

export const ModalContainer = styled.div``;

export const Info = styled.div`
  /* border-bottom: 1px solid #eee; */
  margin: 10px 0px;
  padding-bottom: 10px;

  div {
    display: flex;
    justify-content: center;
    /* text-align: center; */
    strong {
      color: #ef4336;
      margin-bottom: 10px;
      font-size: 16px;
    }
  }

  span {
    display: flex;
    margin-top: 5px;
    strong {
      margin-right: 10px;
      color: #666;
    }
    p {
      color: #999;
    }
  }
`;

export const Budget = styled.div`
  margin: 10px 0px;
  div {
    display: flex;
    justify-content: center;
    strong {
      color: #333;
      margin-bottom: 10px;
    }
  }

  p {
    color: #666;
    margin-bottom: 5px;
  }

  span {
    strong {
      color: #666;
      margin-right: 5px;
    }
    a {
      color: #999;
      transition: color 0.6s;

      &:hover {
        color: #ef4336;
      }
    }
  }
`;

export const Responses = styled.div`
  .div-res {
    display: flex;
    justify-content: center;
    strong {
      color: #333;
      margin: 10px 0;
    }
  }
`;

export const Content = styled.div`
  border-bottom: 1px solid #eee;
  padding-bottom: 10px;
  margin: 10px 0px;

  span {
    p {
      color: #666;
      margin-bottom: 5px;
    }
    strong {
      color: #666;
      margin-right: 5px;
    }
    a {
      color: #999;
      transition: color 0.6s;

      &:hover {
        color: #ef4336;
      }
    }
  }

  div {
    display: flex;

    strong {
      color: #666;
      margin-right: 5px;
    }

    p {
      color: #999;
    }
  }
`;
