import React from 'react';
import styled from 'styled-components';

// Function to lighten or darken colors
const lightenDarkenColor = (col, amt) => {
  let usePound = false;
  if (col[0] === "#") {
    col = col.slice(1);
    usePound = true;
  }
  const num = parseInt(col,16);
  let r = (num >> 16) + amt;
  if (r > 255) r = 255;
  else if  (r < 0) r = 0;
  let b = ((num >> 8) & 0x00FF) + amt;
  if (b > 255) b = 255;
  else if  (b < 0) b = 0;
  let g = (num & 0x0000FF) + amt;
  if (g > 255) g = 255;
  else if (g < 0) g = 0;
  return (usePound?"#":"") + (g | (b << 8) | (r << 16)).toString(16);
}

// Styled button component
const StyledButton = styled.button`
  background-color: #4684AD;
  border-radius: 3px;
  font-weight: 500; // Medium font weight
  font-size: 22px;
  color: white;
  text-shadow: 1px 1px 0 black;
  padding: 4px 12px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  flex-shrink: 0;
  outline: 1px solid black;
  border: 2px solid white;
  font-family: 'Pokemon Fire Red', sans-serif;

  &:hover {
    background-color: ${() => lightenDarkenColor('#4684AD', 20)};
  }

  &:active {
    background-color: ${() => lightenDarkenColor('#4684AD', -20)};
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
