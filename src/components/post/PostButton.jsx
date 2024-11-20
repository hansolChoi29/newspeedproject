import styled from 'styled-components';
import StyledButton from '../../styles/StyledButton';
import { useContext } from 'react';
import { PostContext } from '../../context/PostProvider';
import Swal from 'sweetalert2';

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 100px;
  margin: 50px;
`;

function PostButton() {
  const { setContents, setPostImages, setPreviewUrls, navigate } = useContext(PostContext);

  // Cancel 버튼
  const onCancel = () => {
    Swal.fire({
      icon: 'warning',
      text: '취소할 경우 작성중인 내용은 저장 되지 않습니다. 정말로 취소 하시겠습니까? ',
      showCancelButton: true,
      confirmButtonText: '확인',
      cancelButtonText: '취소'
    }).then((result) => {
      if (result.value) {
        setContents('');
        setPostImages([]);
        setPreviewUrls([]);
        setTimeout(() => {
          navigate('/home'); // 홈 페이지로 이동
        }, 1000);
      } else {
        //취소
      }
    });
  };
}

export default PostButton;
