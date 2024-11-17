import LogoFontStyle from '../components/FontStyle';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import PalmtreeImg from '../image/LoginPalmtreeImg.png';
import whaleImg from '../image/LoginWhaleImg.png';
import StyledButton from '../styles/StyledButton';
import StyledSection from '../styles/StyledSection';
import { supabase } from '../supabase/supabase';
// import 민정님꺼 회원가입 받아오기

const LoginCard = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  /* height: 100%; */
  section {
    background-color: white;
    box-shadow: 4px 4px 15px rgba(0, 0, 0, 0.3);
  }
`;

const LoginPasswoard = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 300px;
  font-size: 20px;
  & input {
    width: 300px;
    height: 50px;
    border-color: white;
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

// const LoginButton = styled.button`
//   display: block;
//   height: 50px;
//   width: 250px;
//   margin: 20px;
// `;

const LoginTreeImg = styled.img`
  position: absolute;
  height: 100px;
  top: 110px;
  left: 1075px;
`;
const LoginWhaleImg = styled.img`
  position: absolute;
  height: 100px;
  top: 40px;
  left: 1075px;
`;

const BackgroundColor = styled.div`
  background-image: linear-gradient(
    to right top,
    #87ceeb,
    #a0cfec,
    #b6d0eb,
    #c7d3e7,
    #d3d6e3,
    #d4dae7,
    #d5dfeb,
    #d6e3ee,
    #c7eaf3,
    #bdf1eb,
    #c5f5d6,
    #e1f4bd
  );
`;

function Login() {
  // 로그인에 사용될 데이터 저장 상태
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  const loginUser = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (data?.user) {
      setUser(data.user);
      handleGoHome();
    } else {
      alert('이메일 또는 패스워드가 일치하지 않습니다.');
    }
  };

  useEffect(() => {
    if (user) {
    }
  }, [user]);

  const navigate = useNavigate();
  const handleGoHome = () => {
    navigate('./Home');
  };

  const handleSingup = () => {
    navigate('./Join');
  };

  return (
    <>
      <BackgroundColor style={{ height: '100vh' }}>
        <LoginTreeImg src={PalmtreeImg} />
        <LoginWhaleImg src={whaleImg} />
        <LoginCard style={{ height: '100%' }}>
          <StyledSection>
            <LogoFontStyle>
              <h1 style={{ height: '520px', fontSize: '30px', fontSize: '45px' }}>Voir le chemin</h1>
            </LogoFontStyle>
            <LoginPasswoard>
              <Label>이메일</Label>
              <input type="email" placeholder="이메일을 입력해주세요." required></input>
              <Label>패스워드</Label>
              <input
                type="password"
                placeholder="패스워드를 입력해주세요."
                required
                // value={password}
              ></input>
              <P>패스워드를 잊으셨나요?</P>
              <StyledButton
                style={{ margin: '20px', width: '300px', height: '70px' }}
                type="button"
                onClick={loginUser}
              >
                로그인
              </StyledButton>
              <StyledButton
                style={{ width: '300px', height: '70px' }}
                color="#F4A460"
                type="button"
                onClick={handleSingup}
              >
                회원가입
              </StyledButton>
            </LoginPasswoard>
          </StyledSection>
        </LoginCard>
      </BackgroundColor>
    </>
  );
}

export default Login;
