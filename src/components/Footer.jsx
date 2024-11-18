import styled from 'styled-components';
import LogoFontStyle from './FontStyle';

const FooterStyle = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%; /* 가로 너비 설정 */
  height: 50px;
  display: flex; /* Flexbox 사용 */
  justify-content: space-around; /* 양쪽 끝 정렬 */
  align-items: center; /* 수직 가운데 정렬 */
  background-color: #f8f9fa; /* (선택) 배경색 설정 */
  margin:10px 20px;
`;


function Footer() {
  return (
    <FooterStyle>
      <LogoFontStyle>Voir le chemin</LogoFontStyle>
      <span>
        <p>Hansol Choi | Minji Kim | Daeeun Kang</p>
        <p>Wooseok Park | Minjung Kim | Jieun Kim</p>
      </span>
    </FooterStyle>
  );
}

export default Footer;
