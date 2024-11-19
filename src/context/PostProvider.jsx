import { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const PostContext = createContext(null);

function PostProvider({ children }) {
  const [userId, setUserId] = useState('');
  const [contents, setContents] = useState('');
  const [postImages, setPostImages] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      // const {
      //   data: { user }
      // } = await supabase.from('users');
      // supabase.auth.getUser(); // 어센틱케이션에 적합한 소스 -> 어센틱케이션 할때 사용

      console.log(user);
    };

    // fetchUserData();
  }, []);

  return (
    <PostContext.Provider
      value={{
        userId,
        setUserId,
        contents,
        setContents,
        postImages,
        setPostImages,
        previewUrls,
        setPreviewUrls,
        navigate
      }}
    >
      {children}
    </PostContext.Provider>
  );
}

export default PostProvider;
