import { Link } from 'react-router-dom';
import LogoFontStyle from './FontStyle';

function Header() {

  return (
    <>
    <Link to="/Home">
    <LogoFontStyle>Voir le chemin🌴</LogoFontStyle>
    </Link>
    
      <p>`${}님 안녕하세요`</p>
      <Link to="/Mypage">
      <p>사람모양이모지</p>
      </Link>
    </>
  );
}

export default Header;
