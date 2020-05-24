import styled from 'styled-components';

export const Constainer = styled.div`
  display: flex;
  align-items: center;
`;
export const ButtonSelectSegment = styled.button`
  margin: none;
  border: none;
  padding: none;
  background: none;

  p {
    max-width: 190px; /* Tamanho */
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;
