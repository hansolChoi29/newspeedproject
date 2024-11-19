import React from 'react';
import styled from 'styled-components';
import StyledButton from '../../styles/StyledButton';

// const StyledButton = styled.button``;

const LoginPasswoard = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 450px;
  height: 500px;
  box-sizing: border-box;
  padding: 30px;
`;

const Button = ({ loginUser, handleSingup, loginText = '로그인', signupText = '회원가입' }) => {
  return (
    <LoginPasswoard>
      <StyledButton
        style={{ margin: '20px', width: '300px', height: '70px', marginTop: '50px' }}
        type="button"
        onClick={loginUser}
      >
        {loginText}
      </StyledButton>

      <StyledButton
        style={{ width: '300px', height: '70px', marginBottom: '200px' }}
        color="#F4A460"
        type="button"
        onClick={handleSingup}
      >
        {signupText}
      </StyledButton>
    </LoginPasswoard>
  );
};

export default Button;
