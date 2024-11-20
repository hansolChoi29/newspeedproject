import styled from 'styled-components';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HomeProvider from '../context/HomeProvider';
import StyledSection from '../styles/StyledSection';
import HomeList from '../components/home/HomeList';

const StyledHomeCont = styled.div`
  margin: 100px 0;
  button {
    cursor: pointer;
    border: none;
  }
  a {
    color: inherit;
    text-decoration: none;
  }
`;

function Home() {
  return (
    <HomeProvider>
      <StyledHomeCont>
        <StyledSection>
          <ToastContainer />
          <HomeList />
        </StyledSection>
      </StyledHomeCont>
    </HomeProvider>
  );
}

export default Home;
