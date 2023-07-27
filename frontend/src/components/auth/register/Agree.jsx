import styled from 'styled-components';
import palette from '../../../lib/styles/palette';
import { MdArrowForwardIos } from 'react-icons/md';

const MainBox = styled.div`
  text-align: center;
  margin-top: 50px;

  button {
    width: 500px;
    margin-top: 20px;
    padding: 15px 20px;
    background: ${palette.mainColor};
    border: none;
    font-size: 18px;
    font-weight: bold;
    color: white;
    cursor: pointer;

    &:hover {
      background: ${palette.border};
    }

    &:disabled {
      background: ${palette.border};
      cursor: default;
    }
  }

  .infos {
    width: 450px;
    margin: 0 auto 50px;
    padding: 5px;
    text-align: left;
    font-size: 14px;
    color: rgb(120, 120, 120);
  }
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  font-weight: bold;

  svg {
    margin-top: 6px;
    margin-left: 5px;
  }
  .sub {
    color: ${palette.mainColor};
    font-size: 16px;
    margin: 0 8px 2px;
  }
`;

const AgreeBox = styled.div`
  display: flex;
  width: 525px;
  margin: 0 auto 10px;

  input[type='checkbox'] {
    margin-top: 1px;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    background: ${({ theme }) => (theme === 'true' ? 'rgb(60, 60, 60)' : '')};
    border: 1px solid ${palette.mainColor};
    border-radius: 50%;
    cursor: pointer;
    height: 30px;
    outline: 0;
    width: 30px;
  }
  input[type='checkbox']::after {
    border: solid ${({ theme }) => (theme === 'true' ? 'rgb(60, 60, 60)' : 'white')};
    border-width: 0 3px 3px 0;
    content: '';
    display: none;
    height: 40%;
    left: 35%;
    position: relative;
    top: 19%;
    transform: rotate(45deg);
    width: 15%;
  }
  input[type='checkbox']:checked {
    background: ${palette.mainColor};
    border: ${palette.mainColor};
  }
  input[type='checkbox']:checked::after {
    display: block;
  }
`;

const Detail = styled.div`
  width: 450px;
  height: 120px;
  border: 1px solid ${palette.border};
  margin: 0 auto 30px;
  padding: 5px 15px;
  overflow: scroll;
  text-align: left;
  font-size: 14px;

  p {
    color: rgb(120, 120, 120);
  }

  div {
    font-weight: bold;
    margin: 5px 0;
  }

  &::-webkit-scrollbar {
    display: none;
  }
`;

const ButtonBox = styled.div`
  position: fixed;
  width: 100%;
  height: 140px;
  bottom: 0;
  background: ${({ theme }) => (theme === 'true' ? 'rgb(30,30,30)' : 'white')};
`;

const Space = styled.div`
  height: 150px;
  background: ${({ theme }) => (theme === 'true' ? 'rgb(30,30,30)' : 'white')};
`;

