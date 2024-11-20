import { supabase } from '../../supabase/supabase';
import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { IoChatbubbleOutline } from 'react-icons/io5';
import { AiOutlineLike, AiFillLike } from 'react-icons/ai';
import HomeUserProfile from './HomeUserProfile';
import { HomeContext } from '../../context/HomeProvider';
import { IoMdMore } from 'react-icons/io';

const StyledHomeListItem = styled.div`
  margin-bottom: 50px;
`;
const HomeListItemTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
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
  gap: 15px;
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

const ProfileToggle = styled.div`
  position: relative;
  margin-left: auto;
  > button {
    padding: 0;
    border: none;
    font-size: 1.25rem;
    background: none;
  }
`;

const ToggleButtonList = styled.div`
  position: absolute;
  right: 0;
  display: flex;
  flex-direction: column;
  width: 60px;
  text-align: center;
  border: 1px solid #999;
  background: #fff;
  a,
  button {
    padding: 10px 0;
    font-size: 0.875rem;
    transition: 0.2s;
    background: none;
    &:hover {
      background: rgba(0, 0, 0, 0.05);
    }
  }
`;

export default function HomeListItem({ post, user }) {
  const { setData, setChat, setPostId, chatToggle, setChatToggle, commentsData } = useContext(HomeContext);
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
  const [isVisible, setIsVisible] = useState(false);
  const [commentList, setCommentList] = useState(comments);
  const [commentCount, setCommentCount] = useState(comments.length);

  useEffect(() => {
    setCommentList(comments);
    setCommentCount(comments.length);
  }, [commentsData]);

  // 좋아요 상태 확인
  useEffect(() => {
    const currentUserLike = likes.find((like) => like.user_id === user.id && like.post_id === id);
    if (currentUserLike) {
      setToggleLike(true); // 이미 좋아요를 눌렀다면 true
    } else {
      setToggleLike(false); // 아니면 false
    }
  }, [likes, user, id]);

  const handleClickToggleComment = () => {
    setPostId(id);
    setChatToggle(!chatToggle);
    setChat(commentList);
  };

  const handleLikeClick = async () => {
    const currentLike = likes.find((like) => like.user_id === user.id && like.post_id === id);
    if (currentLike) {
      // 좋아요 취소
      const { error } = await supabase.from('likes').delete().eq('user_id', user.id).eq('post_id', id);

      if (error) {
        console.error(error);
      } else {
        // 좋아요 취소 후 likes_count 업데이트
        const { error: updateError } = await supabase
          .from('posts')
          .update({ likes_count: likesCount - 1 })
          .eq('id', id);

        if (updateError) {
          console.error(updateError);
        }

        // 상태 업데이트
        setLikesCount(likesCount - 1);
        setToggleLike(false); // 좋아요 취소했으므로 false
      }
    } else {
      // 좋아요 추가
      const { error } = await supabase.from('likes').insert([{ user_id: user.id, post_id: id }]);

      if (error) {
        console.error(error);
      } else {
        // 좋아요 추가 후 likes_count 업데이트
        const { error: updateError } = await supabase
          .from('posts')
          .update({ likes_count: likesCount + 1 })
          .eq('id', id);

        if (updateError) {
          console.error(updateError);
        }

        // 상태 업데이트
        setLikesCount(likesCount + 1);
        setToggleLike(true); // 좋아요를 추가했으므로 true
      }
    }
  };

  const deletePost = async (postId) => {
    const { error } = await supabase.from('posts').delete().eq('id', postId);
    if (error) {
      console.error(error);
    } else {
      setData((prevData) => prevData.filter((post) => post.id !== postId));
    }
  };

  const handleClickDelete = () => {
    deletePost(id);
  };

  return (
    <StyledHomeListItem>
      <HomeListItemTitle>
        <HomeUserProfile time={post_created_at} userNickName={user_nick_name} userId={user_id} />
        <ProfileToggle>
          <button type="button" onClick={() => setIsVisible(!isVisible)}>
            <IoMdMore />
          </button>
          {isVisible && (
            <ToggleButtonList>
              <Link to={`/post/${id}`} state={{ id }}>
                수정
              </Link>
              <button type="button" onClick={handleClickDelete}>
                삭제
              </button>
            </ToggleButtonList>
          )}
        </ProfileToggle>
      </HomeListItemTitle>
      <ImgBox>
        {post_imgs && post_imgs.length > 0 && post_imgs.map((img, index) => <img key={index} src={img} />)}
      </ImgBox>
      {post_contents.length === 0 ? null : <TextContent>{post_contents}</TextContent>}
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
