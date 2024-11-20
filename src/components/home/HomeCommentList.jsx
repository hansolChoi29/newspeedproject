import React, { useContext } from 'react';
import styled from 'styled-components';
import { IoIosClose } from 'react-icons/io';
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
  height: 400px;
  overflow: auto;
`;

export default function HomeCommentList({ postId }) {
  const { setChatToggle, commentsData, setCommentsData } = useContext(HomeContext);

  const filteredComments = commentsData.filter((comment) => comment.post_id === postId);

  return (
    <CommentBg>
      <StyledSection>
        <CloseBtn type="button" onClick={() => setChatToggle(false)}>
          <IoIosClose />
        </CloseBtn>
        <HomeCommentForm postId={postId} />
        <CommentCont>
          {filteredComments.length === 0 ? (
            <p>🌴댓글이 없습니다</p>
          ) : (
            filteredComments
              .sort((a, b) => new Date(b.comment_created_at) - new Date(a.comment_created_at))
              .map((comment) => (
                <HomeComment
                  key={comment.id}
                  comment={comment}
                  setCommentsData={setCommentsData} 
                />
              ))
          )}
        </CommentCont>
      </StyledSection>
    </CommentBg>
  );
}
