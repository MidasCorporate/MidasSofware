import styled from 'styled-components';
// import { darken } from 'polished';

export const Container = styled.div`
  position: relative;
`;

export const ButtonActions = styled.button`
  border: 0;
  background: none;
  position: relative;
`;

export const Content = styled.div`
  position: absolute;
  width: 125px;
  left: calc(50% - 62.5px);
  top: calc(100% + 16px);
  height: 35px;
  background: #333;
  border-radius: 4px;
  padding: 8px 5px;
  z-index: 2;

  display: ${(props) => (props.visible ? 'block' : 'none')};
  &::before {
    content: '';
    position: absolute;
    left: calc(50% - 20px);
    top: -20px;
    width: 0;
    height: 0;
    border-left: 20px solid transparent;
    border-right: 20px solid transparent;
    border-bottom: 20px solid #333;
  }
`;

export const ButtonView = styled.div`
  display: flex;
  justify-content: center;

  svg {
    display: flex;
    margin-right: 5px;
  }

  button {
    display: flex;
    background: none;
    border: none;
    color: #fff;
    font-weight: bold;
    align-items: center;
    transition: color 0.6s;
    &:hover {
      color: #ef4336;
    }
  }
`;
