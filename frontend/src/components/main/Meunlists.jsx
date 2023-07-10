import styled from 'styled-components';
import { MdComment } from 'react-icons/md';
import { AiFillNotification, AiOutlineComment } from 'react-icons/ai';
import React from 'react';

const SelectBox = styled.div`
  display: flex;
  margin-right: 20px;
  font-weight: bold;

  div {
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid rgb(186, 186, 186);
    border-radius: 0;
    width: 100%;
    text-align: center;
    padding: 10px 0;

    &:hover {
      background: ${({ theme }) => (theme === 'true' ? 'rgb(45,45,45)' : 'white')};
    }
  }

  div:first-child {
    border-radius: 4px 0 0 0;
  }

  div:last-child {
    border-radius: 0 4px 0 0;
  }

  div + div {
    border-left: none;
  }

  svg {
    margin-right: 5px;
    pointer-events: none;
    font-size: 30px;
  }

  .community {
    background: ${({ community, theme }) =>
      community === 'true'
        ? theme === 'true'
          ? 'rgb(45,45,45)'
          : ''
        : theme === 'true'
        ? 'black'
        : 'rgb(240,240,240)'};
    color: ${({ community }) => (community === 'true' ? '' : 'rgb(186,186,186)')};
    border-bottom: ${({ community }) => community === 'true' && 'none'};
    svg {
      color: ${({ community }) => (community === 'true' ? 'rgb(255, 140, 0)' : '')};
    }
  }

  .info {
    background: ${({ info, theme }) =>
      info === 'true' ? (theme === 'true' ? 'rgb(45,45,45)' : '') : theme === 'true' ? 'black' : 'rgb(240,240,240)'};
    color: ${({ info }) => (info === 'true' ? '' : 'rgb(186,186,186)')};
    border-bottom: ${({ info }) => info === 'true' && 'none'};
    svg {
      color: ${({ info }) => (info === 'true' ? 'rgb(0, 115, 255)' : '')};
    }
  }

  .notice {
    background: ${({ notice, theme }) =>
      notice === 'true' ? (theme === 'true' ? 'rgb(45,45,45)' : '') : theme === 'true' ? 'black' : 'rgb(240,240,240)'};
    color: ${({ notice }) => (notice === 'true' ? '' : 'rgb(186,186,186)')};
    border-bottom: ${({ notice }) => notice === 'true' && 'none'};
    svg {
      color: ${({ notice }) => (notice === 'true' ? 'red' : '')};
    }
  }
`;

const ShowBox = styled.div`
  height: 235px;
  border: 1px solid rgb(186, 186, 186);
  border-top: none;
  border-radius: 0 0 4px 4px;
  margin-right: 20px;
`;

const ListBox = styled.ul`
  height: 234px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  list-style: none;
  padding: 10px;
  background: ${({ theme }) => (theme === 'true' ? 'rgb(45,45,45)' : '')};

  li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 50%;
    height: 20%;
    padding: 5px 20px 0;
    border-radius: 0;

    .list-title {
      display: flex;

      svg {
        margin-right: 5px;
        font-size: 30px;
      }

      p {
        width: 150px;
        display: inline-block;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        padding-top: 5px;
      }
    }
  }
`;

const Meunlists = ({ onClick, posts, notice, info, community, theme }) => {
  return (
    <div style={{ width: '100%' }}>
      <SelectBox notice={String(notice)} info={String(info)} community={String(community)} theme={String(theme)}>
        <div data-type="notice" className="notice" onClick={onClick}>
          <AiFillNotification />
          공지사항
        </div>
        <div data-type="info" className="info" onClick={onClick}>
          <MdComment />
          정보글
        </div>
        <div data-type="community" className="community" onClick={onClick}>
          <AiOutlineComment />
          커뮤니티
        </div>
      </SelectBox>
      <ShowBox>
        <ListBox theme={String(theme)}>
          {posts?.map((post) => (
            <li key={post.id}>
              <div className="list-title">
                {community && <AiOutlineComment style={{ color: 'rgb(255, 140, 0)' }} />}
                {notice && <AiFillNotification style={{ color: 'red' }} />}
                {info && <MdComment style={{ color: 'rgb(0, 115, 255)' }} />}
                <p>{post.title}</p>
              </div>
              <div>{post.User.nickname}</div>
            </li>
          ))}
        </ListBox>
      </ShowBox>
    </div>
  );
};

export default React.memo(Meunlists);
