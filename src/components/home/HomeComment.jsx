import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import StyledButton from '../../styles/StyledButton';
import { supabase } from '../../supabase/supabase';
import { FaPen, FaRegTrashAlt } from 'react-icons/fa';
import HomeUserProfile from './HomeUserProfile';

const CommentWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #ddd;
`;

const CommentContent = styled.div`
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

const CommentEditBtn = styled.button`
  font-size: 1.25rem;
  background: none;
`;

export default function HomeComment({ comment, updateComment, setComments }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newCommentData, setNewCommentData] = useState(comment.comment_data);
  const [userProfile, setUserProfile] = useState({});

  // 댓글 작성자의 프로필 정보를 가져오는 함수
  const fetchUserProfile = async (userId) => {
    try {
      const { data, error } = await supabase
        .from('users') // 'users' 테이블에서 사용자 정보를 가져옵니다.
        .select('user_nick_name, user_profile_image')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('사용자 정보 조회 오류:', error.message);
        return;
      }

      setUserProfile(data); // 사용자 정보를 상태에 저장
    } catch (error) {
      console.error('사용자 정보 조회 오류:', error.message);
    }
  };

  useEffect(() => {
    // 댓글 작성자의 프로필 정보 가져오기
    if (comment.user_id) {
      fetchUserProfile(comment.user_id);
    }
  }, [comment.user_id]);

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
          <>
            <HomeUserProfile
              userNickName={userProfile.user_nick_name} // 사용자 닉네임
              profileImage={userProfile.user_profile_image} // 사용자 프로필 이미지
              time={comment.comment_created_at}
              userId={comment.user_id}
            />
            <CommentText>{comment.comment_data}</CommentText>
          </>
        )}
      </CommentContent>
      <ButtonGroup>
        {isEditing ? (
          <>
            <StyledButton onClick={handleSaveEdit}>저장</StyledButton>
            <StyledButton onClick={handleCancelEdit} color="#F4A460">
              취소
            </StyledButton>
          </>
        ) : (
          <>
            <CommentEditBtn onClick={handleEditClick}>
              <FaPen />
            </CommentEditBtn>
            <CommentEditBtn onClick={handleDeleteClick}>
              <FaRegTrashAlt />
            </CommentEditBtn>
          </>
        )}
      </ButtonGroup>
    </CommentWrapper>
  );
}
