import React, { useContext } from 'react';
import { HomeContext } from '../../context/HomeProvider';
import HomeListItem from './HomeListItem';
import HomeCommentList from './HomeCommentList';

export default function HomeList() {
  const { chat, data } = useContext(HomeContext);
  console.log(data.posts);
  return (
    <>
      {data.posts?.map((post) => (
        <HomeListItem key={post.id} post={post} />
      ))}
      {chat && <HomeCommentList />}
    </>
  );
}
