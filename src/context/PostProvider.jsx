import { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabase/supabase';

export const PostContext = createContext(null);

export default function PostProvider({ children }) {
  const [user, setUser] = useState('');
  const [postId, setPostId] = useState(null);
  const [contents, setContents] = useState('');
  const [postImages, setPostImages] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);

  const navigate = useNavigate();

  //  Supabase에서 현재 사용자의 데이터를 가져오기
  const getUser = async () => {
    const {
      data: { user },
      error
    } = await supabase.auth.getUser();
    if (error) {
      console.error('사용자 정보를 가져오는 데 실패했습니다:', error.message);
    }
    if (user) {
      const { data, error } = await supabase.from('users').select('*').eq('id', user.id).single();
      if (error) {
        console.error('프로필 정보를 가져오는 데 실패했습니다:', error.message);
      }
      setUser(data);

      console.log('getUserdata', data);
    }
  };

  return (
    <PostContext.Provider
      value={{
        user,
        getUser,
        postId,
        setPostId,
        contents,
        setContents,
        postImages,
        setPostImages,
        previewUrls,
        setPreviewUrls,
        navigate,
        isEditMode,
        setIsEditMode
      }}
    >
      {children}
    </PostContext.Provider>
  );
}
