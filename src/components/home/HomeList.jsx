import React, { useContext } from 'react';
import { HomeContext } from '../../context/HomeProvider';
import HomeListItem from './HomeListItem';
import HomeCommentList from './HomeCommentList';

export default function HomeList() {
  const { chat } = useContext(HomeContext);
  return (
    <>
      <HomeListItem />
      {chat && <HomeCommentList />}
    </>
  );
}
