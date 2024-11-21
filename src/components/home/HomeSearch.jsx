import React, { useContext, useState } from 'react';
import { HomeContext } from '../../context/HomeProvider';
import { supabase } from '../../supabase/supabase';
import styled from 'styled-components';
import { CiSearch } from 'react-icons/ci';

const SearchBox = styled.form`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 50px;
  padding: 5px 20px;
  border: 1px solid #ddd;
  border-radius: 100px;
  box-shadow: 0px 0px 2px 2px rgba(0, 0, 0, 0.1);
  input {
    font-size: 1rem;
    width: calc(100% - 60px);
    border: none;
    outline: none;
  }
  button {
    width: 45px;
    font-size: 1.75rem;
    background: none;
  }
`;

const HomeSearch = () => {
  const { setData } = useContext(HomeContext);
  const [searchValue, setSearchValue] = useState('');

  const onChangeSearch = (e) => {
    e.preventDefault();
    setSearchValue(e.target.value);
  };

  const searchedValue = async (e) => {
    e.preventDefault();
    try {
      const { data: searchData, error } = await supabase
        .from('posts')
        .select(
          `
          *,
          users (user_nick_name,id,user_profile_image),
          comments(*),
          likes(*)
        `
        )
        .like('post_contents', `%${searchValue}%`);

      if (error) {
        return console.error('검색 에러:', error);
      }

      setData(searchData || []);
    } catch (err) {
      console.error('에러 발생:', err);
    }
  };

  return (
    <SearchBox onSubmit={searchedValue}>
      <input type="text" placeholder="어디가고 싶어?" value={searchValue} onChange={onChangeSearch} />
      <button type="submit">
        <CiSearch />
      </button>
    </SearchBox>
  );
};

export default HomeSearch;
