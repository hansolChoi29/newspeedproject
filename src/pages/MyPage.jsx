import { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import myprofile from '../assets/myprofile.png';
import profileupdate from '../assets/profileupdate.png';
import Pencil from '../assets/Pencil.png';
import hart from '../assets/hart.png';
import { supabase } from '../supabase/supabase';
import history from '../assets/history.png';

const Container = styled.form`
  width: 800px;
  height: 900px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 100px;
  align-items: center;
  font-family: Arial, sans-serif;
`;

const Section = styled.div`
  margin-bottom: 20px;
  display: contents;
`;

const ProfileImage = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
`;

const FileInput = styled.input`
  display: none;
`;

const FileInputLabel = styled.img`
  width: 30px;
  height: 30px;
  background-image: url(${profileupdate});
  background-size: cover;
  background-position: center;
  cursor: pointer;
  margin-top: 10px;
`;

const NicknameContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const Nickname = styled.h2`
  font-size: 24px;
  margin: 10px;
`;

const PencilIcon = styled.img`
  width: 20px;
  height: 20px;
  cursor: pointer;
`;

const Divider = styled.hr`
  width: 800px;
  margin: 30px 0;
  border: none;
  border-top: 1px solid #ccc;
`;

const LikesSection = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  margin-left: auto;
  & span {
    font-size: 24px;
    color: red;
    font-weight: bold;
  }
`;

const PostList = styled.div`
  padding: 20px;
  font-size: 20px;
  line-height: 1.8;
  width: 100%;
`;

const Post = styled.div`
  background-color: #e0f7fa;
  margin-bottom: 20px;
  padding: 15px;
  border-radius: 8px;
  text-align: left;
`;

const PostAuthor = styled.div`
  font-weight: bold;
  margin-bottom: 5px;
`;

const History = styled.img`
  width: 30px;
`;

const StyledText = styled.div`
  font-size: 16px;
  color: #333;
  margin-bottom: 10px;
  display: flex;
  margin-right: auto;
`;

const MyPage = () => {
  const [profileImage, setPofileImage] = useState(myprofile);
  const [nickname, setNickname] = useState('');
  const [posts, setPosts] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [totalLikes, setTotalLikes] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const nicknameInputRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // 로그인 상태 확인 (주석 처리 유지)
        // const {
        //   data: { session },
        //   error: sessionError,
        // } = await supabase.auth.getSession();
        // if (sessionError) throw sessionError;

        // const user = session?.user;
        // if (!user) throw new Error('User is not logged in');

        // 테스트용 고정 user_id

        // 1. 유저 데이터 가져오기
        const {
          data: { session },
          error: sessionError
        } = await supabase.auth.getSession();

        if (sessionError) {
          console.error('Error fetching session:', sessionError.message);
          throw sessionError;
        }

        const user = session?.user; // 로그인된 사용자 정보 가져오기
        if (!user) {
          console.warn('No user logged in.');
          setNickname('닉네임 없음');
          setPofileImage(myprofile);
          return;
        }

        console.log('Logged-in User:', user);

        // 1. 유저 데이터 가져오기
        const { data: userData, error: userError } = await supabase
          .from('users')
          .select('user_pofile_image, user_nick_name') // 정확한 컬럼 이름 확인 필요
          .eq('id', user.id)
          .single();

        console.log('Fetched User Data:', userData);
        if (userError) {
          console.error('Error fetching user data:', userError.message);
          throw userError;
        }

        if (userData) {
          const pofileImage = userData.user_pofile_image || myprofile; // 기본값 처리
          const nickname = userData.user_nick_name || '닉네임 없음'; // 기본값 처리

          setPofileImage(pofileImage); // 상태 업데이트
          setNickname(nickname); // 상태 업데이트
        } else {
          console.warn('No user data found for the logged-in user.');
          setNickname('닉네임 없음');
          setPofileImage(myprofile);
        }

        // 2. 게시글 데이터 가져오기
        const { data: postsData, error: postsError } = await supabase
          .from('posts')
          .select('post_contents')
          .eq('user_id', user.id);
        if (postsError) throw postsError;

        console.log('Fetched Posts Data:', postsData);

        // 3. 좋아요 데이터 가져오기
        const { data: likesData, error: likesError } = await supabase
          .from('likes')
          .select('likes_count')
          .eq('user_id', user.id);
        if (likesError) throw likesError;

        console.log('Fetched Likes Data:', likesData);

        const totalLikes = likesData.reduce((sum, like) => sum + like.likes_count, 0);

        // 상태 업데이트
        setPosts(postsData || []); // 게시글 상태 업데이트
        setTotalLikes(totalLikes); // 좋아요 총합 업데이트
      } catch (err) {
        console.error('Error in fetchData:', err.message);
        setError(err.message); // 에러 상태 업데이트
      } finally {
        setLoading(false); // 로딩 상태 해제
      }
    };

    fetchData();
  }, []);

  const handleNicknameSave = async () => {
    try {
      const user = supabase.auth.user();
      if (!user) throw new Error('User is not logged in');

      const { error } = await supabase.from('users').update({ user_nick_name: nickname }).eq('id', user.id);
      if (error) throw error;

      setIsEditing(false);
      alert('닉네임이 저장되었습니다.');
    } catch (err) {
      setError(err.message);
    }
  };

  const handlePofileImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const user = supabase.auth.user();
      if (!user) throw new Error('User is not logged in');

      const fileName = `${user.id}_${Date.now()}`;
      const { data, error: uploadError } = await supabase.storage.from('avatars').upload(fileName, file);

      if (uploadError) throw uploadError;

      const { publicURL, error: urlError } = supabase.storage.from('avatars').getPublicUrl(data.path);

      if (urlError) throw urlError;

      const { error: updateError } = await supabase
        .from('users')
        .update({ user_pofile_image: publicURL })
        .eq('id', user.id);
      if (updateError) throw updateError;

      setPofileImage(publicURL); // 수정된 상태 업데이트
      alert('프로필 이미지가 저장되었습니다.');
    } catch (err) {
      setError(err.message);
    }
  };

  const focusNicknameInput = () => {
    setIsEditing(true);
    if (nicknameInputRef.current) nicknameInputRef.current.focus();
  };

  return (
    <Container>
      <Section>
        <ProfileImage src={profileImage} alt="Profile" />
        <FileInputLabel as="label" htmlFor="file-upload" />
        <FileInput id="file-upload" type="file" accept="image/*" onChange={handlePofileImageChange} />
        <NicknameContainer>
          {isEditing ? (
            <input
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              ref={nicknameInputRef}
              onBlur={handleNicknameSave}
              onKeyDown={(e) => e.key === 'Enter' && handleNicknameSave()}
              autoFocus
            />
          ) : (
            <Nickname>{nickname || '닉네임 없음'}</Nickname>
          )}
          <PencilIcon src={Pencil} alt="Edit" onClick={focusNicknameInput} />
        </NicknameContainer>
        <Divider />
      </Section>
      <LikesSection>
        <History src={hart} alt="Likes" width="30px" /> 좋아요 수
        <h2>
          <span>{totalLikes}</span>
        </h2>
      </LikesSection>
      <PostList>
        <StyledText>
          <History src={history} alt="history" /> 내가 쓴 게시글
        </StyledText>
        {posts.slice(0, 3).map((post, index) => (
          <Post key={index}>
            <PostAuthor>{nickname}</PostAuthor>
            <div>{post.post_contents}</div>
          </Post>
        ))}
      </PostList>
    </Container>
  );
};

export default MyPage;
