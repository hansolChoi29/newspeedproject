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

export default function HomeComment({ comment }) {
  if (!comment) {
    return null;
  }
  const { comment_created_at, comment_data, user_id, id } = comment;
  console.log(comment);

  return (
    <CommentCont>
      <HomeUserProfile time={comment_created_at} userId={user_id} targetId={id} />
      <CommentWriting>{comment_data}</CommentWriting>
    </CommentCont>
  );
}
