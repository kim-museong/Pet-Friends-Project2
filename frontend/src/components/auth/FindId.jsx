import { Link } from 'react-router-dom';
import { Footer } from '../../lib/styles/find';
import { MdInfo, MdAlarm } from 'react-icons/md';
import { useState } from 'react';
import * as S from '../../styles/find/findId.style';
import * as SH from '../../styles/share.style';

const FindId = ({
  findId,
  form,
  theme,
  onChange,
  error,
  errors,
  onConfirm,
  showBox,
  getUserId,
  onCancel,
  masked,
  confirmFail,
  findType,
  changeRadio,
  sendPhone,
  timerExpired,
  timeOut,
  timer,
  formatTime,
  sendSuccess,
  onfindPhone,
}) => {
  const { nickname } = findId;
  const { nicknameError } = error;
  const { userId } = getUserId || '';
  const { errorPhone, errorConfirm } = errors || '';
  const [isInfoHovered, setIsInfoHovered] = useState(false);

  const onInfoHover = () => {
    setIsInfoHovered(true);
  };

  const onInfoLeave = () => {
    setIsInfoHovered(false);
  };

  return (
    <>
      <S.FindIdWrapper>
        <S.FindLogoBox>
          <Link to="/" className="logo"></Link>
          <h2>아이디 찾기</h2>
        </S.FindLogoBox>

        <S.FindSelectBox>
          <S.RadioBox active={findType === 'nickname'}>
            <S.FindCheckBox
              id="nickname"
              type="radio"
              name="findId"
              value="nickname"
              checked={findType === 'nickname'}
              onChange={changeRadio}
            />
            <S.FindCheckLabel htmlFor="nickname">닉네임</S.FindCheckLabel>
          </S.RadioBox>
          <S.RadioBox active={findType === 'phone'}>
            <S.FindCheckBox
              id="phone"
              type="radio"
              name="findId"
              value="phone"
              checked={findType === 'phone'}
              onChange={changeRadio}
            />
            <S.FindCheckLabel htmlFor="phone">폰번호</S.FindCheckLabel>
          </S.RadioBox>
        </S.FindSelectBox>

        {showBox && (
          <S.ResultBox>
            <h2>아이디 찾기</h2>

            {findType === 'nickname' ? (
              <>
                <S.ResultInfoBox>
                  * 닉네임으로 아이디를 찾을 경우 부분만 보입니다. 아이디 전체가 필요로 한다면 번호로 찾기를
                  진행해주세요.
                </S.ResultInfoBox>
                <S.ResultValueBox>{masked(userId)}</S.ResultValueBox>
              </>
            ) : (
              <S.ResultValueBox>{userId}</S.ResultValueBox>
            )}

            <S.FindButton onClick={onCancel}>확인</S.FindButton>
          </S.ResultBox>
        )}

        {findType === 'nickname' && (
          <S.FindNickWrapper>
            <S.NickInfoBox>회원가입 시 입력한 이름와 입력한 이름이 동일하여야 합니다.</S.NickInfoBox>

            <div>
              <S.FindInputBox>
                <S.FindInput
                  autoComplete="nickname"
                  name="nickname"
                  onChange={onChange}
                  value={nickname}
                  placeholder="이름을 입력해주세요."
                />
              </S.FindInputBox>

              <S.FindButton className="confirm" onClick={onConfirm}>
                확인
              </S.FindButton>
              <S.ResultInfoBox>
                * 닉네임으로 아이디를 찾을 경우 부분만 보입니다. 아이디 전체가 필요로 한다면 번호로 찾기를 진행해주세요.
              </S.ResultInfoBox>

              <S.StatusBox>
                <div>{nicknameError && nicknameError}</div>
                <div>{confirmFail && confirmFail}</div>
              </S.StatusBox>
            </div>
          </S.FindNickWrapper>
        )}
        {findType === 'phone' && (
          <>
            <S.FindPhoneWrapper>
              <S.FindInputBox theme={String(theme)}>
                <S.FindInput
                  type="tel"
                  autoComplete="phone"
                  name="phone"
                  value={findId.phone}
                  onChange={onChange}
                  placeholder="번호를 입력해주세요. "
                  autoFocus
                />
              </S.FindInputBox>

              <S.FindButton className="certificationBtn" onClick={sendPhone}>
                {timerExpired ? '다시받기' : '인증번호받기'}
              </S.FindButton>

              <S.StatusBox>
                <div>{errorPhone && errorPhone}</div>
                <div className="success">{sendSuccess && sendSuccess}</div>
              </S.StatusBox>

              <S.InfoBox>
                <MdInfo onMouseEnter={onInfoHover} onMouseLeave={onInfoLeave} />
                아직도 인증번호을 받지 못하셨나요?
                <S.ExplanationBox theme={String(theme)} ishovered={String(isInfoHovered)}>
                  <div className="triangle"></div>
                  <div>인증번호를 받지 못하는 이유는 회원가입 시 입력한 번호과 다를 수 있습니다.</div>
                </S.ExplanationBox>
              </S.InfoBox>

              <S.FindInputBox>
                <S.FindInput
                  className={`certificationNumber ${timeOut ? 'certificationError' : ''}`}
                  autoComplete="certification"
                  name="certification"
                  onChange={onChange}
                  placeholder="인증번호을 입력하세요."
                  maxLength={7}
                />

                <SH.TimeBox timer={String(timer)} timerexpired={String(timerExpired)}>
                  <div>
                    <MdAlarm />
                  </div>
                  <div>{formatTime(timer)}</div>
                </SH.TimeBox>
              </S.FindInputBox>
              <S.FindButton onClick={onfindPhone}>확인</S.FindButton>

              <S.StatusBox>
                <div>{timeOut && '인증시간이 초과되었습니다. 다시 시도해주세요.'}</div>
                <div> {errorConfirm && errorConfirm}</div>
              </S.StatusBox>
            </S.FindPhoneWrapper>
          </>
        )}

        <Footer theme={String(theme)}>
          <Link to="/auth/login">로그인</Link>
          <Link to="/auth/credentials?type=findPwd">비밀번호 찾기</Link>
        </Footer>
      </S.FindIdWrapper>
    </>
  );
};

export default FindId;
