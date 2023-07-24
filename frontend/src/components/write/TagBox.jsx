import React, { useState, useCallback, useEffect } from 'react';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';
import { useSelector } from 'react-redux';

const TagBoxBlock = styled.div`
  width: 100%;

  h4 {
    color: ${palette.gray[8]};
    margin-top: 0;
    margin-bottom: 0.5rem;
  }

  input {
    color: ${({ theme }) => (theme === 'true' ? 'white' : 'black')};
    background: ${({ theme }) => (theme === 'true' ? 'rgb(45, 45, 45)' : '')};
  }
`;

const TagForm = styled.form`
  width: 100%;
  overflow: hidden;
  display: flex;
  border: ${({ theme }) => (theme === 'true' ? 'none' : `1px solid ${palette.gray[4]}`)};
  background: ${({ theme }) => (theme === 'true' ? 'rgb(60, 60, 60)' : '')};
  border-radius: 10px;
  margin-top: 10px;
  padding: 10px;

  input,
  button {
    outline: none;
    border: none;
    font-size: 1rem;
  }

  input {
    padding: 0.5rem;
    flex: 1;
    min-width: 0;
  }
  button {
    cursor: pointer;
    margin-left: 30px;
    padding: 5px 40px;
    border: none;
    background: ${palette.mainColor};
    color: white;
    font-weight: bold;
    &:hover {
      background: ${palette.gray[6]};
    }
  }
`;

const Tag = styled.div`
  font-family: 'Noto Sans KR', sans-serif;
  color: ${palette.mainColor};
  padding: 8px 20px;
  border: 1px solid ${palette.mainColor};
  border-radius: 20px;
  transition: all 0.2s ease-in-out;
  font-size: 14px;
  line-height: 1.5; /* line-height 조정 */

  &:hover {
    opacity: 0.5;
  }
`;

const TagListBlock = styled.div`
  width: 100%;
  display: flex;
  justify-content: left;
  align-items: center;
  flex-wrap: wrap;
  margin: 10px 0;
  gap: 10px;
`;

// React.memo를 사용하여 tag 값이 바뀔 때만 리렌더링되도록 처리
const TagItem = React.memo(({ tag, onRemove, onChangeTags }) => <Tag onClick={() => onRemove(tag)}>#{tag}</Tag>);

// React.memo를 사용하여 tags 값이 바뀔 때만 리렌더링되도록 처리
const TagList = React.memo(({ tags, onRemove }) => (
  <TagListBlock>
    {tags.map((tag) => (
      <TagItem key={tag} tag={tag} onRemove={onRemove} />
    ))}
  </TagListBlock>
));

const TagBox = ({ tags, onChangeTags }) => {
  const [input, setInput] = useState('');
  const [localTags, setLocalTags] = useState([]);
  const theme = useSelector((state) => state.theme.theme);

  const insertTag = useCallback(
    (tag) => {
      if (!tag) return; // 공백이라면 추가하지 않음
      if (localTags.includes(tag)) return; // 이미 존재한다면 추가하지 않음
      const nextTags = [...localTags, tag];
      setLocalTags(nextTags);
      onChangeTags(nextTags);
    },
    [localTags, onChangeTags],
  );

  const onRemove = useCallback(
    (tag) => {
      const nextTags = localTags.filter((t) => t !== tag);
      setLocalTags(nextTags);
      onChangeTags(nextTags);
    },
    [localTags, onChangeTags],
  );

  const onChange = useCallback((e) => {
    setInput(e.target.value);
  }, []);

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      insertTag(input.trim()); // 앞뒤 공백 없앤 후 등록
      setInput(''); // input 초기화
    },
    [input, insertTag],
  );

  // tags 값이 바뀔 때
  useEffect(() => {
    setLocalTags(tags);
  }, [tags]);

  return (
    <TagBoxBlock theme={String(theme)}>
      <TagForm onSubmit={onSubmit} theme={String(theme)}>
        <input placeholder="태그를 입력하세요" value={input} onChange={onChange} />
        <button type="submit">추가</button>
      </TagForm>
      <TagList tags={localTags} onRemove={onRemove} />
    </TagBoxBlock>
  );
};

export default TagBox;
