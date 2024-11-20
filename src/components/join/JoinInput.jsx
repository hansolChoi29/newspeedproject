import React from 'react';
import styled from 'styled-components';

const Label = styled.label`
  display: block;
  margin-top: 10px;
  font-size: 13px;
`;

const InputStyled = styled.input`
  width: 300px;
  height: 70px;
  border-color: #ecebeb;
  box-sizing: border-box;
  text-align: center;
  margin-top: -20px;
`;
const InputStylE = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const JoinInput = ({
  email,
  onChangeEmail,
  password,
  onChangePassword,
  confirmPassword,
  onChangeConfirmPassword,
  nickname,
  onChangeNickname
}) => {
  return (
    <InputStylE>
      <Label>이메일</Label>
      <InputStyled
        type="email"
        placeholder="네이버 이메일 주소를 입력하세요."
        value={email}
        onChange={onChangeEmail}
      ></InputStyled>

      <Label>비밀번호</Label>
      <InputStyled
        type="password"
        placeholder="비밀번호를 입력하세요."
        value={password}
        onChange={onChangePassword}
      ></InputStyled>

      <Label>비밀번호 확인</Label>
      <InputStyled
        type="password"
        placeholder="비밀번호를 한 번 더 입력하세요."
        value={confirmPassword}
        onChange={onChangeConfirmPassword}
      ></InputStyled>

      <Label>닉네임</Label>
      <InputStyled
        type="text"
        placeholder="닉네임을 입력하세요."
        value={nickname}
        onChange={onChangeNickname}
      ></InputStyled>
    </InputStylE>
  );
};

export default JoinInput;
