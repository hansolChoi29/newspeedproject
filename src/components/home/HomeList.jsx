import React, { useContext } from 'react';
import { HomeContext } from '../../context/HomeProvider';
import HomeListItem from './HomeListItem';
import HomeCommentList from './HomeCommentList';
import styled from 'styled-components';
import pencilIcon from '../../assets/write-icon.svg';
import { Link } from 'react-router-dom';

const StyledHomeList = styled.div``;
const LinkToPost = styled(Link)`
  position: fixed;
  right: 20%;
  bottom: 100px;
  width: 60px;
  height: 60px;
  padding-top: 5px;
  box-sizing: border-box;
  cursor: pointer;
  text-align: center;
  z-index: 1;
  border: 1px solid #32cd32;
  border-radius: 50%;
  img {
    width: 50%;
  }
  span {
    color: #333;
    font-size: 0.75rem;
    white-space: nowrap;
  }
`;

export default function HomeList() {
  const { chatToggle, data, postId } = useContext(HomeContext);

  return (
    <StyledHomeList>
      {data.length === 0 ? <p>🌴글이 없습니다</p> : data.map((post) => <HomeListItem key={post.id} post={post} />)}
      {chatToggle && <HomeCommentList postId={postId} />}
      <LinkToPost to="/post">
        <img src={pencilIcon} alt="" />
        <span>작성하기</span>
      </LinkToPost>
    </StyledHomeList>
  );
}
