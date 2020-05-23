import styled from 'styled-components';

export const OpButon = styled.div`
  margin-top: 10px;
  margin-right: 12px;

  > button {
    margin-left: 10px;
  }
`;

export const Add = styled.div`
  margin-top: 197px;
  margin-left: 15px;
`;
export const FileOrder = styled.div`
  display: ${(props) => (props.tag ? 'block' : 'none')};
  position: absolute;
  margin-left: -20px;
  margin-top: -40px;
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
      margin-top: -20px;
      background: #eee;
      border-radius: 4px;
      border: 1px solid #999;
    }
  }
`;
