import styled from 'styled-components';
import LogoFontStyle from './FontStyle';

const FooterStyle = styled.div`
  position: fixed;
  bottom: 0px;
  gap: 60%;
`;

function Footer() {
  return (
    <FooterStyle>
      <LogoFontStyle>Voir le chemin</LogoFontStyle>
      <p>
        <span>Hansol Choi | Minji Kim | Daeeun Kang | Wooseok Park | Minjung Kim | Jieun Kim</span>
      </p>
    </FooterStyle>
  );
}

export default Footer;
