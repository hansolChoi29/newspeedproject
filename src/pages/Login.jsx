import LogoFontStyle from '../components/FontStyle';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import PalmtreeImg from '../image/LoginPalmtreeImg.png';
import whaleImg from '../image/LoginWhaleImg.png';
import StyledButton from '../styles/StyledButton';
import StyledSection from '../styles/StyledSection';
import { supabase } from '../supabase/supabase';

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
  justify-content: space-between;
  align-items: center;
  width: 450px;
  height: 550px;
  box-sizing: border-box;
  padding: 30px;
  & input {
    width: 300px;
    height: 70px;
    border-color: #ecebeb;
    box-sizing: border-box;
    text-align: center;
    margin-top: -20px;
  }
`;

const Label = styled.label`
  display: block;
  margin-top: 10px;
  font-size: 13px;
`;

const P = styled.p`
  align-items: end;
  margin-left: auto;
  font-size: 12px;
  cursor: pointer;
`;

const LoginTreeImg = styled.img`
  position: absolute;
  height: 100px;
  top: 110px;
  left: 56%;
`;
const LoginWhaleImg = styled.img`
  position: absolute;
  height: 100px;
  top: 40px;
  left: 56%;
`;

const BackgroundColor = styled.div`
  background-image: linear-gradient(to right top, #87ceeb, #96dce0, #b4e6d6, #d7eed4, #f5f5dc);
`;

function Login() {
  // 로그인에 사용될 데이터 저장 상태
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  const loginUser = async () => {
    console.log(email, password);
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    console.log(data);
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

        <LoginCard style={{ height: '100vh' }}>
          <StyledSection>
            <LogoFontStyle>
              <h1 style={{ marginTop: '30px', fontSize: '45px' }}>Voir le chemin</h1>
            </LogoFontStyle>

            <LoginPasswoard>
              <Label>이메일</Label>
              <input
                type="email"
                placeholder="이메일을 입력해주세요."
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                required
              ></input>
              <Label>패스워드</Label>
              <input
                type="password"
                placeholder="패스워드를 입력해주세요."
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                required
              ></input>
              {/* <P>패스워드를 잊으셨나요?</P> */}
              <StyledButton
                style={{ margin: '20px', width: '300px', height: '70px', marginBottom: '-10px' }}
                type="button"
                onClick={loginUser}
              >
                로그인
              </StyledButton>

              <StyledButton
                style={{ width: '300px', height: '70px', marginBottom: '10px' }}
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
