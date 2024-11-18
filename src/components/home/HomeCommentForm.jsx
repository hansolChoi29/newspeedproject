import React from 'react';
import styled from 'styled-components';
import StyledButton from '../../styles/StyledButton';

const StyledForm = styled.form`
  display: flex;
  align-items: stretch;
  gap: 10px;
  margin-bottom: 20px;
  button {
    padding: 5px 0;
    width: 80px;
    font-size: 0.875rem;
  }
  input {
    width: calc(100% - 200px);
    padding: 10px;
    resize: none;
    outline: none;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
`;
export default function HomeCommentForm() {
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const comment = formData.get('comment');
    e.target.reset();
  };

  return (
    <StyledForm onSubmit={handleSubmit}>
      <input type="text" name="comment" placeholder="댓글 작성"></input>
      <StyledButton type="submit">댓글</StyledButton>
      <StyledButton type="button" color="#F4A460">
        취소
      </StyledButton>
    </StyledForm>
  );
}
