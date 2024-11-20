import React from 'react';
import styled from 'styled-components';

const Label = styled.label`
  display: block;
  height: 1px;
  margin-top: 30px;
  font-size: 13px;
`;

const InputStyle = styled.input`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60px;
  width: 300px;
`;

const InputStylE = styled.div`
  margin-top: 60px;
`;

const Loginpassword = ({ email, setEmail, password, setPassword }) => {
  return (
    <div>
      <InputStylE>
        <Label>이메일</Label>
        <InputStyle
          type="email"
          placeholder="이메일을 입력해주세요."
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        ></InputStyle>
        <Label>패스워드</Label>
        <InputStyle
          type="password"
          placeholder="패스워드를 입력해주세요."
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        ></InputStyle>
      </InputStylE>
    </div>
  );
};

export default Loginpassword;
