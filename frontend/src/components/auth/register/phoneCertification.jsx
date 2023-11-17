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
      <S.CertificationInputBox theme={String(theme)}>
        <S.CertificationInput
          type="tel"
          autoComplete="phone"
          name="phone"
          placeholder="번호 입력"
          value={form.phone}
          onChange={onChange}
          autoFocus
        />
      </S.CertificationInputBox>
      <S.CertificationButtonBox onClick={sendPhone}>
        {timerExpired ? '다시받기' : '인증번호받기'}
      </S.CertificationButtonBox>

      <S.StatusBox>
        <div className="error">{errorPhone && errorPhone}</div>
        {!timeOut && <div className="success">{sendSuccess && sendSuccess}</div>}
      </S.StatusBox>

      <S.InfoBox>
        <MdInfo onMouseEnter={onInfoHover} onMouseLeave={onInfoLeave} />
        아직도 인증번호을 받지 못하셨나요?
        <S.ExplanationBox theme={String(theme)} ishovered={String(isInfoHovered)}>
          <div className="triangle"></div>
          <div>번호를 다시 한번 확인해 주세요.</div>
        </S.ExplanationBox>
      </S.InfoBox>

      <S.CertificationInputBox>
        <S.CertificationInput
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
      </S.CertificationInputBox>

      <S.CertificationButtonBox onClick={onConfirm}>확인</S.CertificationButtonBox>
      <S.StatusBox>
        <div className="error">{timeOut && '인증시간이 초과되었습니다. 다시 시도해주세요.'}</div>
        <div className="error"> {errorConfirm && errorConfirm}</div>
      </S.StatusBox>
    </S.Wrapper>
  );
};

export default PhoneCertification;
