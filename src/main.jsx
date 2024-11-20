import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/Login.jsx';
import Home from './pages/Home.jsx';
import MyPage from './pages/MyPage.jsx';
import Join from './pages/Join.jsx';
import CreatePost from './pages/CreatePost.jsx';
import FindPassword from './pages/FindPassword.jsx';
import { GlobalStyle } from './styles/GlobalStyle.js';
import App from './App.jsx';
import ResetPassword from './pages/ResetPassword.jsx';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <GlobalStyle />
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/join" element={<Join />} />
      <Route path="/resetpassword" element={<ResetPassword />} />
      <Route path="/findpassword" element={<FindPassword />} />
      <Route path="/*" element={<App />}>
        <Route path="find" element={<Home />} />
        <Route path="home" element={<Home />} />
        <Route path="mypage" element={<MyPage />} />
        <Route path="post" element={<CreatePost />} />
        <Route path="post/:id" element={<CreatePost />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
