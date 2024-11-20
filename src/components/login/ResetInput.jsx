import React from 'react';
import styled from 'styled-components';

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

const ResetInput = ({ newpassword, setNewPassword, confimPassword, setConfimPassword }) => {
  return (
    <div>
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
    </div>
  );
};

export default ResetInput;
