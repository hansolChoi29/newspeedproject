import { createRoot } from 'react-dom/client';
// import './index.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/Login.jsx';
import Home from './pages/Home.jsx';
import MyPage from './pages/MyPage.jsx';
import CreatePost from './pages/CreatePost.jsx';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/myPage" element={<MyPage />} />
      <Route path="/home/create" element={<CreatePost />} />
    </Routes>
  </BrowserRouter>
);
