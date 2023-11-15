import React from 'react';
import styled from 'styled-components';
import {Colors} from './Styles'

// Styled button component
const StyledButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  font-weight: normal;
  font-size: 15px;
  color: white;
  text-shadow: 1px 1px 0 black;
  padding: 0px 12px;
  height: 32px;
  transition: background-color 0.3s ease;
  flex-shrink: 0;
  background: linear-gradient(to bottom, ${Colors.PRIMARY_MEDIUM}, ${Colors.PRIMARY_DARK});
  border: 1px solid rgba(255, 255, 255, 0.64);
  outline: 1px solid black;
  font-family: 'Pokemon', sans-serif;
  cursor: pointer;
  gap: 6px;

  &:hover {
    background: linear-gradient(to top, ${Colors.PRIMARY_MEDIUM}, ${Colors.PRIMARY_DARK});
    border-color: white;
  }

  &:active {
    background: ${Colors.PRIMARY_DARKER};
    border-color: white;
  }

  ${({$disabled}) => $disabled ? 'pointer-events: none; opacity: 0.35;' : ''}
`;

const Button = ({ label, children, onClick, disabled }) => {
  return (
    <StyledButton onClick={onClick} $disabled={disabled}>
      {children ?? label}
    </StyledButton>
  )
};

export default Button;
