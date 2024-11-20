import styled from 'styled-components';
import LogoFontStyle from './FontStyle';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { supabase } from '../supabase/supabase';
import { useNavigate } from 'react-router-dom';

const HeaderStyle = styled.div`
  position: fixed;
  top: 0;
  width: 100%; /* 가로 너비 설정 */
  height: 50px;
  
  background-color: #ffffff; /* (선택) 배경색 설정 */
  z-index: 10px;
  a {
    text-decoration: none;
  }
  & a:nth-child(1) ::after {
    content: '🏝️';
    display: inline-block;
    width: 32px;
    height: 32px;
    vertical-align: middle;
  }
  p {
    display: flex;
    align-items: center;
  }
  button {
    width: 70px;
    border: 1px solid none;
    background: none;
  }
`;

const HeaderInner = styled.div`
  display: flex; /* Flexbox 사용 */
  justify-content: space-between; /* 양쪽 끝 정렬 */
  align-items: center; /* 수직 가운데 정렬 */
  max-width: 800px;
  width: 100%;
  margin: 0 auto;
`

const MyPageStyle = styled.div`
  display: flex;
  flex-direction: row;
`;


const ProfileImage = styled.div`
  img {
    width: 50px;
    height: 50px;
    object-fit: contain;
  }
`

function Header() {

  const [userProfile, setUserProfile] = useState({
    nickname: '',
    profileImage: ''
  });
  
  console.log(userProfile)

  const [user, setUser] = useState();
  
  //테스트용 id
  // const 우석핑 = '9e351071-01b9-4827-b797-6685d3348072';
  
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const {
          data: { user }, // 여기 유저안의 아이디
          error
        } = await supabase.auth.getUser(); // 로그인이 되어 있는 유저
        if (error) {
          console.error('Error fetching user:', error);
          return;
        }
        console.log(user)
        const { data: publicUrlData, error: publicUrlError } = supabase.storage.from('avatars').getPublicUrl('profile.png');
        if (publicUrlError) {
          console.error('Error fetching public URL:', publicUrlError);
        } else {
          console.log('Public URL Data:', publicUrlData);
        }
        const imgUrl = publicUrlData.publicUrl;
        const profileImageUrl = userProfile.profileImage || imgUrl || '';
        const { data, error: usersError } = await supabase
          .from('users')
          .select('user_nick_name, user_profile_image')
          .eq('id', user.id) // 실제 유저의 데이터 넣기    ex)유저.a.b.c.id
          .single();
        if (usersError) {
          console.error('Error fetching users:', usersError);
          return;
        }
        console.log('data', data);
        setUserProfile({ nickname: data.user_nick_name || 'Guest', profileImage: data.user_profile_image || profileImageUrl }); // 기본값으로 'Guest' 설정
      } catch (error) {
        console.log(error);
      }
    };
    fetchUserData();
  }, [supabase]);

  const navigate = useNavigate();

  async function signOut() {
    const { error } = await supabase.auth.signOut(); // Supabase 로그아웃 호출
    if (error) {
      console.error('Error signing out:', error);
      return;
    }
    console.log('로그아웃 성공!');
    setUser(null);
    navigate('/');
    return;
  }

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      const currentPath = location.pathname.toLowerCase(); // 현재 경로
      const allowedPaths = ['/findpassword', '/join', '/']; // 비로그인 상태에서 허용된 경로 ('/'가 로그인 페이지)

      if (!data?.session) {
        // 비로그인 상태
        if (!allowedPaths.includes(currentPath)) {
          // 보호된 경로 접근 시 로그인 페이지로 리다이렉트
          if (currentPath !== '/') {
            navigate('/', { replace: true }); // 로그인 페이지로 이동
          }
        }
      } else {
        // 로그인 상태
        if (currentPath === '/' || currentPath === '/join' || currentPath === '/findpassword') {
          // 로그인 상태에서 로그인 관련 페이지 접근 시 홈으로 이동
          navigate('/home', { replace: true }); // 홈으로 리다이렉트
        }
      }
    };

    checkSession();
  }, [navigate, location.pathname]);

  return (
    <HeaderStyle>
      <HeaderInner>
      <Link to="/home">
        <LogoFontStyle>Voir le chemin</LogoFontStyle>
      </Link>

      <MyPageStyle>
        <p>{userProfile.nickname}님 안녕하세요</p>
        <button onClick={signOut}>로그아웃</button>
        <Link to="/mypage">
          <ProfileImage>
            <img src={userProfile.profileImage} alt="프로필사진" />
          </ProfileImage>
        </Link>
      </MyPageStyle>
      </HeaderInner>
    </HeaderStyle>
  );
}


export default Header;
