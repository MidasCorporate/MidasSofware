import styled from 'styled-components';

export const HeaderOption = styled.div`
  width: 100%;
  textarea {
    width: 100%;
    border-radius: 4px;
    margin-top: -20px;
    height: 200px;
  }
`;

export const Text = styled.div`
  flex-direction: row;
  svg {
    cursor: pointer;
    margin-left: 30px;
    :hover {
      background: #eee;
    }
  }
`;
