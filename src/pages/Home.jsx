import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { MdEdit } from 'react-icons/md';
import imgLogo from '/src/assets/profile.png';

const PostItem = styled.div`
  
`;
const PostItemTitle = styled.div`
  display: flex;
  a {
    color: inherit;
  }
`;

const PostItemImg = styled.div`
  display: flex;
  align-content: center;
  gap: 10px;
  img {
    width: 100%;
    max-width: 100px;
  }
`;

function Home() {
  return (
    <PostItem>
      <PostItemTitle>
        홍길동 1시간전{' '}
        <Link to="/home/:id">
          <MdEdit />
        </Link>
      </PostItemTitle>
      <PostItemImg>
        <img src={imgLogo} />
      </PostItemImg>
    </PostItem>
  );
}

export default Home;
