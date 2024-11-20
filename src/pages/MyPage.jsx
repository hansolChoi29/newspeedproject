import { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import myprofile from '../assets/myprofile.png';
import profileupdate from '../assets/profileupdate.png';
import Pencil from '../assets/Pencil.png';
import hart from '../assets/hart.png';
import { supabase } from '../supabase/supabase';
import history from '../assets/history.png';
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';

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
  left: 56%;
  bottom: 70%;
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
  const [inputNickname, setInputNickname] = useState('');
  const [postNickname, setPostNickname] = useState('');

  const nicknameInputRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const {
          data: { session },
          error: sessionError
        } = await supabase.auth.getSession();

        if (sessionError) throw sessionError;

        const user = session?.user;
        if (!user) throw new Error('User is not logged in');

        const { data: userData, error: userError } = await supabase
          .from('users')
          .select('user_profile_image, user_nick_name')
          .eq('id', user.id)
          .single();

        if (userError) throw userError;

        let profileImgUrl = userData.user_profile_image;
        try {
          profileImgUrl = JSON.parse(userData.user_profile_image).publicUrl;
        } catch (parseError) {
          console.warn('Profile image is not JSON, using raw URL.');
        }

        setProfileImage(profileImgUrl || myprofile);
        setNickname(userData.user_nick_name || '닉네임 없음');
        setPostNickname(userData.user_nick_name || '닉네임 없음');

        const { data: postsData, error: postsError } = await supabase
          .from('posts')
          .select('post_contents')
          .eq('user_id', user.id);

        if (postsError) throw postsError;
        setPosts(postsData || []);

        const { data: likesData, error: likesError } = await supabase
          .from('likes')
          .select('likes_count')
          .eq('user_id', user.id);

        if (likesError) throw likesError;

        const totalLikes = likesData.reduce((sum, like) => sum + like.likes_count, 0);
        setTotalLikes(totalLikes);
      } catch (err) {
        console.error('Error in fetchData:', err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleNicknameSave = async () => {
    try {
      const {
        data: { session }
      } = await supabase.auth.getSession();

      const user = session?.user;
      if (!user) throw new Error('User is not logged in.');

      const { error } = await supabase.from('users').update({ user_nick_name: nickname }).eq('id', user.id);
      if (!nickname) {
        toast('닉네임을 입력해주세요!');
        return;
      }

      if (error) throw error;
      setPostNickname(nickname);

      setIsEditing(false);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleProfileImageChange = async (e) => {
    const file = e.target.files[0];

    if (!file) {
      toast('파일을 선택해주세요.');
      return;
    }

    try {
      const {
        data: { session }
      } = await supabase.auth.getSession();
      const user = session?.user;
      if (!user) throw new Error('User is not logged in.');

      const uniqueFileName = `${user.id}_${Date.now()}`;
      const fileExtension = file.name.split('.').pop();
      const finalFileName = `${uniqueFileName}.${fileExtension}`;

      const { data: uploadedFile, error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(finalFileName, file);

      if (uploadError) {
        console.error('Upload Error:', uploadError.message);
        toast(`파일 업로드에 실패했습니다: ${uploadError.message}`);
        return;
      }

      const { data: publicUrl, error: urlError } = supabase.storage.from('avatars').getPublicUrl(uploadedFile.path);

      if (urlError) {
        console.error('URL Error:', urlError.message);
        toast('Public URL 생성에 실패했습니다.');
        return;
      }

      const { error: updateError } = await supabase
        .from('users')
        .update({
          user_profile_image: publicUrl.publicUrl
        })
        .eq('id', user.id);

      if (updateError) {
        console.error('DB Update Error:', updateError.message);
        toast('프로필 이미지 업데이트에 실패했습니다.');
        return;
      }

      // 상태 업데이트
      setProfileImage(publicUrl.publicUrl);
      toast(`프로필 이미지가 성공적으로 저장되었습니다: ${file.name}`);
    } catch (err) {
      console.error('Error in handleProfileImageChange:', err.message);
      toast('프로필 이미지 업로드 중 오류가 발생했습니다.');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleNicknameSave();
  };
  const focusNicknameInput = () => {
    setIsEditing(true);
    if (nicknameInputRef.current) nicknameInputRef.current.focus();
  };

  return (
    <>
      <ToastContainer />
      <Container onSubmit={handleSubmit}>
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
              <PostAuthor>{postNickname}</PostAuthor>
              <div>{post.post_contents}</div>
            </Post>
          ))}
        </PostList>
      </Container>
    </>
  );
};

export default MyPage;
