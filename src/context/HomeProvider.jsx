import React, { useEffect, useState, createContext } from 'react';
import { supabase } from '../supabase/supabase';

export const HomeContext = createContext(null);

export default function HomeProvider({ children }) {
  const [posts, setPosts] = useState([]);
  const [chat, setChat] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase.from('posts').select(`
          *,
          users (
          user_nick_name
          ),
          comments(*),
          likes(*)
        `);
      if (error) {
        console.error(error);
      } else {
        const posts = data;
        const users = data.map((item) => item.users).filter(Boolean);
        const comments = data.flatMap((item) => item.comments); 
        const likes = data.flatMap((item) => item.likes); 
        const formattedData = { posts, users, comments, likes };
        setPosts(formattedData);
      }
    };

    fetchData();
  }, []);

  const handleToggle = (setter, value) => () => setter(!value);

  return <HomeContext.Provider value={{ handleToggle, chat, setChat, data: posts }}>{children}</HomeContext.Provider>;
}
