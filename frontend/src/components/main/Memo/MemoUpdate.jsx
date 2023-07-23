import styled from 'styled-components';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import palette from '../../../lib/styles/palette';

const WriteBox = styled.div`
  width: 100%;
`;

const Title = styled.div`
  height: 30%;
  border-bottom: 1px solid ${palette.border};
  border-radius: 0;
  padding: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  button {
    padding: 5px 20px;
    margin-right: 10px;
    border: none;
    background: ${palette.mainColor};
    font-weight: bold;
    color: white;

    &:hover {
      background: ${palette.border};
    }
  }

  .back {
    font-size: 28px;

    svg {
      margin-top: 5px;
      margin-left: 10px;
      color: ${palette.mainColor};

      &:hover {
        color: ${palette.border};
      }
    }
  }
`;

const Content = styled.textarea`
  width: 100%;
  padding: 20px;
  border-radius: 0;
  resize: none;
  overflow: hidden;
  border: none;
  outline: none;
  font-size: 20px;
`;

const MemoUpdate = ({ onChange, textareaHegiht, content, back, onClick }) => {
  return (
    <>
      <WriteBox>
        <Title>
          <div className="back" onClick={back}>
            <AiOutlineCloseCircle />
          </div>
          <button onClick={onClick}>수정</button>
        </Title>
        <Content
          name="content"
          rows={1}
          ref={textareaHegiht}
          onChange={onChange}
          placeholder="내용"
          autoFocus
          value={content}
        />
      </WriteBox>
    </>
  );
};

export default MemoUpdate;
