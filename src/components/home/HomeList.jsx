import React, { useContext } from 'react';
import { HomeContext } from '../../context/HomeProvider';
import HomeListItem from './HomeListItem';
import HomeCommentList from './HomeCommentList';
import Search from './Search';

export default function HomeList() {
  const { chatToggle, data, postId, setData } = useContext(HomeContext);

  return (
    <>
      {data.length === 0 ? <p>🌴글이 없습니다</p> : data.map((post) => <HomeListItem key={post.id} post={post} />)}
      {chatToggle && <HomeCommentList postId={postId} />}
      <p>{Search}</p>
    </>
  );
}
