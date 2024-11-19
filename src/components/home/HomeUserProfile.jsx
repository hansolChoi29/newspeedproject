import React, { useContext } from 'react';
import { supabase } from '../../supabase/supabase';
import styled from 'styled-components';
import { format, register } from 'timeago.js';
import koLocale from 'timeago.js/lib/lang/ko';

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

export default function HomeUserProfile({ time, userNickName, userId }) {
  const { data } = useContext(HomeContext);
  const formattedTime = format(new Date(time), 'ko');
  const user = data.find((userData) => userData.users.id === userId);
  const profileImage = user?.users.user_profile_image || null;

  const { data: publicUrlData } = supabase.storage.from('avatars').getPublicUrl('profile.png');
  const imgUrl = publicUrlData.publicUrl;
  const profileImageUrl = profileImage ? imgUrl : publicUrlData?.publicUrl || '';

  return (
    <ProfileWrapper>
      <ProfileImg>
        <img src={profileImageUrl} alt="Profile" />
      </ProfileImg>
      <ProfileName>
        {userNickName} <span>{formattedTime}</span>
      </ProfileName>
    </ProfileWrapper>
  );
}
