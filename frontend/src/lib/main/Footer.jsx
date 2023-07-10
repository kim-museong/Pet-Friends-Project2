import styled from 'styled-components';

const FooterBox = styled.div`
  width: 100%;
  height: 80px;
  margin-top: 10rem;
  text-align: center;
  background: blue;
`;

const Footer = () => {
  return (
    <>
      <FooterBox>
        <h2>미완성 푸터</h2>
      </FooterBox>
    </>
  );
};

export default Footer;
