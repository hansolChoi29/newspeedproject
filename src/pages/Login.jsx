import LogoFontStyle from '../components/FontStyle';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import PalmtreeImg from '../image/LoginPalmtreeImg.png';
import whaleImg from '../image/LoginWhaleImg.png';
import { supabase } from '../supabase/supabase';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Button from '../components/login/Button';
import Loginpassword from '../components/login/Input';

const LoginPasswoardStyle = styled.form`
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
    margin-top: -10px;
  }
`;

const LoginCard = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  section {
    background-color: white;
    box-shadow: 4px 4px 15px rgba(0, 0, 0, 0.3);
  }
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
  overflow: hidden;
  background-image: linear-gradient(to right top, #87ceeb, #96dce0, #b4e6d6, #d7eed4, #f5f5dc);
`;

const StyledSection = styled.div`
  height: 630px;
  width: 450px;
  background-color: white;
`;

function Login() {
  // 로그인에 사용될 데이터 저장 상태
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // 로그인하지 않은 상태에서 접근 제한
  const loginUser = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (data?.user) {
      setUser(data.user);
      handleGoHome();
    } else {
      toast('이메일 또는 패스워드가 일치하지 않습니다.');
      return;
    }
  };

  useEffect(() => {
    if (user) {
    }
  }, [user]);

  const handleGoHome = () => {
    navigate('./Home');
  };

  const handleSingup = () => {
    navigate('./Join');
  };

  const FindPasswordPage = () => {
    navigate('./FindPassword');
  };

  return (
    <>
      <ToastContainer />
      <BackgroundColor style={{ height: '100vh' }}>
        <LoginTreeImg src={PalmtreeImg} />

        <LoginWhaleImg src={whaleImg} />

        <LoginCard style={{ height: '100vh' }}>
          <StyledSection>
            <LogoFontStyle>
              <p style={{ marginTop: '30px', fontSize: '45px' }}>Voir le chemin</p>
            </LogoFontStyle>

            <LoginPasswoardStyle
              onSubmit={(e) => {
                e.preventDefault(); // 기본 새로고침 방지
                loginUser(); // 엔터 키와 버튼 클릭 모두 처리
              }}
            >
              <Loginpassword email={email} setEmail={setEmail} password={password} setPassword={setPassword} />

              <P onClick={FindPasswordPage}>패스워드를 잊으셨나요?</P>
              <Button handleSingup={handleSingup} />
            </LoginPasswoardStyle>
          </StyledSection>
        </LoginCard>
      </BackgroundColor>
    </>
  );
}

export default Login;
