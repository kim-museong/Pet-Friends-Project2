import styled from 'styled-components';
import { PiPencilSimpleLineDuotone } from 'react-icons/pi';
import palette from '../../lib/styles/palette';
import { Link } from 'react-router-dom';

const WriteBtn = styled(Link)`
  width: 50px;
  height: 50px;
  position: absolute;
  bottom: 20px;
  right: 20px;
  cursor: pointer;

  background: ${({ theme }) => (theme === 'true' ? 'rgb(35,35,35)' : 'white')};
  border: 1px solid ${palette.border};
  border-radius: 50%;

  svg {
    font-size: 30px;
    margin: 9px 0 0 9px;
    color: ${({ theme }) => (theme === 'true' ? '' : 'rgb(50,50,50)')};
  }

  &:hover {
    background: ${({ theme }) => (theme === 'true' ? 'rgb(80,80,80)' : 'rgb(245,245,245)')};
    svg {
      color: rgb(255, 140, 0);
    }
  }
`;

const Memo = () => {
  return (
    <>
      <WriteBtn to="/memo/write">
        <PiPencilSimpleLineDuotone />
      </WriteBtn>
    </>
  );
};

export default Memo;
