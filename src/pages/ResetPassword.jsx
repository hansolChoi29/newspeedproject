import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { supabase } from '../supabase/supabase';
import styled from 'styled-components';
import 'react-toastify/dist/ReactToastify.css';

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
    const passwordRegex = /^(?=.*[^a-zA-Z0-9].*[^a-zA-Z0-9]).{10,}$/;
    return passwordRegex.test(password);
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
      console.log(newpassword);
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
      <button onClick={handlePasswordChange}>패스워드 변경하기</button>
      <button onClick={goLogin}>로그인 하러가기</button>
    </div>
  );
};

export default ResetPassword;
