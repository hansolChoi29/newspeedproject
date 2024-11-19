import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import { supabase } from '../../supabase/supabase';
import { FaPen, FaRegTrashAlt } from 'react-icons/fa';
import { RiEditLine, RiCloseLargeFill } from 'react-icons/ri';
import HomeUserProfile from './HomeUserProfile';

const CommentWrapper = styled.div`
  position: relative;
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
  margin: 20px 0;
  word-break: break-word;
`;

const CommentEditBtnbox = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 20px;
  button {
    font-size: 1.25rem;
    background: none;
    &:nth-child(1) {
      color: #87ceeb;
    }
    &:nth-child(2) {
      color: #f4a460;
    }
  }
`;

const CommentEditBtn = styled.button`
  font-size: 1.25rem;
  background: none;
`;

const CommentBtnBox = styled.div`
  position: absolute;
  top: 25px;
  right: 10px;
  button {
    &:nth-child(1) {
      color: #87ceeb;
    }
    &:nth-child(2) {
      color: #f4a460;
    }
  }
`;

export default function HomeComment({ comment, updateComment, setComments }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newCommentData, setNewCommentData] = useState(comment.comment_data);
  const [userProfile, setUserProfile] = useState({});

  const fetchUserProfile = async (userId) => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('user_nick_name, user_profile_image')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('사용자 정보 조회 오류:', error.message);
        return;
      }

      setUserProfile(data);
    } catch (error) {
      console.error('사용자 정보 조회 오류:', error.message);
    }
  };

  useEffect(() => {
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
      toast.error('댓글을 입력해주세요');
      return;
    }
    if (newCommentData.trim() !== comment.comment_data) {
      updateComment(comment.id, newCommentData);
    }
    setIsEditing(false);
  };

  const handleDeleteClick = async () => {
    const confirmDelete = confirm('정말로 이 댓글을 삭제하시겠습니까?');

    if (confirmDelete) {
      try {
        const { error } = await supabase.from('comments').delete().eq('id', comment.id);

        if (error) {
          toast.error('댓글 삭제 오류: ' + error.message);
          return;
        }

        setComments((prevComments) => prevComments.filter((c) => c.id !== comment.id));
        toast.success('댓글이 삭제되었습니다.');
      } catch (error) {
        toast.error('댓글 삭제 오류: ' + error.message);
      }
    } else {
      toast.info('댓글 삭제가 취소되었습니다.');
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
              userNickName={userProfile.user_nick_name}
              profileImage={userProfile.user_profile_image}
              time={comment.comment_created_at}
              userId={comment.user_id}
            />
            <CommentText>{comment.comment_data}</CommentText>
          </>
        )}
      </CommentContent>
      {isEditing ? (
        <CommentEditBtnbox>
          <button onClick={handleSaveEdit}>
            <RiEditLine />
          </button>
          <button onClick={handleCancelEdit}>
            <RiCloseLargeFill />
          </button>
        </CommentEditBtnbox>
      ) : (
        <CommentBtnBox>
          <CommentEditBtn onClick={handleEditClick}>
            <FaPen />
          </CommentEditBtn>
          <CommentEditBtn onClick={handleDeleteClick}>
            <FaRegTrashAlt />
          </CommentEditBtn>
        </CommentBtnBox>
      )}
    </CommentWrapper>
  );
}
