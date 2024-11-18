import React from 'react';
import styled from "styled-components";
import StyledButton from '../styles/StyledButton';

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
  textarea {
    width: calc(100% - 200px);
    padding: 10px;
    resize: none;
    outline: none;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
`;
export default function HomeCommentForm() {
  return (
    <StyledForm>
      <textarea id="comment" rows="1" cols="50" placeholder="댓글 작성"></textarea>
      <StyledButton type="submit">댓글</StyledButton>
      <StyledButton type="button" color="#F4A460">
        취소
      </StyledButton>
    </StyledForm>
  );
}
