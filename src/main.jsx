import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/Login.jsx';
import Home from './pages/Home.jsx';
import MyPage from './pages/MyPage.jsx';
import CreatePost from './pages/CreatePost.jsx';
import { GlobalStyle } from './styles/GlobalStyle.js';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <GlobalStyle />
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/*" element={<App />}>
        <Route path="home" element={<Home />} />
        <Route path="mypage" element={<MyPage />} />
        <Route path="home/create" element={<CreatePost />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
