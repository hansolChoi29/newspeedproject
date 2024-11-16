import { createGlobalStyle } from 'styled-components';
import styledReset from 'styled-reset';

export const GlobalStyle = createGlobalStyle`
  ${styledReset} 
  body {
    font-family: "Noto Sans KR", sans-serif;
  }
`;
