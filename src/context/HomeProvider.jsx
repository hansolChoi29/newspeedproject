import React, { useState } from 'react';
import { createContext } from 'react';

export const HomeContext = createContext(null);

export default function HomeProvider({ children }) {
  const [chat, setChat] = useState(false);
  const handleToggle = (setter, value) => () => setter(!value);

  return <HomeContext.Provider value={{ handleToggle, chat, setChat }}>{children}</HomeContext.Provider>;
}
