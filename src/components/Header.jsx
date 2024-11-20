import styled from 'styled-components';
import LogoFontStyle from './FontStyle';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { supabase } from '../supabase/supabase';
import { useNavigate } from 'react-router-dom';
import { AiOutlineLogout } from 'react-icons/ai';

const HeaderStyle = styled.div`
  position: fixed;
  top: 0;
  width: 100%; /* 가로 너비 설정 */
  height: 50px;
  padding: 10px 0;

  background-color: #ffffff; /* (선택) 배경색 설정 */
  z-index: 10;
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
    cursor: pointer;
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
`;

const MyPageStyle = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
`;

const ProfileImage = styled.div`
  img {
    width: 50px;
    height: 50px;
    object-fit: cover;
    border-radius: 50%; /* 이미지를 동그랗게 */
    border: 2px solid #ccc; /* 선택: 테두리를 추가 */
  }
`;

const LogoutBtn = styled.button`
  padding: 5px;
  width: auto;
  display: flex;
  align-items: center;
  gap: 5px;
  color: #fff;
  font-size: 14px;
  font-weight: 700;
  border: none;
  background-color: #f4a460 !important;
  border-radius: 5px;
  svg {
    font-size: 20px;
  }
`;
function Header() {
  const [userProfile, setUserProfile] = useState({
    nickname: '',
    profileImage: ''
  });
  const [user, setUser] = useState();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // 현재 로그인된 유저 정보 가져오기
        const {
          data: { user },
          error
        } = await supabase.auth.getUser();
        if (error || !user) {
          console.error('Error fetching user:', error);
          return;
        }
        setUser(user);
        // 프로필 이미지 URL 가져오기
        const { data: publicUrlData, error: publicUrlError } = supabase.storage
          .from('avatars')
          .getPublicUrl('profile.png');
        if (publicUrlError) {
          console.error('Error fetching public URL:', publicUrlError);
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

        setUserProfile({ nickname: data.user_nick_name || 'Guest', profileImage: data.user_profile_image || imgUrl }); // 기본값으로 'Guest' 설정
      } catch (error) {
        console.error('Unexpected error fetching user data:', error);
      }
    };
    fetchUserData();
  }, [userProfile]);

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
          <Link to="/mypage">
            <ProfileImage>
              <img src={userProfile.profileImage} alt="프로필사진" />
            </ProfileImage>
          </Link>
          <LogoutBtn type="button" onClick={signOut}>
            <AiOutlineLogout />
            logout
          </LogoutBtn>
        </MyPageStyle>
      </HeaderInner>
    </HeaderStyle>
  );
}

export default Header;
