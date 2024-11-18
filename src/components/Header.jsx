import { Link } from 'react-router-dom';
import LogoFontStyle from './FontStyle';
import { useEffect, useState } from 'react';
import { SupabaseAuthClient } from '@supabase/supabase-js/dist/module/lib/SupabaseAuthClient';

function Header() {
  const[userNickname, setUserNickname] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      const {
        data: { user },
        error
      } = await SupabaseAuthClient.auth.getUser();
      if (error) {
        console.error('Error fetching user:', error);
        return;
      }
      // 예: 'users' 테이블에서 사용자 이름을 가져오는 경우
      const { data: userNickname, error: usersError } = await supabase
        .from('users')
        .select('user_nick_name')
        .eq('id', data.id)
        .single();
      if (usersError) {
        console.error('Error fetching users:', usersError);
        return;
      }
      setUserNickname(userNickname.user_nick_name || 'Guest'); // 기본값으로 'Guest' 설정
    };
    fetchUserData();
  }, []);

  return (
    <>
      <Link to="/Home">
        <LogoFontStyle>Voir le chemin🌴</LogoFontStyle>
      </Link>

      <p>`${userNickname}님 안녕하세요`</p>
      <Link to="/Mypage">
        <p>사람모양이모지</p>
      </Link>
    </>
  );
}

export default Header;
