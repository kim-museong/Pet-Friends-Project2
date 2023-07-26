import styled from 'styled-components';
import { useSelector } from 'react-redux';
import palette from '../styles/palette';

const FooterBox = styled.div`
  width: 100%;
  height: 80px;
  margin-top: 10rem;
  padding: 80px 0;
  text-align: center;
  box-shadow: 0 0 0 1px ${palette.border};
`;

const Footer = () => {
  const theme = useSelector((state) => state.theme.theme);

  return (
    <>
      <FooterBox theme={String(theme)}>
        <div>
          <p>© 2023 PETFRIENDS. All rights reserved.</p>
          <p>Contact: contact@yourwebsite.com</p>
        </div>
      </FooterBox>
    </>
  );
};

export default Footer;
