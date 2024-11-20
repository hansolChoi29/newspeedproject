import { ToastContainer } from 'react-toastify';
import PostFormEditor from '../components/post/PostFormEditor';
import PostProvider from '../context/PostProvider';
import StyledSection from '../styles/StyledSection';

function CreatePost() {
  return (
    <>
      <PostProvider>
        <StyledSection>
          <ToastContainer />
          <PostFormEditor />
        </StyledSection>
      </PostProvider>
    </>
  );
}

export default CreatePost;
