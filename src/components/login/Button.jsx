import styled from 'styled-components';
import StyledButton from '../../styles/StyledButton';

const CustomStyledButton = styled(StyledButton)`
  width: ${(props) => props.width || '350px'};
  height: ${(props) => props.height || '70px'};
  padding: 15px;
  font-size: 18px;
  margin: 10px;
`;

const Button = ({ handleSingup, loginText = '로그인', signupText = '회원가입' }) => {
  return (
    <>
      <CustomStyledButton type="submit">{loginText}</CustomStyledButton>
      <CustomStyledButton type="button" color="#f4a460" onClick={handleSingup}>
        {signupText}
      </CustomStyledButton>
    </>
  );
};

export default Button;
