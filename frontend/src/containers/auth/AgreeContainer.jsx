import React, { useCallback } from 'react';
import Agree from '../../components/auth/Agree';
import { useDispatch, useSelector } from 'react-redux';
import { checkAgree, isConfirm, allCheck } from '../../modules/auth';

const AgreeContainer = () => {
  const dispatch = useDispatch();
  const agree = useSelector((state) => state.auth.register.agree);
  const theme = useSelector((state) => state.theme.theme);

  const onConfirm = useCallback(
    (e) => {
      e.preventDefault();
      dispatch(isConfirm());
    },
    [dispatch],
  );

  const onCheck = useCallback(
    (e) => {
      const { name } = e.target;
      dispatch(checkAgree(name));
    },
    [dispatch],
  );

  const allAgreeCheck = useCallback(() => {
    dispatch(allCheck());
  }, [dispatch]);

  return (
    <>
      <Agree onConfirm={onConfirm} onCheck={onCheck} agree={agree} allAgreeCheck={allAgreeCheck} theme={theme} />
    </>
  );
};

export default React.memo(AgreeContainer);
