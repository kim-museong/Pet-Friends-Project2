import { useDispatch, useSelector } from '../../../../node_modules/react-redux/es/exports';
import MemoUpdate from '../../../components/main/Memo/MemoUpdate';

const MemoUpdateContainer = () => {
  const dispatch = useDispatch();
  const content = useSelector((state) => state.main.memo.content);
  return (
    <>
      <MemoUpdate content={content} />
    </>
  );
};

export default MemoUpdateContainer;