const Agree = ({ onConfirm, onCheck, agree, allAgreeCheck, theme }) => {
  const { all, tos, privacy, location, benefit } = agree || '';

  return (
    <>
      <MainBox>
        <AgreeBox theme={String(theme)}>
          <input type="checkbox" name="all" onChange={allAgreeCheck} checked={all} />
          <Title>
            <div style={{ marginLeft: '12px', fontSize: '20px' }}>전체동의하기</div>
          </Title>
        </AgreeBox>
        <div className="infos">위치정보이용약관(선택), 이벤트・혜택 정보 수신(선택) 동의를 포함합니다.</div>
        <AgreeBox theme={String(theme)}>
          <input type="checkbox" name="tos" onChange={onCheck} checked={tos} />
          <Title>
            <div className="sub">[필수]</div> <div>이용약관 동의</div>
            <div>
              <MdArrowForwardIos />
            </div>
          </Title>
        </AgreeBox>
        <Detail>
          <div>이용약관</div>
          <div>제1조 </div>
          <p>
            본 약관은 회원이 펫프렌즈가 제공하는 서비스를 이용함에 있어 펫프렌즈와 회원간의 권리, 의무 및 책임사항을
            정함을 목적으로 합니다.
          </p>
          <div>제2조</div>
          <p>
            (용어 정의) "펫프렌즈"라 함은 펫프렌즈을 의미합니다. "서비스"라 함은 펫프렌즈가 제공하는 [서비스명] 등의
            서비스를 의미합니다. "회원"이라 함은 본 약관에 동의하고 펫프렌즈와 서비스 이용 계약을 체결한 자를
            의미합니다. "아이디(ID)"라 함은 회원의 식별과 서비스 이용을 위해 회원이 정하고 펫프렌즈가 승인하는 문자,
            숫자 또는 기호의 조합을 의미합니다.
          </p>
          <div>제3조</div>
          <p>
            (약관의 효력과 변경) 본 약관은 회원이 이를 동의하고 펫프렌즈가 제공하는 서비스를 이용함으로써 효력이
            발생합니다. 펫프렌즈는 필요한 경우 약관을 변경할 수 있으며, 변경된 약관은 회원에게 공지함으로써 효력이
            발생합니다.
          </p>
          <div> 제4조</div>
          <p>
            (회원 가입 및 계정 관리) 회원 가입은 회원이 약관에 동의한 후 펫프렌즈가 제공하는 회원 가입 양식을 작성하여
            회원으로 등록함으로써 완료됩니다. 회원은 자신의 아이디와 비밀번호를 관리하고 이에 대한 책임을 부담합니다.
            회원은 자신의 개인정보를 최신 및 정확하게 유지해야 합니다.
          </p>
          <div>제5조</div>
          <p>
            (서비스 이용) 회원은 펫프렌즈가 제공하는 서비스를 이용할 수 있습니다. 회원은 서비스 이용 시 관련 법령, 약관
            및 이용 규정을 준수해야 합니다. 회원은 서비스 이용 중 다른 회원에게 피해를 주거나 서비스 운영에 지장을
            초래하는 행위를 해서는 안 됩니다. 제6조 (서비스의 변경, 중단) 펫프렌즈는 운영상, 기술상 필요한 경우 서비스의
            일부 또는 전부를 변경, 중단할 수 있습니다. 펫프렌즈는 서비스의 변경, 중단에 대해 회원에게 사전 공지를 할 수
            있습니다.
          </p>
        </Detail>
        <AgreeBox theme={String(theme)}>
          <input type="checkbox" name="privacy" onChange={onCheck} checked={privacy} />
          <Title>
            <div className="sub">[필수]</div> <div>개인정보 동의</div>
            <div>
              <MdArrowForwardIos />
            </div>
          </Title>
        </AgreeBox>
        <Detail>
          <div>개인정보 처리방침</div>
          <div> 1. 개인정보의 처리 목적</div>
          <p>
            펫프렌즈은 [서비스명] 제공을 위해 아래와 같은 목적으로 개인정보를 처리합니다: 회원 가입 및 관리 서비스 제공
            및 운영 계약 이행 및 관리 고객 문의 및 응대 서비스 개선 및 개발 마케팅 및 광고 활동
          </p>
          <div>2. 수집하는 개인정보 항목</div>
          <p>
            펫프렌즈은 서비스 제공 및 운영을 위해 아래와 같은 개인정보를 수집할 수 있습니다: 신규 회원 가입 시: 이름,
            이메일 주소, 비밀번호 등 서비스 이용 과정에서 자동 수집: IP 주소, 쿠키 정보, 서비스 이용 기록 등 고객 문의
            및 응대 시: 이름, 연락처, 문의 내용 등
          </p>
          <div>3. 개인정보의 보유 및 이용 기간</div>
          <p>
            펫프렌즈은 회원의 개인정보를 원칙적으로 개인정보 수집 및 이용목적이 달성되면 지체 없이 파기합니다. 다만,
            아래의 경우에는 해당 기간 동안 개인정보를 보유할 수 있습니다: 관련 법령에 의한 정보 보유 기간 회원 탈퇴 후
            회원의 요청에 따른 개인정보 보유
          </p>
          <div> 4. 개인정보의 제공 및 공유</div>
          <p>
            펫프렌즈은 회원의 개인정보를 원칙적으로 외부에 제공하지 않습니다. 다만, 아래의 경우에는 예외적으로
            개인정보를 제공할 수 있습니다: 회원의 동의가 있는 경우 법령에 의해 요구되는 경우
          </p>
          <div> 5. 개인정보의 파기</div>
          <p>
            펫프렌즈은 개인정보 보유기간이 경과하거나 개인정보의 처리 목적이 달성되면 지체 없이 개인정보를 파기합니다.
            파기 절차 및 방법은 정책에 따라 다를 수 있습니다.
          </p>
        </Detail>
        <AgreeBox theme={String(theme)}>
          <input type="checkbox" name="location" onChange={onCheck} checked={location} />
          <Title>
            <div className="sub">[선택]</div> <div>위치정보 동의</div>
            <div>
              <MdArrowForwardIos />
            </div>
          </Title>
        </AgreeBox>
        <Detail>
          <div>위치정보 수집에 대한 동의 </div>
          <p>
            펫프렌즈는 [서비스명] 제공을 위해 회원의 위치정보를 수집할 수 있습니다. 아래와 같은 내용에 동의함으로써
            위치정보 수집에 대한 동의를 하게 됩니다.
          </p>
          <div> 1. 위치정보의 수집 및 이용 목적</div>
          <p>
            펫프렌즈는 위치정보를 수집하고 이용함으로써 다음과 같은 목적을 달성합니다: [서비스명]의 정확한 위치 기반
            서비스 제공 광고 및 마케팅 활동의 타겟팅 및 개인화
          </p>
          <div> 2. 수집하는 위치정보 항목</div>
          <p>
            펫프렌즈는 아래와 같은 위치정보 항목을 수집할 수 있습니다: 현재 위치 좌표 (위도, 경도) 이용 기기의 IP 주소
            기기 설정에서 수집한 위치정보
          </p>
          <div> 3. 위치정보의 보유 및 이용 기간</div>
          <p>
            펫프렌즈는 위치정보를 수집한 후, 목적을 달성한 즉시 위치정보를 파기합니다. 다만, 관련 법령에 의거하여 일정
            기간 동안 위치정보를 보관할 수 있습니다.
          </p>
          <div> 4. 위치정보의 제공 및 공유</div>
          <p>
            펫프렌즈는 회원의 위치정보를 원칙적으로 외부에 제공하지 않습니다. 다만, 아래의 경우에는 예외적으로
            위치정보를 제공할 수 있습니다: 회원의 동의가 있는 경우 법령에 의해 요구되는 경우
          </p>
          <div> 5. 동의의 철회</div>
          <p>
            회원은 언제든지 위치정보 수집에 대한 동의를 철회할 수 있습니다. 동의 철회는 서비스 설정에서 이용 가능하며,
            동의를 철회하는 경우 위치기반 서비스의 일부 기능 사용에 제약이 있을 수 있습니다.
          </p>
        </Detail>
        <AgreeBox theme={String(theme)}>
          <input type="checkbox" name="benefit" onChange={onCheck} checked={benefit} />
          <Title>
            <div className="sub">[선택]</div> <div>이벤트・혜택 정보 수신</div>
            <div>
              <MdArrowForwardIos />
            </div>
          </Title>
        </AgreeBox>
        <Detail>
          <div>이벤트 및 혜택 정보 수신에 대한 동의</div>
          <p>
            펫프렌즈는 회원의 이벤트 및 혜택 정보를 제공하기 위해 아래와 같은 내용에 동의함으로써 이벤트 및 혜택 정보
            수신에 대한 동의를 하게 됩니다.
          </p>
          <div> 1. 정보 수신 목적</div>
          <p>
            펫프렌즈는 회원에게 다양한 이벤트 및 혜택 정보를 제공함으로써 아래와 같은 목적을 달성합니다: 새로운 서비스
            소식 및 업데이트 안내 할인 혜택, 이벤트, 경품 추첨 등 다양한 이벤트 정보 제공
          </p>
          <div> 2. 수신하는 정보 항목</div>
          <p>
            펫프렌즈는 아래와 같은 정보를 회원에게 제공할 수 있습니다: 이벤트 안내 및 참여 방법 할인 쿠폰 및 이용 안내
            상품 소개 및 판매 프로모션
          </p>
          <div> 3. 정보 제공 및 공유</div>
          <p> 펫프렌즈는 회원의 개인정보를 외부에 제공하지 않으며, 이벤트 및 혜택 정보는 회원에게 직접 제공됩니다.</p>
          <div>4. 동의의 철회</div>
          <p>
            회원은 언제든지 이벤트 및 혜택 정보 수신에 대한 동의를 철회할 수 있습니다. 동의 철회는 서비스 설정에서 이용
            가능하며, 동의를 철회하는 경우 이벤트 및 혜택 정보 수신에 제약이 있을 수 있습니다.
          </p>
        </Detail>
        <Space theme={String(theme)} />
        <ButtonBox theme={String(theme)}>
          <button onClick={onConfirm} disabled={!tos || !privacy}>
            다음
          </button>
        </ButtonBox>
      </MainBox>
    </>
  );
};

export default Agree;
