import styled from 'styled-components';

export const Container = styled.div`
  div {
    display: ${(props) => (props.tag ? 'block' : 'none')};
    position: absolute;
    margin-top: -15px;
    margin-left: 10px;
  }

  /* align-self: center;
  text-align: center; */
  /* width: 120px;
  height: 120px; */
  /* margin: 0 0 30px 0;
  border: 1px dashed #dddddd;
  border-radius: 50%; */

  label {
    cursor: pointer;

    /* &:hover {
      opacity: 0.7;
    } */

    /* img {
      width: 140px;
      height: 140px;
      border-radius: 50%;
      background: #eee;
    } */

    /* svg {
      margin-top: -13px;
    } */

    /* strong {
      display: flex;
      color: #e63a36;
      justify-content: center;
      text-align: center;

      &:hover {
        opacity: 0.7;
      }
    }
  } */
  }
  input {
    display: none;
  }
`;
