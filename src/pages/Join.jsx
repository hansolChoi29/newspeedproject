import { useState } from 'react';
import { supabase } from '../supabase/supabase';
import { useNavigate } from 'react-router-dom';
import LogoFontStyle from '../components/FontStyle';
import styled from 'styled-components';
import StyledButton from '../styles/StyledButton';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const JoinCard = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  section {
    background-color: white;
    box-shadow: 4px 4px 15px rgba(0, 0, 0, 0.3);
  }
`;

const JoinPasswoard = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 450px;
  height: 550px;
  box-sizing: border-box;
  padding: 30px;
  & input {
    width: 260px;
    height: 70px;
    border-color: #ecebeb;
    box-sizing: border-box;
    text-align: center;
    margin-top: 20px;
  }
`;
const StyledSection = styled.div`
  height: 630px;
  width: 450px;
  background-color: white;
`;

const Label = styled.label`
  display: block;
  margin-top: 10px;
  font-size: 13px;
`;

const BackgroundColor = styled.div`
  background-image: linear-gradient(to right top, #87ceeb, #96dce0, #b4e6d6, #d7eed4, #f5f5dc);
`;

function Join() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const onChangeConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };

  const onChangeNickname = (e) => {
    setNickname(e.target.value);
  };

  const validEmail = (email) => {
    const emailRegex = /^\w+@(naver\.com)$/;
    return emailRegex.test(email);
  };

  const validPassword = (password) => {
    const passwordRegex = /^(?=.*[^a-zA-Z0-9].*[^a-zA-Z0-9]).{10,}$/;
    return passwordRegex.test(password);
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!email.trim()) {
      toast.error('이메일을 입력하세요');
      return;
    }

    if (!validEmail(email)) {
      toast.error('네이버 이메일 주소를 입력하세요.');
      return;
    }

    if (!password.trim()) {
      toast.error('비밀번호를 입력하세요.');
      return;
    }

    if (!validPassword(password)) {
      toast.error('비밀번호는 10자 이상이고 특수기호 2개 이상 포함해야합니다.');
      return;
    }

    if (!confirmPassword.trim()) {
      toast.error('비밀번호를 다시 확인해주세요.');
      return;
    }

    if (!nickname.trim()) {
      toast.error('닉네임을 설정해주세요.');
      return;
    }

    if (password !== confirmPassword) {
      toast.error('비밀번호가 일치하지 않습니다.');
      return;
    }

    try {
      const { data: duplicateNickname, error: nicknameCheckError } = await supabase
        .from('users')
        .select('user_nick_name')
        .eq('user_nick_name', nickname.trim().toLowerCase());

      console.log('Duplicate Nickname Check:', duplicateNickname);

      if (nicknameCheckError) {
        console.error('Nickname Check Error:', nicknameCheckError.message);
        toast.error('닉네임 중복 확인 중 오류가 발생했습니다.');
        return;
      }

      if (duplicateNickname.length > 0) {
        toast.error('이미 사용 중인 닉네임입니다.');
        return;
      }

          const { data: duplicateEmail, error: emailCheckError } = await supabase
            .from('users')
            .select('user_email')
            .eq('user_email', email);

          console.log('Duplicate Email Check:', duplicateEmail);

          if (emailCheckError) {
            console.error('Email Check Error:', emailCheckError.message);
            toast.error('이메일 중복 확인 중 오류가 발생했습니다.');
            return;
          }

          if (duplicateEmail.length > 0) {
            toast.error('이미 사용 중인 이메일입니다.');
            return;
          }

      const { data, error } = await supabase.auth.signUp({
        email,
        password
      });

      if (error) {
        console.error('Sign Up Error:', error.message);
        toast.error(`회원가입 실패: ${error.message}`);
        return;
      }

      const userId = data.user.id;
      const { error: insertError } = await supabase.from('users').insert([
        {
          id: userId,
          user_email: email,
          user_nick_name: nickname
        }
      ]);

      if (insertError) {
        console.error('Insert Error:', insertError.message);
        toast.error(`닉네임 저장 실패: ${insertError.message}`);
        return;
      }

      
      setUser(data.user);
      navigate('/Home');
    } catch (err) {
      console.error('Unexpected Error:', err.message);
      toast.error(`예기치 못한 오류가 발생했습니다: ${err.message}`);
    }
  };

  return (
    <>
      <ToastContainer />
      <BackgroundColor style={{ height: '100vh' }}>
        <JoinCard style={{ height: '100vh' }}>
          <StyledSection>
            <LogoFontStyle>
              <h1 style={{ marginTop: '30px', fontSize: '45px' }}>Voir le chemin</h1>
            </LogoFontStyle>
            <JoinPasswoard>
              <Label>이메일</Label>
              <input type="email" placeholder="이메일을 입력해주세요" value={email} onChange={onChangeEmail}></input>

              <Label>비밀번호</Label>
              <input
                type="password"
                placeholder="비밀번호를 입력해주세요"
                value={password}
                onChange={onChangePassword}
              ></input>

              <Label>비밀번호 확인</Label>
              <input
                type="password"
                placeholder="비밀번호를 한 번 더 입력해주세요"
                value={confirmPassword}
                onChange={onChangeConfirmPassword}
              ></input>

              <Label>닉네임</Label>
              <input
                type="text"
                placeholder="닉네임을 입력해주세요"
                value={nickname}
                onChange={onChangeNickname}
              ></input>

              <StyledButton
                style={{ margin: '20px', width: '300px', height: '70px', marginBottom: '-10px' }}
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  handleSignUp(e);
                }}
              >
                회원가입
              </StyledButton>
            </JoinPasswoard>
          </StyledSection>
        </JoinCard>
      </BackgroundColor>
    </>
  );
}
export default Join;
