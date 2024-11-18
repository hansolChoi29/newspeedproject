import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { format, register } from 'timeago.js';
import koLocale from 'timeago.js/lib/lang/ko';
import { IoChatbubbleOutline } from 'react-icons/io5';
import { AiOutlineLike, AiFillLike } from 'react-icons/ai';
import HomeUserProfile from './HomeUserProfile';
import { HomeContext } from '../../context/HomeProvider';

register('ko', koLocale);

const StyledHomeListItem = styled.div`
  margin-bottom: 50px;
`;
const ImgBox = styled.div`
  display: flex;
  gap: 15px;
  margin: 15px 0;
  img {
    border-radius: 5px;
  }
`;
const TextContent = styled.div`
  padding: 10px;
  color: #fff;
  line-height: 1.5;
  word-break: keep-all;
  border-radius: 5px;
  background-color: #87ceeb;
`;

const BtnBox = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 10px;
  button {
    display: flex;
    align-items: center;
    gap: 5px;
    padding: 0;
    font-size: 1.25rem;
    background: none;
  }
  strong {
    font-weight: bold;
    font-size: 0.875rem;
  }
`;

export default function HomeListItem({ post }) {
  const { chat: toggleChat, setChat: setToggleChat, handleToggle } = useContext(HomeContext);
  const [toggleLike, setToggleLike] = useState(false);
  const {
    id,
    post_contents,
    post_created_at,
    post_imgs,
    user_id,
    users: { user_nick_name }
  } = post;
  console.log(post);
  const formattedTime = format(new Date(post_created_at), 'ko');

  return (
    <StyledHomeListItem>
      <HomeUserProfile time={formattedTime} userNickName={user_nick_name} userId={user_id} />
      <ImgBox>{post_imgs ?? post_imgs.map((imgs) => <img src={imgs} />)}</ImgBox>
      <TextContent>{post_contents}</TextContent>
      <BtnBox>
        <button type="button" onClick={handleToggle(setToggleChat, toggleChat)}>
          <IoChatbubbleOutline />
          <strong>10</strong>
        </button>
        <button type="button" onClick={handleToggle(setToggleLike, toggleLike)}>
          {toggleLike ? <AiFillLike /> : <AiOutlineLike />}
          <strong>0</strong>
        </button>
      </BtnBox>
    </StyledHomeListItem>
  );
}
