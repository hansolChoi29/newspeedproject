import { Link } from 'react-router-dom';
import LogoFontStyle from './FontStyle';
import { useEffect, useState } from 'react';
import { supabase } from '../supabase/supabase';
import styled from 'styled-components';

const HeaderStyle = styled.div`
  position: fixed;
  top: 0px;
`;

function Header() {
  const [userProfile, setUserProfile] = useState({
    nickname: '',
    profileImage: ''
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {

        const {
          data: { user }, // 여기 유저안의 아이디
          error
        } = await supabase.auth.getUser();   // 로그인이 되어 있는 유저
        if (error) {
          console.error('Error fetching user:', error);
          return;
        }
        console.log(data, user);
        
        const { data, error: usersError } = await supabase
          .from('users')
          .select(['user_nick_name', 'user_profile_image'])
          .eq('id', user.id) // 실제 유저의 데이터 넣기    ex)유저.a.b.c.id
          .single();
        if (usersError) {
          console.error('Error fetching users:', usersError);
          return;
        }
        console.log(data)
        setUserProfile({ nickname: data.user_nick_name || 'Guest', profileImage: data.user_profile_image || '' }); // 기본값으로 'Guest' 설정
      } catch (error) {
        console.log(error)
      }
    };
    fetchUserData();
  }, [supabase]);

  return (
    <HeaderStyle>
      <Link to="/Home">
        <LogoFontStyle>Voir le chemin🌴</LogoFontStyle>
      </Link>

      <p>{userProfile.nickname}님 안녕하세요</p>
      <Link to="/Mypage">
        <p>
          <img src={userProfile.profileImage} alt="프로필사진" />
        </p>
      </Link>
    </HeaderStyle>
  );
}

export default Header;
