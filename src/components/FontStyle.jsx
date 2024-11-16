import styled from 'styled-components';

const LogoFontStyle = styled.div`
  font-family: 'Dancing Script', cursive !important;
  font-weight: ${(props) => props.weight || 400};
  font-size: ${(props) => props.size || '1.5rem'};
  color: ${(props) => props.color || '#333'};
  line-height: 1.2;
  letter-spacing: 0.5px;
  text-align: center;
`;

export default LogoFontStyle;
