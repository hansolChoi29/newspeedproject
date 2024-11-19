import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { IoChatbubbleOutline } from 'react-icons/io5';
import { AiOutlineLike, AiFillLike } from 'react-icons/ai';
import HomeUserProfile from './HomeUserProfile';
import { HomeContext } from '../../context/HomeProvider';
import HomeCommentList from './HomeCommentList';

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
  const { setChat, setPostId, chatToggle, setChatToggle } = useContext(HomeContext);
  const [toggleLike, setToggleLike] = useState(false);
  const {
    id,
    post_contents,
    post_created_at,
    post_imgs,
    user_id,
    users: { user_nick_name }
  } = post;
  const handleClickToggleComment = () => {
    setPostId(id);
    setChatToggle(!chatToggle);
    setChat(post.comments);
  };
  const commentCount = post.comments ? post.comments.length : 0;
  console.log(post_imgs);

  return (
    <StyledHomeListItem>
      <HomeUserProfile time={post_created_at} userNickName={user_nick_name} userId={user_id} />
      <ImgBox>{post_imgs ?? post_imgs.map((img, index) => <img key={index} src={img} />)}</ImgBox>
      <TextContent>{post_contents}</TextContent>
      <BtnBox>
        <button type="button" onClick={handleClickToggleComment}>
          <IoChatbubbleOutline />
          <strong>{commentCount}</strong>
        </button>
        <button type="button" onClick={() => setToggleLike(!toggleLike)}>
          {toggleLike ? <AiFillLike /> : <AiOutlineLike />}
          <strong>0</strong>
        </button>
      </BtnBox>
    </StyledHomeListItem>
  );
}
