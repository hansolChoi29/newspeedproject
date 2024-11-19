import React, { useEffect, useState, createContext } from 'react';
import { supabase } from '../supabase/supabase';

export const HomeContext = createContext(null);

export default function HomeProvider({ children }) {
  const [data, setData] = useState([]);
  const [chat, setChat] = useState([]);
  const [chatToggle, setChatToggle] = useState(false);
  const [postId, setPostId] = useState('');

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

  const deletePost = async (postId) => {
    const { error } = await supabase.from('posts').delete().eq('id', postId);
    if (error) {
      console.error(error);
    } else {
      setData((prevData) => prevData.filter((post) => post.id !== postId));
    }
  };

  const deleteComment = async (commentId) => {
    const { error } = await supabase.from('comments').delete().eq('id', commentId);
    if (error) {
      console.error(error);
    } else {
      setData((prevData) => {
        return prevData.map((post) => {
          if (post.comments) {
            post.comments = post.comments.filter((comment) => comment.id !== commentId);
          }
          return post;
        });
      });
    }
  };

  const handleToggle = (setter, value) => () => setter(!value);

  return (
    <HomeContext.Provider
      value={{
        handleToggle,
        chatToggle,
        setChatToggle,
        data,
        postId,
        setPostId,
        chat,
        setChat,
        deletePost, 
        deleteComment
      }}
    >
      {children}
    </HomeContext.Provider>
  );
}
