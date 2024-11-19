import React, { useEffect, useState, createContext } from 'react';
import { supabase } from '../supabase/supabase';

export const HomeContext = createContext(null);

export default function HomeProvider({ children }) {
  const [data, setData] = useState([]);
  const [chat, setChat] = useState([]);
  const [chatToggle, setChatToggle] = useState(false);
  const [postId, setPostId] = useState('');
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
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
    fetchData();
  }, []);

  return (
<<<<<<< HEAD
    <HomeContext.Provider value={{ handleToggle, chatToggle, setChatToggle, data, postId, setPostId, chat, setChat, setData }}>
=======
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
        comments,
        setComments
      }}
    >
>>>>>>> f84dce5208d2031d5f43efe01ea97a622497d73d
      {children}
    </HomeContext.Provider>
  );
}
