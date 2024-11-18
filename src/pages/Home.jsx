import styled from 'styled-components';
import HomeProvider from '../context/HomeProvider';
import StyledSection from '../styles/StyledSection';
import HomeList from '../components/home/HomeList';
import { supabase } from '../supabase/supabase';

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
  async function fetchData() {
    const { data, error } = await supabase.from('posts').select('*');
    if (error) {
      console.error('Error fetching data:', error);
    } else {
      console.log('Data:', data);
    }
  }

  fetchData();
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
