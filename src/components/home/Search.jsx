import React, { useState } from 'react';

const SearchBox = styled.form`
  border: 2px solid gray;
`;

const Search = () => {
  const [searchValue, setSearchValue] = useState('');

  const onChangeSearch = (e) => {
    setSearchValue(e.target.value);
  };

  const searchedValue = async () => {
    const { data, error } = await supabase.from('posts').select().like('post_contents', '%searchValue%');
    console.log('searched: ', { data, error });
    setUser(data.user);
  };

  return (
    <SearchBox onSubmit={searchedValue}>
      <input type="text" placeholder="어디가고 싶어?" value={searchValue} onChange={onChangeSearch} />
      <button type="submit">🔍</button>
    </SearchBox>
  );
};

export default Search;
