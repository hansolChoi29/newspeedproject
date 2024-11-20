import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { supabase } from '../supabase/supabase';
import styled from 'styled-components';
import StyledButton from '../styles/StyledButton';

const ResetPassword = () => {
  const [newpassword, setNewPassword] = useState('');
  const [confimPassword, setConfimPassword] = useState('');
  const [searchParams] = useSearchParams();
  const accessToken = searchParams.get('access_token');
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      // access_token을 사용해 세션 복구
      if (accessToken) {
        const { error } = await supabase.auth.setSession({
          access_token: accessToken,
          refresh_token: accessToken // 동일한 토큰을 사용
        });

        if (error) {
          toast.error('세션 복구 실패. 다시 로그인해주세요.');
          navigate('/');
          return;
        }
      }

      // 현재 사용자 정보 가져오기
      const { data, error } = await supabase.auth.getUser();
      if (error || !data) {
        toast.error('인증되지 않은 사용자입니다. 로그인 페이지로 이동합니다.');
        navigate('/');
        return;
      }

      setUser(data); // 사용자 정보 저장
      console.log('현재 사용자:', data);
    };

    fetchUser();
  }, [accessToken, navigate]);

  const validPassword = (password) => {
    if (password.length < 10) {
      toast.error('패스워드는 최소 10자 이상이어야 합니다.');
      return false;
    }
    const specialCharCount = password.replace(/[a-zA-Z0-9]/g, '').length;
    if (specialCharCount < 2) {
      toast.error('패스워드는 최소 2개의 특수문자를 포함해야 합니다.');
      return false;
    }
    return true;
  };

  const handlePasswordChange = async () => {
    if (!newpassword || !confimPassword) {
      toast.error('모든 필드를 입력해주세요');
      return;
    }
    if (!validPassword(newpassword)) {
      toast.error('패스워드는 최소 10자 이상이며, 두 개 이상의 특수문자를 포함해야 합니다.');
    }
    if (newpassword !== confimPassword) {
      toast.error('패스워드가 일치하지 않습니다.');
      return;
    }
    try {
      const { error } = await supabase.auth.updateUser({
        password: newpassword
      });

      if (error) {
        toast.error(`패스워드 변경 실패: ${error.message}`);
      } else {
        toast.success('패스워드가 성공적으로 변경되었습니다.');
        navigate('/');
      }
    } catch (err) {
      console.error(err);
      toast.error('서버와 연결할 수 없습니다. 다시 시도해주세요');
    }
  };

  const goLogin = () => {
    navigate('/');
  };

  return (
    <div>
      <ToastContainer />
      <BackgroundColor />
      <PasswordCord>
        <ResetCardInput>
          <label>변경할 패스워드</label>
          <input
            value={newpassword}
            onChange={(e) => setNewPassword(e.target.value)}
            type="password"
            placeholder="변경하실 패스워드를 입력해주세요"
          ></input>
          <label>패스워드 확인</label>
          <input
            value={confimPassword}
            onChange={(e) => setConfimPassword(e.target.value)}
            type="password"
            placeholder="변경할 패스워드가 맞는지 확인해주세요"
          ></input>
        </ResetCardInput>
        <StyledButton style={{ height: '60px', width: '300px', marginTop: '-50px' }} onClick={handlePasswordChange}>
          패스워드 변경하기
        </StyledButton>
        <StyledButton
          style={{ height: '60px', width: '300px', backgroundColor: '#F4A460', marginTop: '20px' }}
          onClick={goLogin}
        >
          로그인 하러가기
        </StyledButton>
      </PasswordCord>
    </div>
  );
};

const ResetCardInput = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 200px;
  & input {
    text-align: center;
    width: 275px;
    height: 50px;
    margin: 15px;
  }
`;

const PasswordCord = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 630px;
  width: 450px;
  background-color: white;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const BackgroundColor = styled.div`
  height: 100vh;
  background-image: linear-gradient(to right top, #87ceeb, #96dce0, #b4e6d6, #d7eed4, #f5f5dc);
`;

export default ResetPassword;
