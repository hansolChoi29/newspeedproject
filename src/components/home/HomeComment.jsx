import React from 'react';
import HomeUserProfile from './HomeUserProfile';
import styled from 'styled-components';

const CommentCont = styled.div`
  margin: 30px 0;
`;
const CommentWriting = styled.p`
  margin-top: 10px;
  margin-left: 60px;
`;

export default function HomeComment() {
  return (
    <CommentCont>
      <HomeUserProfile />
      <CommentWriting>맞아요 맞아요 거기 추천함!</CommentWriting>
    </CommentCont>
  );
}
