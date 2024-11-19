import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { IoIosClose } from 'react-icons/io';
import { supabase } from '../../supabase/supabase';
import StyledSection from '../../styles/StyledSection';
import HomeCommentForm from './HomeCommentForm';
import HomeComment from './HomeComment';
import { HomeContext } from '../../context/HomeProvider';

const CommentBg = styled.div`
  z-index: 10;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  & > section {
    z-index: 1;
    position: absolute;
    padding: 20px;
    padding-top: 60px;
    top: 50%;
    left: 50%;
    border-radius: 10px;
    transform: translate(-50%, -50%);
    background: #fff;
  }
`;

const CloseBtn = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 2.5rem;
  background: none;
`;

const CommentCont = styled.div`
  padding: 20px;
`;

export default function HomeCommentList({ postId }) {
  const { setChatToggle, comments, setComments } = useContext(HomeContext);

  const fetchComments = async () => {
    if (!postId) return;
    const { data, error } = await supabase
      .from('comments')
      .select('id, comment_data, comment_created_at, user_id')
      .eq('post_id', postId);

    if (error) {
      console.error(error);
    } else {
      setComments(data);
    }
  };

  const updateComment = async (commentId, newCommentData) => {
    try {
      const { data, error } = await supabase
        .from('comments')
        .update({ comment_data: newCommentData })
        .eq('id', commentId);

      if (error) {
        console.error(error);
        return;
      }

      setComments((prevComments) =>
        prevComments.map((comment) =>
          comment.id === commentId ? { ...comment, comment_data: newCommentData } : comment
        )
      );
    } catch (error) {
      console.error('댓글 수정 오류:', error.message);
    }
  };

  useEffect(() => {
    if (postId) {
      fetchComments();
    }
  }, [postId]);

  return (
    <CommentBg>
      <StyledSection>
        <CloseBtn type="button" onClick={() => setChatToggle(false)}>
          <IoIosClose />
        </CloseBtn>
        <HomeCommentForm postId={postId} />
        <CommentCont>
          {comments.length === 0 ? (
            <p>🌴댓글이 없습니다</p>
          ) : (
            comments
              .sort((a, b) => new Date(b.comment_created_at) - new Date(a.comment_created_at))
              .map((comment) => (
                <HomeComment
                  key={comment.id}
                  comment={comment}
                  setComments={setComments}
                  updateComment={updateComment}
                />
              ))
          )}
        </CommentCont>
      </StyledSection>
    </CommentBg>
  );
}
