import React from 'react';
import { useNavigate } from 'react-router-dom';

const ResetPassword = () => {
  const navigate = useNavigate('');
  const goLogin = () => {
    navigate('/');
  };

  return (
    <div>
      <label>변경할 패스워드</label>
      <input type="password" placeholder="변경하실 패스워드를 입력해주세요"></input>
      <label>패스워드 확인</label>
      <input type="password" placeholder="변경할 패스워드가 맞는지 확인해주세요"></input>
      <button>패스워드 변경하기</button>
      <button onClick={goLogin}>로그인 하러가기</button>
    </div>
  );
};

export default ResetPassword;
