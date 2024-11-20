import { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { supabase } from '../../supabase/supabase';
import { PostContext } from '../../context/PostProvider';
import PostButton from './PostButton';
import { useParams } from 'react-router-dom';

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
  min-height: 200px;
  border: 2px dashed #ccc;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  padding: 10px;
  box-sizing: border-box;
  flex-wrap: wrap;
  gap: 10px;
`;

const PreviewImg = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
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

const PreviewImgContainer = styled.div`
  position: relative;
  width: calc(33.33% - 10px);
  padding-top: calc(33.33% - 10px);
  overflow: hidden;
`;

const DeleteButton = styled.button`
  position: absolute;
  top: 5px;
  right: 5px;
  background: rgba(255, 255, 255, 0.7);
  border: none;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-size: 12px;
  z-index: 1;
`;

function PostFormEditor() {
  const {
    user,
    getUser,
    postId,
    setPostId,
    isEditMode,
    setIsEditMode,
    contents,
    setContents,
    postImages,
    setPostImages,
    previewUrls,
    setPreviewUrls,
    navigate
  } = useContext(PostContext);

  // URL에서 postId 가져오기
  const { id } = useParams();

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    console.log('useEffect_id', id);
    if (id && id !== ':id') {
      setIsEditMode(true);
      setPostId(id);
      loadPostData(id);
    } else {
      setIsEditMode(false);
      setPostId(null);
    }
  }, [id]);

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
      const postData = {
        post_contents: contents,
        post_imgs: [...previewUrls.filter((url) => url.startsWith('http')), ...imgUrls],
        user_id: user.id
      };

      console.log('postData', postData);

      let result;

      if (isEditMode) {
        result = await supabase.from('posts').update(postData).eq('id', postId);
      } else {
        result = await supabase.from('posts').insert(postData);
      }

      const { data, error } = result;
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

  // 이미지를 Supabase 스토리지에 업로드
  const uploadImage = async (imageFile) => {
    const fileName = `${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;

    const { data, error } = await supabase.storage.from('post-images').upload(fileName, imageFile);
    if (error) throw error;

    const { data: urlData, error: urlError } = supabase.storage.from('post-images').getPublicUrl(data.path);
    if (urlError) throw urlError;

    return urlData.publicUrl;
  };

  // 이미지 선택 및 미리보기를 처리
  const onImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + previewUrls.length > 3) {
      alert('최대 3개의 이미지만 선택할 수 있습니다.');
      return;
    }

    const newPreviewUrls = files.map((file) => URL.createObjectURL(file));
    setPreviewUrls((prevUrls) => [...prevUrls, ...newPreviewUrls]);
    setPostImages((prevImages) => [...prevImages, ...files]);
  };

  // 수정 모드일 때 기존 게시물 데이터를 불러오기
  const loadPostData = async (postId) => {
    if (!postId || postId === ':id') {
      console.error('유효하지 않은 게시물 ID:', postId);
      return;
    }
    try {
      const { data, error } = await supabase.from('posts').select('*').eq('id', postId).single();

      if (error) throw error;

      console.log('loadPostData', data);
      setContents(data.post_contents);
      setPreviewUrls(data.post_imgs || []);
    } catch (error) {
      console.error('게시물 로드 오류:', error);
    }
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
            previewUrls.map((url, index) => (
              <PreviewImgContainer key={index}>
                <PreviewImg src={url} alt={`Preview ${index + 1}`} />
                <DeleteButton onClick={() => handleDeleteImage(index)}>X</DeleteButton>
              </PreviewImgContainer>
            ))
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
