import React, { useContext } from 'react';
import { HomeContext } from '../../context/HomeProvider';
import HomeListItem from './HomeListItem';
import HomeCommentList from './HomeCommentList';

export default function HomeList() {
  const { chatToggle, data, postId, setData } = useContext(HomeContext);
  return (
    <>
      {data.map((post) => (
        <HomeListItem key={post.id} post={post} />
      ))}
      {chatToggle && <HomeCommentList postId={postId} />}
    </>
  );
}
