import { useState, useRef } from 'react';
import styled from 'styled-components';
import myprofile from '../assets/myprofile.png';
import profileupdate from '../assets/profileupdate.png';
import Pencil from '../assets/Pencil.png';
import hart from '../assets/hart.png';
import history from '../assets/history.png';
// users에서 user_nick_name
// posts에서 id, post_contents
//likes에서 likes_count
const Container = styled.form`
  width: 800px;
  height: 800px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Section = styled.div`
  margin-bottom: 20px;
`;

const ProfileImage = styled.img`
  width: 180px;
  height: 180px;
  border-radius: 50%;
  margin-bottom: 20px;
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
  border-radius: 50%;
  margin-top: 10px;
`;

const Nickname = styled.input`
  height: 50px;
  width: 190px;
  border: none;
  padding: 0;
  font-size: 25px;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 100%;
`;

const Divider = styled.hr`
  width: 800px;
  border: none;
  border-top: 1px solid #ccc;
  margin: 10px 0;
`;

const PencilIcon = styled.img`
  width: 24px;
  height: 24px;
  cursor: pointer;
`;

const MyPage = () => {
  const [profileImage, setProfileImage] = useState(myprofile);
  const [nickname, setNickname] = useState(''); // 닉네임
  const [posts, setPosts] = useState([]); // 게시글 목록
  const [likesCount, setLikesCount] = useState(0); // 좋아요 총합
  const nicknameInputRef = useRef(null);
  console.log('Supabase Client:', supabase);
  // 데이터를 가져오는 함수
  useEffect(() => {
    const fetchData = async () => {
      try {
        // 1. `users` 테이블에서 닉네임 가져오기
        const { data: userData, error: userError } = await supabase
          .from('users') // 테이블 이름
          .select('user_nick_name') // 가져올 컬럼
          .single(); // 단일 행 가져오기

        if (userError) throw userError; // 에러 처리
        setNickname(userData.user_nick_name); // 닉네임 설정

        // 2. `posts` 테이블에서 게시글 가져오기
        const { data: postsData, error: postsError } = await supabase
          .from('posts') // 테이블 이름
          .select('id, post_contents'); // 가져올 컬럼

        if (postsError) throw postsError; // 에러 처리
        setPosts(postsData); // 게시글 목록 설정

        // 3. `likes` 테이블에서 좋아요 수 가져오기
        const { data: likesData, error: likesError } = await supabase
          .from('likes') // 테이블 이름
          .select('likes_count'); // 가져올 컬럼

        if (likesError) throw likesError; // 에러 처리
        const totalLikes = likesData.reduce((sum, like) => sum + like.likes_count, 0); // 좋아요 총합 계산
        setLikesCount(totalLikes); // 좋아요 수 설정
      } catch (error) {
        console.error('Error fetching data:', error); // 에러 콘솔 출력
      }
    };

    fetchData(); // 함수 실행
  }, []); // 컴포넌트가 처음 렌더링될 때 실행

  // 프로필 이미지 업로드
  const handleProfileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
    }
  };

  // 닉네임 업데이트
  const updateNickname = (e) => {
    e.preventDefault();
    setNickname(e.target.value);
  };

  // 닉네임 입력 필드에 포커스 설정
  const focusNicknameInput = () => {
    if (nicknameInputRef.current) {
      nicknameInputRef.current.focus(); // 닉네임 입력 필드에 포커스
    }
  };

  return (
    <>
      <Container>
        <Section>
          <ProfileImage src={profileImage || profileupdate} alt="Profile" />
          <FileInput id="file-upload" type="file" accept="image/*" onChange={handleProfileChange} />
          <FileInputLabel htmlFor="file-upload" />
        </Section>

        <Section>
          <Row>
            <h2>Nickname:</h2>
            <Nickname
              ref={nicknameInputRef}
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              placeholder="Enter your nickname"
            />
            <PencilIcon src={Pencil} alt="Edit" onClick={focusNicknameInput} />
          </Row>
          <button onClick={handleNicknameChange}>Update Nickname</button>
          <Divider />
        </Section>

        <Section>
          <h2>Posts</h2>
          {posts.map((post) => (
            <div key={post.id}>
              <p>Post ID: {post.id}</p>
              <p>Content: {post.post_contents}</p>
            </div>
          ))}
          <Divider />
        </Section>

        <Section>
          <h2>Total Likes: {likeCount}</h2>
          <img src={hart} alt="Likes" />
          <img src={history} alt="History" />
        </Section>
      </Container>
    </>
  );
};

export default MyPage;
