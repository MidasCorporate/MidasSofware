import styled from 'styled-components';

export const HeaderOption = styled.div`
  width: 100%;
  textarea {
    width: 100%;
    border-radius: 4px;
    /* margin-top: -40px; */
    height: 200px;
  }
`;

export const Text = styled.div`
  display: flex;
  flex-direction: row;
  float: left;
  /* svg {
    cursor: pointer;
    margin-left: 30px;
    :hover {
      background: #eee;
    }
  } */
`;
export const OpButon = styled.div`
  /* margin-top: 10px; */
  margin-right: 12px;

  button {
    margin-left: 10px;
  }
`;
export const FileOrder = styled.div`
  /* display: ${(props) => (props.tag ? 'block' : 'none')}; */
  display: block;
  position: absolute;
  margin-left: 129px;
  margin-top: -51px;
  div {
    display: none;
  }
  :hover {
    > div {
      width: 100px;
      height: 50px;
      position: absolute;
      display: block;
      text-align: center;
      padding: 10px;
      margin-left: 20px;
      margin-top: -45px;
      background: #eee;
      border-radius: 4px;
      border: 1px solid #999;
    }
  }
`;
