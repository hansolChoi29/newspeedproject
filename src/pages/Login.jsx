import LogoFontStyle from '../components/FontStyle';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import EnglandHomeImg from '../image/EnglandHomeImg.jpg';
import FranceHomeImg from '../image/FranceHomeImg.jpg';
import JapanHomeImg from '../image/JapanHomeImg.jpg';
import KoreaHomeImg from '../image/KoreaHomeImg.jpg';
import SeoulHomeImg from '../image/SeoulHomeImg.jpg';
import SwitzerlandHomeImg from '../image/SwitzerlandHomeImg.jpg';
import UsaHomeImg from '../image/UsaHomeImg.jpg';
import PalmtreeImg from '../image/LoginPalmtreeImg.png';
import whaleImg from '../image/LoginWhaleImg.png';

const LoginCard = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  left: 50px;
  background-color: #faf8f1;
  height: 600px;
  width: 400px;
  position: absolute;
  left: 610px;
  top: 170px;
  box-shadow: 4px 4px 15px rgba(0, 0, 0, 0.3);
`;

const LoginPasswoard = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 130px;
  font-size: 20px;
  & input {
    width: 300px;
    height: 50px;
    border-radius: 10px;
    border-color: white;
    padding: 7px;
    box-sizing: border-box;
    text-align: center;
  }
`;

const Label = styled.label`
  display: flex;
  justify-content: end;
  align-items: end;
  margin-right: auto;
  margin-top: 35px;
`;

const P = styled.p`
  display: flex;
  justify-content: end;
  align-items: end;
  margin-left: auto;
  font-size: 12px;
  cursor: pointer;
`;

const LoginButton = styled.button`
  display: block;
  height: 50px;
  width: 250px;
  margin: 20px;
  background-color: #87ceeb;
  border-color: #fff1dc;
  border-radius: 5px;
  border: 0px 2px 2px 0px solid #fff1dc;
`;
// f7dcb4
const SingupButton = styled.button`
  display: block;
  height: 50px;
  width: 250px;
  background-color: #f7dcb4;
  border-color: #fff1dc;
  border-radius: 5px;
  border: 0px 2px 2px 0px solid #fff1dc;
`;
// f7dcb4
const HomeImgWrap = styled.div`
  position: absolute;
  left: 1035px;
  top: 170px;
  background: none;
  box-shadow: 4px 4px 15px rgba(0, 0, 0, 0.3);
  padding: 0%;
  height: 600px;
  width: 350px;
  overflow: hidden;
  & img {
    height: 610px;
    width: 350px;
    background-size: cover;
  }
`;

const LoginTreeImg = styled.img`
  position: absolute;
  height: 100px;
  top: 80px;
  left: 930px;
`;
const LoginWhaleImg = styled.img`
  position: absolute;
  height: 100px;
  top: 10px;
  left: 930px;
`;

function Login() {
  const HomeImage = [
    EnglandHomeImg,
    FranceHomeImg,
    JapanHomeImg,
    KoreaHomeImg,
    SeoulHomeImg,
    SwitzerlandHomeImg,
    UsaHomeImg
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % HomeImage.length);
    }, 3500);
    return () => clearInterval(timer);
  }, [HomeImage.length]);

  const navigate = useNavigate();
  const handleLogin = () => {
    return alert('이메일과 패스워드를 입력해주세요.');
  };

  const handleSingup = () => {
    navigate('./Join');
  };

  return (
    <>
      <LoginTreeImg src={PalmtreeImg} />
      <LoginWhaleImg src={whaleImg} />
      <LoginCard>
        <LogoFontStyle>
          <h1 style={{ height: '520px', fontSize: '30px', fontSize: '45px' }}>Voir le chemin</h1>
          <p style={{ position: 'absolute', top: '85px', left: '60px', fontSize: '20px' }}>
            Are you ready to embark on a journey?
          </p>
        </LogoFontStyle>

        <LoginPasswoard>
          <Label>이메일</Label>
          <input
            type="email"
            placeholder="이메일을 입력해주세요."
            required
            //  value={email}
          ></input>
          <Label>패스워드</Label>
          <input
            type="password"
            placeholder="패스워드를 입력해주세요."
            required
            // value={password}
          ></input>
          <P>패스워드를 잊으셨나요?</P>
          <LoginButton onClick={handleLogin}>로그인</LoginButton>
          <SingupButton onClick={handleSingup}>회원가입</SingupButton>
        </LoginPasswoard>
      </LoginCard>
      <HomeImgWrap>
        <img src={HomeImage[currentIndex]} alt={`Slide ${currentIndex + 1}`} />
      </HomeImgWrap>
    </>
  );
}

export default Login;
