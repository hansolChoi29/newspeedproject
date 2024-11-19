import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { format, register } from 'timeago.js';
import koLocale from 'timeago.js/lib/lang/ko';
import { IoMdMore } from 'react-icons/io';
import imgLogo from '/src/assets/profile.png';
import { HomeContext } from '../../context/HomeProvider';

register('ko', koLocale);

const ProfileWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  a {
    color: inherit;
  }
`;

const ProfileImg = styled.div`
  img {
    width: 50px;
    height: 50px;
    object-fit: contain;
  }
`;
const ProfileName = styled.p`
  font-weight: 700;
  span {
    color: #777;
    font-size: 0.875rem;
    font-weight: 400;
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
export default function HomeUserProfile({ time, userNickName, userId }) {
  const [isVisible, setIsVisible] = useState(false);
  const { handleToggle } = useContext(HomeContext);
  const formattedTime = format(new Date(time), 'ko');
  const handleClickDelete = () => {};

  return (
    <ProfileWrapper>
      <ProfileImg>
        <img src={imgLogo} />
      </ProfileImg>
      <ProfileName>
        {userNickName} <span>{formattedTime}</span>
      </ProfileName>
      <ProfileToggle>
        <button type="button" onClick={handleToggle(setIsVisible, isVisible)}>
          <IoMdMore />
        </button>
        {isVisible && (
          <ToggleButtonList>
            <Link to="/home/edit" state={{ userId }}>
              수정
            </Link>
            <button type="button" onClick={handleClickDelete}>
              삭제
            </button>
          </ToggleButtonList>
        )}
      </ProfileToggle>
    </ProfileWrapper>
  );
}
