import React, { useContext, useState } from 'react';
import { HomeContext } from '../../context/HomeProvider';
import { supabase } from '../../supabase/supabase';
import styled from 'styled-components';

const SearchBox = styled.form`
  top: 20px;
  border: 2px solid gray;
`;

const Search = () => {
  const {data, setData} = useContext(HomeContext);
  const [searchValue, setSearchValue] = useState('');

  const onChangeSearch = (e) => {
    e.preventDefault();
    setSearchValue(e.target.value);
  };
  
  const searchedValue = async (e) => {
    e.preventDefault();
    try {

      const { data, error } = await supabase.from('posts').select().like('post_contents', `%${searchValue}%`);
      if (error) {
        return console.error('에러', error);
      }
      console.log('searched: ', { data, error });
      setData(data.user);
    } catch (e) {
      console.log('에러', e)
    }
  };

  return (
    <SearchBox onSubmit={searchedValue}>
      <input type="text" placeholder="어디가고 싶어?" value={searchValue} onChange={onChangeSearch} />
      <button type="submit">🔍</button>
    </SearchBox>
  );
};

export default Search;
