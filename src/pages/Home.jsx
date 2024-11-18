import styled from 'styled-components';
import HomeProvider from "../context/HomeProvider";
import StyledSection from '../styles/StyledSection';
import HomeList from "../components/HomeList";

const StyledHomeCont = styled.div`
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
          <HomeList />
        </StyledSection>
      </StyledHomeCont>
    </HomeProvider>
  );
}

export default Home;
