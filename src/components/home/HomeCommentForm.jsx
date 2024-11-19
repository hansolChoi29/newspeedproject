import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { supabase } from '../../supabase/supabase';
import StyledButton from '../../styles/StyledButton';
import { HomeContext } from '../../context/HomeProvider';

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

export default function HomeCommentForm({ postId }) {
  const [comment, setComment] = useState('');
  const { comments, setComments } = useContext(HomeContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!comment.trim()) return;

    try {
      const { data: user, error: userError } = await supabase.auth.getUser();
      if (userError) {
        console.error('사용자 오류:', userError.message);
        return;
      }
      if (!user) {
        alert('로그인 후 댓글을 작성해주세요.');
        return;
      }

      const { data, error } = await supabase.from('comments').insert([
        {
          post_id: postId,
          comment_data: comment,
          user_id: user.user.id,
        }
      ]);

      if (error) throw error;

      setComments((prevComments) => [...prevComments, data]);
      setComment('');
    } catch (error) {
      console.error('댓글 추가 오류:', error.message);
    }
  };

  const handleCancel = () => {
    setComment('');
  };

  return (
    <StyledForm onSubmit={handleSubmit}>
      <input
        type="text"
        name="comment"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="댓글 작성"
      />
      <StyledButton type="submit">댓글</StyledButton>
      <StyledButton type="button" onClick={handleCancel} color="#F4A460">
        취소
      </StyledButton>
    </StyledForm>
  );
}
