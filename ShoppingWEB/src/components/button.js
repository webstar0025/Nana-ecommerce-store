import styled from 'styled-components';

// define the basic button style
export const Button = styled.button`
  border: none;
  min-width: 20px;
  text-align: center;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  cursor: pointer;
  transition-duration: 0.3s;
  color: white;

  &:disabled {
    cursor: not-allowed;
  }
`;