import styled from 'styled-components';
import StyledButton from '../../styles/StyledButton';
import { useContext } from 'react';
import { PostContext } from '../../context/PostProvider';

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 100px;
  margin: 50px;
`;

function PostButton() {
  const { isEditMode, setContents, setPostImages, setPreviewUrls, navigate } = useContext(PostContext);

  // Cancel 버튼
  const onCancel = () => {
    setContents('');
    setPostImages([]);
    setPreviewUrls([]);
    navigate('/home'); // 홈 페이지로 이동
  };

  return (
    <>
      <ButtonGroup>
        <StyledButton color="#F4A460" type="button" onClick={onCancel}>
          Cancel
        </StyledButton>
        {}
        <StyledButton type="submit">{isEditMode ? 'Update' : 'Upload'}</StyledButton>
      </ButtonGroup>
    </>
  );
}

export default PostButton;
