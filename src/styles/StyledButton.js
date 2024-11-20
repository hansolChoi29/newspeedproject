import styled from 'styled-components';

const StyledButton = styled.button`
  padding: 10px 20px;
  color: #fff;
  cursor: pointer;
  font-size: 1rem;
  border-radius: 5px;
  border: none;
  background-color: ${({ color }) => color || '#87CEEB'};
`;
export default StyledButton;
