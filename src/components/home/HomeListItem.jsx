import { supabase } from '../../supabase/supabase';
import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { IoChatbubbleOutline } from 'react-icons/io5';
import { AiOutlineLike, AiFillLike } from 'react-icons/ai';
import HomeUserProfile from './HomeUserProfile';
import { HomeContext } from '../../context/HomeProvider';

const StyledHomeListItem = styled.div`
  margin-bottom: 50px;
`;
const ImgBox = styled.div`
  display: flex;
  gap: 15px;
  margin: 15px 0;
  img {
    width: 200px;
    height: 200px;
    object-fit: cover;
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
  const {
    id,
    post_contents,
    post_created_at,
    post_imgs,
    user_id,
    comments,
    users: { user_nick_name },
    likes
  } = post;
  const [toggleLike, setToggleLike] = useState(false);
  const [likesCount, setLikesCount] = useState(likes.length);

  const commentCount = post.comments ? post.comments.length : 0;

  useEffect(() => {
    const currentUserLike = likes.find((like) => like.user_id === user_id && like.post_id === id);
    if (currentUserLike) {
      setToggleLike(true);
    }
  }, [likes, user_id, id]);

  const handleClickToggleComment = () => {
    setPostId(id);
    setChatToggle(!chatToggle);
    setChat(comments);
  };

  const handleLikeClick = async () => {
    setToggleLike(!toggleLike);
    setLikesCount((prevCount) => (toggleLike ? prevCount - 1 : prevCount + 1));

    try {
      const currentLike = likes.find((like) => like.post_id === id && like.user_id === user_id);

      if (toggleLike && currentLike) {
        const { error } = await supabase.from('likes').delete().eq('post_id', id).eq('user_id', user_id);
        if (error) {
          console.error(error);
        }
      } else {
        const { error } = await supabase.from('likes').insert([
          {
            post_id: id,
            user_id,
            likes_count: 1
          }
        ]);
        if (error) {
          console.error(error);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <StyledHomeListItem>
      <HomeUserProfile time={post_created_at} userNickName={user_nick_name} targetId={id} userId={user_id} />
      <ImgBox>
        {post_imgs && post_imgs.length > 0 && post_imgs.map((img, index) => <img key={index} src={img} />)}
      </ImgBox>
      <TextContent>{post_contents}</TextContent>
      <BtnBox>
        <button type="button" onClick={handleClickToggleComment}>
          <IoChatbubbleOutline />
          <strong>{commentCount}</strong>
        </button>
        <button type="button" onClick={handleLikeClick}>
          {toggleLike ? <AiFillLike /> : <AiOutlineLike />}
          <strong>{likesCount}</strong>
        </button>
      </BtnBox>
    </StyledHomeListItem>
  );
}
