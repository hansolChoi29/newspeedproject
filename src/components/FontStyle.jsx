import styled from 'styled-components';

const LogoFontStyle = styled.div`
  font-family: 'Dancing Script', cursive;
  font-weight: ${(props) => props.weight || 400};
  font-size: ${(props) => props.size || '1.5rem'};
  color: ${(props) => props.color || '#333'};
`;

export default LogoFontStyle;
