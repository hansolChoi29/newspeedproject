import { useEffect, useState } from 'react';
import StyledButton from '../styles/StyledButton';
import StyledSection from '../styles/StyledSection';
import styled from 'styled-components';
import { supabase } from '../supabase/supabase';
import { useNavigate } from 'react-router-dom';

const PostForm = styled.form`
  display: flex;
  gap: 20px;
  align-items: center;
  flex-direction: column;
  width: 100%; // 전체 너비 사용
  max-width: 800px; // PostGroup의 최대 너비 설정
  margin: 50px auto 50px; // 중앙 정렬
`;

const MyProfile = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Myimg = styled.img`
  max-width: 100px;
  border-radius: 50%;
  margin-bottom: 10px;
`;

const TextArea = styled.textarea`
  flex: 1;
  width: 100%;
  max-width: 800px; // 최대 너비 설정
  min-height: 400px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: vertical;
  box-sizing: border-box; // padding이 너비에 포함되도록 설정

  &::placeholder {
    color: #999;
    font-family: 'Noto Sans KR', sans-serif;
    opacity: 0.7;
  }

  &:focus::placeholder {
    opacity: 0.5;
  }
`;

const ImagePreview = styled.div`
  width: 100%;
  max-width: 800px;
  height: 200px;
  border: 2px dashed #ccc;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  overflow: hidden;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const PreviewImg = styled.img`
  width: calc(33.33% - 10px);
  height: 100%;
  object-fit: cover;
`;

const FileInput = styled.input`
  display: none;
`;

const FileInputLabel = styled.label`
  display: inline-block;
  padding: 10px 15px;
  background-color: #f0f0f0;
  color: #333;
  border-radius: 4px;
  cursor: pointer;
  margin-bottom: 20px;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 100px;
  margin: 50px;
`;

function CreatePost() {
  const [userId, setUserId] = useState('');
  const [userNickName, setUserNickname] = useState('');
  const [contents, setContents] = useState('');
  const [postImages, setPostImages] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);
  const 우석핑 = '9e351071-01b9-4827-b797-6685d3348072';

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      // const {
      //   data: { user }
      // } = await supabase.from('users');
      // supabase.auth.getUser(); // 어센틱케이션에 적합한 소스 -> 어센틱케이션 할때 사용

      console.log(user);
      if (user) {
        setUserId(user.id);
        const { data, error } = await supabase.from('users').select('user_nick_name').eq('id', user.id).single();

        if (error) {
          console.error('Error fetching nickname:', error);
        } else if (data) {
          setUserNickname(data.user_nick_name);
        }
      }
    };

    // fetchUserData();
  }, []);

  useEffect(() => {
    return () => {
      postImages.forEach((img) => URL.revokeObjectURL(img));
    };
  }, [postImages]);

  useEffect(() => {
    return () => {
      previewUrls.forEach(URL.revokeObjectURL);
    };
  }, [previewUrls]);

  // 기본이미지 설정
  const {
    data: { publicUrl }
  } = supabase.storage.from('avatars').getPublicUrl('profile.png');
  console.log(publicUrl);

  const onErrorImg = (e) => {
    // e.target.src = defaultimage;
  };

  const onChangeContent = (e) => {
    setContents(e.target.value);
  };

  const onCancel = () => {
    console.log('취소버튼');
    setContents('');
    setPostImages([]);
    setPreviewUrls([]);
    navigate('/home'); // 홈 페이지로 이동
  };

  // 게시물 등록
  const onUpload = async (e) => {
    e.preventDefault();

    // 게시물 내용이나 이미지가 있는지 확인
    if (!contents.trim() && postImages.length === 0) {
      alert('내용을 입력하거나 이미지를 선택해주세요.');
      return;
    }

    // if (!userId) {
    //   alert('사용자 정보를 불러오는 데 실패했습니다. 다시 로그인해주세요.');
    //   return;
    // }

    try {
      // 이미지 업로드 및 URL 배열 생성
      const imgUrls = await Promise.all(postImages.map(uploadImage));

      // 각 URL을 개별 요소로 가지는 배열 생성
      // const imgUrlArray = imgUrls.map((url) => [url]);

      // 게시물 Supabase 데이터베이스에 insert
      const { data, error } = await supabase.from('posts').insert([
        {
          post_contents: contents,
          post_imgs: imgUrls,
          user_id: 우석핑
        }
      ]);

      if (error) throw error;

      alert('게시물이 성공적으로 업로드되었습니다.');
      setContents('');
      setPostImages([]);
      setPreviewUrls([]);
      navigate('/home'); // 게시물 업로드 성공 시 홈 페이지로 이동
    } catch (error) {
      console.error('게시물 업로드 오류 : ', error);
      alert(`게시물 업로드를 실패했습니다: ${error.message}`);
    }
  };

  // 이미지 업로드 기능 (최대 3개 까지만 이미지업로드 가능)
  const uploadImage = async (imageFile) => {
    const fileName = `${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;

    // 이미지를 Supabase 스토리지에 업로드
    const { data, error } = await supabase.storage.from('post-images').upload(fileName, imageFile);
    if (error) throw error;

    const { data: urlData, error: urlError } = supabase.storage.from('post-images').getPublicUrl(data.path);
    if (urlError) throw urlError;

    return urlData.publicUrl;
  };

  const onImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + postImages.length > 3) {
      alert('최대 3개의 이미지만 선택할 수 있습니다.');
      return;
    }
    setPostImages((prevImages) => [...prevImages, ...files]);

    // 선택된 이미지의 미리보기를 표시
    setPreviewUrls((prevUrls) => [...prevUrls, ...files.map((file) => URL.createObjectURL(file))]);
  };

  return (
    <>
      <StyledSection>
        <PostForm onSubmit={onUpload}>
          <MyProfile>
            <Myimg src={publicUrl} alt="my Image" onError={onErrorImg} />
            <p>{userNickName}</p>
          </MyProfile>

          <TextArea
            value={contents}
            onChange={onChangeContent}
            placeholder="추천하고 싶은 여행지나 가보고싶은 여행지가 있으면 적어 주세요... ✈️🏖️🗻"
          ></TextArea>
          {/* <imageInput> */}
          <FileInputLabel htmlFor="file-input">이미지 선택</FileInputLabel>
          <FileInput id="file-input" type="file" accept="image/*" onChange={onImageChange} multiple />
          {/* </imageInput> */}
          <ImagePreview>
            {previewUrls.length > 0 ? (
              previewUrls.map((url, index) => <PreviewImg key={index} src={url} alt={`Preview ${index + 1}`} />)
            ) : (
              <p>이미지를 선택하세요</p>
            )}
          </ImagePreview>
          <ButtonGroup>
            <StyledButton color="#F4A460" type="button" onClick={onCancel}>
              Cancel
            </StyledButton>
            <StyledButton type="submit">Upload</StyledButton>
          </ButtonGroup>
        </PostForm>
      </StyledSection>
    </>
  );
}

export default CreatePost;
