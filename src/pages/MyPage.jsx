import { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import myprofile from '../assets/myprofile.png';
import profileupdate from '../assets/profileupdate.png';
import Pencil from '../assets/Pencil.png';
import hart from '../assets/hart.png';
import { supabase } from '../supabase/supabase';
import history from '../assets/history.png';
// 스타일 정의
const Container = styled.form`
  width: 800px;
  height: 800px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: Arial, sans-serif;
`;

const Section = styled.div`
  margin-bottom: 20px;
`;

const ProfileImage = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  margin-bottom: 10px;
`;

const FileInput = styled.input`
  display: none;
`;

const FileInputLabel = styled.label`
  display: inline-block;
  width: 50px;
  height: 50px;
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
  margin: 0;
`;

const PencilIcon = styled.img`
  width: 20px;
  height: 20px;
  cursor: pointer;
`;

const Divider = styled.hr`
  width: 100%;
  margin: 30px 0;
  border: none;
  border-top: 1px solid #ccc;
`;

const LikesSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-bottom: 40px;
  font-size: 18px;

  & span {
    font-size: 24px;
    color: red;
    font-weight: bold;
  }
`;

const PostList = styled.div`
  margin-top: 30px;
  width: 100%;
  font-size: 20px;
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
// MyPage 컴포넌트
const MyPage = () => {
  const [profileImage, setProfileImage] = useState(myprofile);
  const [nickname, setNickname] = useState(''); // 닉네임
  const [posts, setPosts] = useState([]); // 게시글 목록
  const [likesCount, setLikesCount] = useState(0); // 좋아요 총합
  const nicknameInputRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      // 유효성검사해서 로그인한 건지 확인해줘야 함. 코드생성.
      try {
        // 1. `users` 테이블에서 닉네임 가져오기
        const { data: userData, error: userError } = await supabase.from('users').select('user_nick_name').single();

        if (userError) throw userError;
        setNickname(userData.user_nick_name); // 닉네임 설정

        // 2. `posts` 테이블에서 게시글 가져오기
        const { data: postsData, error: postsError } = await supabase.from('posts').select('id, post_contents');

        if (postsError) throw postsError;
        setPosts(postsData); // 게시글 목록 설정

        // 3. `likes` 테이블에서 좋아요 수 가져오기
        const { data: likesData, error: likesError } = await supabase.from('likes').select('likes_count');
        if (likesError) throw likesError;
        const totalLikes = likesData.reduce((sum, like) => sum + like.likes_count, 0);
        setLikesCount(totalLikes); // 좋아요 수 설정
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleProfileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
    }
  };

  const focusNicknameInput = () => {
    if (nicknameInputRef.current) {
      nicknameInputRef.current.focus();
    }
  };

  return (
    <Container>
      <Section>
        <ProfileImage src={profileImage || profileupdate} alt="Profile" />
        <FileInput id="file-upload" type="file" accept="image/*" onChange={handleProfileChange} />
        <FileInputLabel htmlFor="file-upload" />
        <NicknameContainer>
          <Nickname>닉네임: {nickname}</Nickname>
          <PencilIcon src={Pencil} alt="Edit" onClick={focusNicknameInput} />
        </NicknameContainer>
        <Divider />
      </Section>
      <LikesSection>
        <History src={hart} alt="Likes" width="30px" />
        <h2>
          <span>{likesCount}</span>
        </h2>
      </LikesSection>

      <PostList>
        <p>
          <History src={history} alt="history" /> 내가 쓴 게시글
        </p>
        {posts.slice(0, 3).map((post) => (
          <Post key={post.id}>
            <PostAuthor> {nickname}</PostAuthor>
            <div>{post.post_contents}</div>
          </Post>
        ))}
      </PostList>
    </Container>
  );
};

export default MyPage;
