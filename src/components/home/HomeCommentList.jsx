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
`;

export default function HomeCommentList({ postId }) {
  const { setChatToggle, chat, data } = useContext(HomeContext);

  return (
    <CommentBg>
      <StyledSection>
        <CloseBtn type="button" onClick={() => setChatToggle(false)}>
          <IoIosClose />
        </CloseBtn>
        <HomeCommentForm postId={postId} />
        <CommentCont>
          {chat.map((comment) => (
            <HomeComment key={comment.id} comment={comment} />
          ))}
        </CommentCont>
      </StyledSection>
    </CommentBg>
  );
}
