import React, { useContext } from 'react';
import { HomeContext } from '../../context/HomeProvider';
import HomeListItem from './HomeListItem';
import HomeCommentList from './HomeCommentList';

export default function HomeList() {
<<<<<<< HEAD
  const { chatToggle, data, postId, setData } = useContext(HomeContext);
=======
  const { chatToggle, data, postId } = useContext(HomeContext);

>>>>>>> f84dce5208d2031d5f43efe01ea97a622497d73d
  return (
    <>
      {data.length === 0 ? <p>🌴글이 없습니다</p> : data.map((post) => <HomeListItem key={post.id} post={post} />)}
      {chatToggle && <HomeCommentList postId={postId} />}
    </>
  );
}
