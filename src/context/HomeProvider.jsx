import React, { useEffect, useState, createContext } from 'react';
import { supabase } from '../supabase/supabase';

export const HomeContext = createContext(null);

export default function HomeProvider({ children }) {
  const [data, setData] = useState([]);
  const [commentsData, setCommentsData] = useState([]);
  const [chat, setChat] = useState([]);
  const [chatToggle, setChatToggle] = useState(false);
  const [postId, setPostId] = useState('');

  useEffect(() => {
    const fetchPostsData = async () => {
      const { data, error } = await supabase.from('posts').select(`
          *,
          users (user_nick_name,id,user_profile_image),
          comments(*),
          likes(*)
        `);
      if (error) {
        console.error(error);
      } else {
        setData(data);
      }
    };
    const fetchCommentsData = async () => {
      const { data, error } = await supabase.from('comments').select(`*`);
      if (error) {
        console.error(error);
      } else {
        setCommentsData(data);
      }
    };
    fetchPostsData();
    fetchCommentsData();
  }, []);

  return (
    <HomeContext.Provider
      value={{
        chatToggle,
        setChatToggle,
        data,
        setData,
        postId,
        setPostId,
        chat,
        setChat,
        commentsData,
        setCommentsData
      }}
    >
      {children}
    </HomeContext.Provider>
  );
}
