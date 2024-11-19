import React, { useState } from 'react';
import styled from 'styled-components';
import StyledButton from '../../styles/StyledButton';
import { supabase } from '../../supabase/supabase';

const CommentWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #ddd;
`;

const CommentContent = styled.div`
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  input {
    padding: 5px;
    width: calc(100% - 30px);
    border: 1px solid #ccc;
    border-radius: 5px;
  }
`;

const CommentText = styled.p`
  margin: 0;
  flex: 1;
  padding-right: 10px;
  word-break: break-word;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  button {
    padding: 5px 10px;
  }
`;

export default function HomeComment({ comment, updateComment, setComments }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newCommentData, setNewCommentData] = useState(comment.comment_data);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setNewCommentData(comment.comment_data);
  };

  const handleSaveEdit = () => {
    if (newCommentData.length === 0) {
      alert('댓글을 입력해주세요');
      return;
    }
    if (newCommentData.trim() !== comment.comment_data) {
      updateComment(comment.id, newCommentData);
    }
    setIsEditing(false);
  };

  const handleDeleteClick = async () => {
    if (window.confirm('정말로 이 댓글을 삭제하시겠습니까?')) {
      try {
        const { error } = await supabase.from('comments').delete().eq('id', comment.id);

        if (error) {
          console.error('댓글 삭제 오류:', error.message);
          return;
        }

        setComments((prevComments) => prevComments.filter((c) => c.id !== comment.id));
      } catch (error) {
        console.error('댓글 삭제 오류:', error.message);
      }
    }
  };

  return (
    <CommentWrapper>
      <CommentContent>
        {isEditing ? (
          <>
            <input
              type="text"
              value={newCommentData}
              onChange={(e) => setNewCommentData(e.target.value)}
              autoFocus
              required
            />
          </>
        ) : (
          <CommentText>{comment.comment_data}</CommentText>
        )}
      </CommentContent>

      <ButtonGroup>
        {isEditing ? (
          <>
            <StyledButton onClick={handleSaveEdit}>저장</StyledButton>
            <StyledButton onClick={handleCancelEdit}>취소</StyledButton>
          </>
        ) : (
          <>
            <StyledButton onClick={handleEditClick}>수정</StyledButton>
            <StyledButton onClick={handleDeleteClick} color="#F4A460">
              삭제
            </StyledButton>
          </>
        )}
      </ButtonGroup>
    </CommentWrapper>
  );
}
