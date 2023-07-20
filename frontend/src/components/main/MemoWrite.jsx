import styled from 'styled-components';

const WriteBox = styled.div`
  input {
    width: 100%;
    border: none;
    box-shadow: 0 0 1px 2px black;
  }
`;

const Title = styled.div``;

const Content = styled.div``;

const MemoWrite = () => {
  return (
    <>
      <WriteBox>
        <Title>
          <input placeholder="제목" />
        </Title>
        <Content>
          <input placeholder="내용" />
        </Content>
      </WriteBox>
    </>
  );
};

export default MemoWrite;
