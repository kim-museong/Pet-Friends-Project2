import styled from 'styled-components';
import Responsive from './Responsive';
import { Link } from 'react-router-dom';

const HeaderBlock = styled.div`
  position: fixed;
  width: 100%;
  background-color: #00ffe1;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.08);
`;

const Wrapper = styled(Responsive)`
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const MenuList = styled.div`
  font-weight: bold;
  a + a {
    margin-left: 20px;
  }
`;

const Spacer = styled.div`
  height: 4rem;
`;

const StyledLink = styled(Link)`
  border: none;
  font-size: 1rem;
  font-weight: bold;
  padding: 0.25rem 1rem;
  color: black;
  outline: none;
  cursor: pointer;
  text-decoration: none;
  &:hover {
    color: #33a96e;
  }
`;

const Header = () => {
  return (
    <>
      <HeaderBlock>
        <Wrapper>
          <h1>헤더</h1>
          <MenuList>
            <StyledLink to="/">홈</StyledLink>
            <StyledLink to="/notice">공지사항</StyledLink>
            <StyledLink to="/information">정보글</StyledLink>
            <StyledLink to="/picture">사진</StyledLink>
            <StyledLink to="/community">커뮤니티</StyledLink>
            {/* 마이페이지, 관리자페이지, 로그인(회원가입) 추가 */}
          </MenuList>
          <button>로그인,회원가입 자리</button>
        </Wrapper>
      </HeaderBlock>
      <Spacer />
    </>
  );
};

export default Header;
