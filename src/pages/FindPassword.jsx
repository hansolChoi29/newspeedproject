import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabase/supabase';
import { toast, ToastContainer } from 'react-toastify';
import styled from 'styled-components';
import StyledButton from '../styles/StyledButton';

const BackgroundColor = styled.div`
  height: 100vh;
  background-image: linear-gradient(to right top, #87ceeb, #96dce0, #b4e6d6, #d7eed4, #f5f5dc);
`;
const FindPasswordCard = styled.div`
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

const CardLabelInput = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 200px;
  gap: 10px;
  font-size: 20px;
  & input {
    text-align: center;
    margin-top: 10px;
    height: 50px;
  }
`;

export const FindPassword = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const linkPasswordReset = async () => {
    if (!email) {
      toast('입력하신 이메일이 없습니다.');
      return;
    }

    try {
      // Supabase 비밀번호 재설정 요청
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: 'http://localhost:5173/ResetPassword' // 재설정 후 이동할 URL
      });

      if (error) {
        // 오류 발생 시 메시지 출력
        toast.error(`오류가 발생했습니다: ${error.message}`);
      } else {
        // 성공 시 메시지 출력
        toast.success('패스워드 재설정 링크가 이메일로 전송되었습니다.');
      }
    } catch (err) {
      // 네트워크 오류 등 처리
      toast.error('서버와 연결할 수 없습니다. 다시 시도해주세요.');
    }
  };

  const backLogin = () => {
    navigate('/');
  };

  return (
    <div>
      <ToastContainer />
      <BackgroundColor />
      <FindPasswordCard>
        <CardLabelInput>
          <label>가입하신 이메일을 입력해주세요.</label>
          <input
            type="email"
            placeholder="이메일을 입력해주세요"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></input>
        </CardLabelInput>
        <StyledButton style={{ height: '60px', width: '300px' }} type="button" onClick={linkPasswordReset}>
          링크 보내기
        </StyledButton>

        <StyledButton
          style={{ height: '60px', width: '300px', backgroundColor: '#F4A460', marginTop: '20px' }}
          onClick={backLogin}
        >
          뒤로 가기
        </StyledButton>
      </FindPasswordCard>
    </div>
  );
};

export default FindPassword;
