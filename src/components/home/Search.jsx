import React, { useContext, useState } from 'react';
import { HomeContext } from '../../context/HomeProvider';
import styled from 'styled-components';

const SearchBox = styled.form`
  border: 2px solid gray;
`;

const Search = () => {
  const {data, setData} = useContext(HomeContext);
  console.log(data);
  const [searchValue, setSearchValue] = useState('');

  const onChangeSearch = (e) => {
    setSearchValue(e.target.value);
  };

  const searchedValue = async () => {
    const { data, error } = await supabase.from('posts').select().like('post_contents', '%searchValue%');
    console.log('searched: ', { data, error });
    setData(data.user);
  };

  return (
    <SearchBox onSubmit={searchedValue}>
      <input type="text" placeholder="어디가고 싶어?" value={searchValue} onChange={onChangeSearch} />
      <button type="submit">🔍</button>
    </SearchBox>
  );
};

export default Search;
