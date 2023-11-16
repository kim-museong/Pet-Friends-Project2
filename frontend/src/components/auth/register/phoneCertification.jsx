import { useState } from 'react';
import { MdInfo, MdAlarm } from 'react-icons/md';
import * as S from '../../../styles/register/phoneCertification.style';
import * as SH from '../../../styles/share.style';

const PhoneCertification = ({
  theme,
  form,
  error,
  onChange,
  sendPhone,
  timerExpired,
  timeOut,
  timer,
  formatTime,
  onConfirm,
  sendSuccess,
}) => {
  const [isInfoHovered, setIsInfoHovered] = useState(false);
  const { errorPhone, errorConfirm } = error;

  const onInfoHover = () => {
    setIsInfoHovered(true);
  };

  const onInfoLeave = () => {
    setIsInfoHovered(false);
  };

  return (
    <S.Wrapper>
      <S.InputNameBox>휴대전화 번호</S.InputNameBox>
      <SH.InputContainBox theme={String(theme)}>
        <SH.InputBox
          type="tel"
          autoComplete="phone"
          name="phone"
          placeholder="번호 입력"
          value={form.phone}
          onChange={onChange}
          autoFocus
        />
      </SH.InputContainBox>
      <S.CertificationButtonBox onClick={sendPhone}>
        {timerExpired ? '다시받기' : '인증번호받기'}
      </S.CertificationButtonBox>

      <S.StatusBox>
        <div className="error">{errorPhone && errorPhone}</div>
        <div className="success">{sendSuccess && sendSuccess}</div>
      </S.StatusBox>
      {/* <S.InfoBox>
          아직도 인증번호을 받지 못하셨나요?
          <MdInfo onMouseEnter={onInfoHover} onMouseLeave={onInfoLeave} />
          <S.ExplanationBox theme={String(theme)} ishovered={String(isInfoHovered)}>
            <div className="triangle"></div>
            <div>
              인증번호를 받지 못하는 이유는 닉네임과 이메일이 일치하지 않거나 회원가입 시 입력한 이메일과 다를 수
              있습니다.
            </div>
          </S.ExplanationBox>
        </S.InfoBox> */}
      <S.InputNameBox>인증번호</S.InputNameBox>
      <SH.InputContainBox>
        <SH.InputBox
          className={`certificationNumber ${timeOut ? 'certificationError' : ''}`}
          autoComplete="certification"
          name="certification"
          onChange={onChange}
          placeholder="인증번호 입력"
        />
        <S.TimeBox timer={String(timer)} timerexpired={String(timerExpired)}>
          <div>
            <MdAlarm />
          </div>
          <div>{formatTime(timer)}</div>
        </S.TimeBox>
      </SH.InputContainBox>

      <S.CertificationButtonBox onClick={onConfirm}>확인</S.CertificationButtonBox>
      <S.StatusBox>
        <div className="error">{timeOut && '인증: 인증시간이 초과되었습니다. 다시 시도해주세요.'}</div>
        <div className="error"> {errorConfirm && errorConfirm}</div>
      </S.StatusBox>
    </S.Wrapper>
  );
};

export default PhoneCertification;
