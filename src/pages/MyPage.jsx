import { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import myprofile from '../assets/myprofile.png';
import profileupdate from '../assets/profileupdate.png';
import Pencil from '../assets/Pencil.png';
import hart from '../assets/hart.png';
import { supabase } from '../supabase/supabase';
import history from '../assets/history.png';

const Container = styled.form`
  width: 600px;
  height: 700px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  display: flex;
  flex-direction: column;
  margin-top: 100px;
  align-items: center;
  font-family: Arial, sans-serif;
  border-radius: 10px;
`;

const Section = styled.div`
  margin-bottom: 20px;
  display: contents;
`;

const ProfileImage = styled.img`
  width: 130px;
  height: 130px;
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
  position: absolute;
  left: 52%;
  bottom: 72%;
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
  height: 50px;
`;

const Nickname = styled.h2`
  font-size: 20px;
  margin: 0;
`;
const InputNickname = styled.input`
  border-radius: 5px;
  height: 20px;
  padding: 4px;
`;
const PencilIcon = styled.img`
  width: 25px;
  height: 25px;
  cursor: pointer;
  margin: 0;
  padding: 0;
`;

const Divider = styled.hr`
  width: 600px;
  margin: 30px 0;
  border: none;
  border-top: 1px solid #ccc;
`;

const LikesSection = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  margin-left: 400px;

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
  display: flex;
  margin-right: auto;
  font-weight: bold;
`;

const MyPage = () => {
  const [profileImage, setProfileImage] = useState(myprofile);
  const [nickname, setNickname] = useState('');
  const [posts, setPosts] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [totalLikes, setTotalLikes] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const nicknameInputRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      console.log(supabase);

      try {
        setLoading(true);
        setError(null);

        // 로그인 상태 확인 (주석 처리 유지)
        const {
          data: { session },
          error: sessionError
        } = await supabase.auth.getSession();

        if (sessionError) throw sessionError;

        const user = session?.user;
        if (!user) throw new Error('User is not logged in');

        // 1. 유저 데이터 가져오기
        const { data: userData, error: userError } = await supabase
          .from('users')
          .select('user_profile_image, user_nick_name') // 정확한 컬럼 이름 확인 필요
          .eq('id', user.id)
          .single();

        if (userError) throw userError;

        // console.log('Fetched User Data:', userData);
        const profileimgUrl = JSON.parse(userData.user_profile_image);
        setProfileImage(profileimgUrl.publicUrl || myprofile); // 이미지가 없으면 기본 이미지로 설정
        console.log(profileimgUrl.publicUrl);
        setNickname(userData.user_nick_name || '닉네임 없음'); // 닉네임이 없으면 기본값 설정
        // 2. 게시글 데이터 가져오기
        const { data: postsData, error: postsError } = await supabase
          .from('posts')
          .select('post_contents')
          .eq('user_id', user.id);

        if (postsError) throw postsError;
        // 상태 업데이트: 게시글 데이터 설정
        setPosts(postsData);
        // console.log('Fetched Posts Data:', postsData);

        // 3. 좋아요 데이터 가져오기
        const { data: likesData, error: likesError } = await supabase
          .from('likes')
          .select('likes_count')
          .eq('user_id', user.id);

        if (likesError) throw likesError;
        // console.log('Fetched Likes Data:', likesData);

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
      // Supabase 세션 가져오기
      const {
        data: { session }
      } = await supabase.auth.getSession();

      // 세션에서 로그인된 사용자 정보 가져오기
      const user = session?.user;
      if (!user) throw new Error('User is not logged in.'); // 로그인이 안 된 경우 예외 발생

      // 'users' 테이블에 닉네임 업데이트
      const { error } = await supabase
        .from('users') // 'users' 테이블에서
        .update({ user_nick_name: nickname }) // 닉네임 업데이트
        .eq('id', user.id); // 로그인된 사용자의 ID와 일치하는 행 선택

      // 업데이트 중 에러가 발생했을 경우 처리
      if (error) throw error;

      // 수정 상태 종료
      setIsEditing(false);
      alert('닉네임이 저장되었습니다.');
    } catch (err) {
      // 에러 발생 시 에러 메시지 상태로 설정
      setError(err.message);
    }
  };

  const handleProfileImageChange = async (e) => {
    const file = e.target.files[0];

    console.log('Profile Image URL:', profileImage);
    console.log(file);
    if (!file) {
      alert('파일을 선택해주세요.');
      return;
    }

    try {
      // 세션 가져오기
      const {
        data: { session }
      } = await supabase.auth.getSession();
      console.log(session);
      const user = session?.user;
      if (!user) throw new Error('User is not logged in.');

      // 파일 업로드
      const fileName = `${user.id}_${Date.now()}_${file.name}`;
      const { data: uploadedFile, error: uploadError } = await supabase.storage.from('avatars').upload(fileName, file);

      if (uploadError) {
        console.error('Upload Error:', uploadError.message);
        alert('파일 업로드에 실패했습니다.');
        return;
      }

      console.log('Uploaded File Data:', uploadedFile);

      // 👉 여기서 fullFilePath 생성
      const fullFilePath = `${uploadedFile.path}`;
      console.log('Full File Path:', fullFilePath);

      // 👉 Public URL 생성
      const { data: publicUrl, error: urlError } = supabase.storage.from('avatars').getPublicUrl(fullFilePath);
      console.log(publicUrl);
      // 👉 Public URL 검증
      if (urlError) {
        console.error('URL Error:', urlError.message);
        alert('Public URL 생성에 실패했습니다.');
        return;
      } else if (!publicUrl) {
        console.error('Public URL is undefined');
        alert('공개 URL이 생성되지 않았습니다.');
        return;
      }

      console.log('Generated Public URL:', publicUrl);

      // DB 업데이트
      const { error: updateError } = await supabase
        .from('users')
        .update({ user_profile_image: publicUrl })
        .eq('id', user.id);

      if (updateError) {
        console.error('DB Update Error:', updateError.message);
        alert('프로필 이미지 업데이트에 실패했습니다.');
        return;
      }

      // 상태 업데이트
      setProfileImage(publicUrl);
      alert('프로필 이미지가 성공적으로 저장되었습니다.');
    } catch (err) {
      console.error('Error in handleProfileImageChange:', err.message);
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
        <FileInput id="file-upload" type="file" accept="image/*" onChange={handleProfileImageChange} />
        <NicknameContainer>
          {isEditing ? (
            <InputNickname
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
