import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div``;

export const ButtonActions = styled.span`
  align-self: center;
  justify-content: center;
  button {
    border: 0;
    background: none;
  }
`;

export const Content = styled.div`
  position: absolute;
  width: 125px;
  left: calc(71.4% - 60px);
  margin-top: 16px;
  margin-left: -25px;
  /* width: 150px; */
  height: 50px;
  background: #333;
  border-radius: 4px;
  padding: 15px 5px;
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
  div {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: center;
  }
  svg {
    display: flex;
    align-items: flex-start;
    margin-right: 7px;
    margin-left: 10px;
  }
  & + div {
    border-top: 1px solid #eee;
    margin-top: 5px;
    padding-top: 5px;
  }
  button {
    display: flex;
    width: 100%;
    background: none;
    border: none;
    color: #eee;
    font-weight: bold;
    align-items: center;
    transition: color 0.6s;
    &:hover {
      color: ${darken(0.3, '#eee')};
    }
  }
`;
