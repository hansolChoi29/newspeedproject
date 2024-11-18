import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { IoChatbubbleOutline } from 'react-icons/io5';
import { AiOutlineLike, AiFillLike } from 'react-icons/ai';
import HomeUserProfile from './HomeUserProfile';
import { HomeContext } from '../context/HomeProvider';

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

export default function HomeListItem() {
  const { chat: toggleChat, setChat: setToggleChat, handleToggle } = useContext(HomeContext);
  const [toggleLike, setToggleLike] = useState(false);

  return (
    <>
      <HomeUserProfile />
      <ImgBox>
        <div style={{ width: '100px', height: '100px', background: 'gray' }} />
        <div style={{ width: '100px', height: '100px', background: 'gray' }} />
        <div style={{ width: '100px', height: '100px', background: 'gray' }} />
      </ImgBox>
      <TextContent>
        나 여기 가봤는데 너무 호화스럽고 좋더라구 사장님도 너무 친절했고 시설도 너무 깨끗했어! 가격에 비해 이정도면 정말
        괜찮은 것 같아 주변에 예쁜 바다가 보이는 게 딱 취저야.
      </TextContent>
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
    </>
  );
}
