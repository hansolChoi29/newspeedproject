import styled from 'styled-components';
<<<<<<< HEAD
import HomeProvider from '../context/HomeProvider';
import StyledSection from '../styles/StyledSection';
import HomeList from '../components/home/HomeList';

const StyledHomeCont = styled.div`
  button {
    cursor: pointer;
    border: none;
  }
=======
import { MdEdit } from 'react-icons/md';
import imgLogo from '/src/assets/profile.png';
import Header from '../components/Header';
import Footer from '../components/Footer';

const PostItem = styled.div``;
const PostItemTitle = styled.div`
  display: flex;
>>>>>>> origin/dev
  a {
    color: inherit;
    text-decoration: none;
  }
`;

function Home() {
  return (
<<<<<<< HEAD
    <HomeProvider>
      <StyledHomeCont>
        <StyledSection>
          <HomeList />
        </StyledSection>
      </StyledHomeCont>
    </HomeProvider>
=======
    <>
      <Header>
        <Footer>
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
        </Footer>
      </Header>
    </>
>>>>>>> origin/dev
  );
}

export default Home;
