import { useState } from 'react';
import { supabase } from '../supabase/supabase';
import { useNavigate } from 'react-router-dom';
import LogoFontStyle from '../components/FontStyle';
import styled from 'styled-components';
import StyledButton from '../styles/StyledButton';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import JoinInput from '../components/join/JoinInput';

const JoinCard = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  section {
    background-color: white;
    box-shadow: 4px 4px 15px rgba(0, 0, 0, 0.3);
  }
`;

const JoinPasswoard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 450px;
  height: 550px;
  box-sizing: border-box;
  padding: 30px;
`;
const StyledSection = styled.div`
  height: 630px;
  width: 450px;
  background-color: white;
`;

const BackgroundColor = styled.div`
  background-image: linear-gradient(to right top, #87ceeb, #96dce0, #b4e6d6, #d7eed4, #f5f5dc);
  height: 100vh;
`;

const Title = styled.p`
  margin-top: 20px;
  font-size: 45px;
`;

function Join() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [nickname, setNickname] = useState('');
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
    const emailRegex = /^[a-zA-Z0-9._%+-]+@naver\.com$/;
    return emailRegex.test(email);
  };

  const validPassword = (password) => {
    const passwordRegex = /^(?=.*[^a-zA-Z0-9].*[^a-zA-Z0-9]).{10,}$/;
    return passwordRegex.test(password);
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!email.trim()) {
      toast.error('네이버 이메일 주소를 입력하세요.');
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
        .eq('user_nick_name', nickname.trim());

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

      navigate('/Home');
    } catch (err) {
      console.error('Unexpected Error:', err.message);
      toast.error(`예기치 못한 오류가 발생했습니다: ${err.message}`);
    }
  };

  return (
    <>
      <ToastContainer />
      <BackgroundColor>
        <JoinCard>
          <StyledSection>
            <LogoFontStyle>
              <Title>Voir le chemin</Title>
            </LogoFontStyle>
            <JoinPasswoard>
              <JoinInput
                email={email}
                onChangeEmail={onChangeEmail}
                password={password}
                onChangePassword={onChangePassword}
                confirmPassword={confirmPassword}
                onChangeConfirmPassword={onChangeConfirmPassword}
                nickname={nickname}
                onChangeNickname={onChangeNickname}
              />
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSignUp(e);
                }}
              >
                <StyledButton style={{ margin: '20px', width: '300px', height: '70px' }} type="submit">
                  회원가입
                </StyledButton>
              </form>
            </JoinPasswoard>
          </StyledSection>
        </JoinCard>
      </BackgroundColor>
    </>
  );
}
export default Join;
