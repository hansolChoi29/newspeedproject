import styled from 'styled-components';

const StyledButton = styled.button`
  padding: 10px 20px;
  color: #fff;
  cursor: pointer;
  font-size: 1rem;
  border-radius: 5px;
  border: none;
  transition: 0.3s;
  background-color: ${({ color }) => color || '#87CEEB'};
  &:hover {
    opacity: 0.8;
  }
`;
export default StyledButton;
