import { useContext, useEffect } from 'react';
import styled from 'styled-components';
import StyledButton from '../../styles/StyledButton';
import { supabase } from '../../supabase/supabase';
import { PostContext } from '../../context/PostProvider';
import PostButton from './PostButton';

const PostForm = styled.form`
  display: flex;
  gap: 20px;
  align-items: center;
  flex-direction: column;
  width: 100%; // 전체 너비 사용
  max-width: 800px; // PostGroup의 최대 너비 설정
  margin: 50px auto 50px; // 중앙 정렬
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
  margin-top: 100px;

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

function PostFormEditor() {
  const { userId, setUserId, contents, setContents, postImages, setPostImages, previewUrls, setPreviewUrls, navigate } =
    useContext(PostContext);
  const 우석핑 = '9e351071-01b9-4827-b797-6685d3348072';

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

  const onChangeContent = (e) => {
    setContents(e.target.value);
  };

  // 게시물 등록
  const onUpload = async (e) => {
    e.preventDefault();

    // 게시물 내용이나 이미지가 있는지 확인
    if (!contents.trim() && postImages.length === 0) {
      alert('내용을 입력하거나 이미지를 선택해주세요.');
      return;
    }

    try {
      // 이미지 업로드 및 URL 배열 생성
      const imgUrls = await Promise.all(postImages.map(uploadImage));

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
      <PostForm onSubmit={onUpload}>
        <TextArea
          value={contents}
          onChange={onChangeContent}
          placeholder="추천하고 싶은 여행지나 가보고싶은 여행지가 있으면 적어 주세요... ✈️🏖️🗻"
        ></TextArea>
        <FileInputLabel htmlFor="file-input">이미지 선택</FileInputLabel>
        <FileInput id="file-input" type="file" accept="image/*" onChange={onImageChange} multiple />
        <ImagePreview>
          {previewUrls.length > 0 ? (
            previewUrls.map((url, index) => <PreviewImg key={index} src={url} alt={`Preview ${index + 1}`} />)
          ) : (
            <p>이미지를 선택하세요</p>
          )}
        </ImagePreview>
        <PostButton />
      </PostForm>
    </>
  );
}

export default PostFormEditor;
