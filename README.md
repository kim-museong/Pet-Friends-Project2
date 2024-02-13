# 펫프렌즈
-----


### 📋프로젝트 소개
- 반려동물을 좋아하는 사람들을 위한 커뮤니티사이트
   
- #### 선정하게 된 이유
  팀원중에 반려동물을 키우는 사람이 있고 커뮤니티를 만들어 보는 것이</br>
  기본적인 CRUD와 나중에 추가적인 기능을 넣기 좋을 것 같아서 프로젝트를 진행하게 되었습니다.

---------


### 📅개발 기간
- 2023.06.23 ~ 2023.07.28

----------


### 👨‍👨‍👦‍👦팀원
- ##### 조장 배준범:  커뮤니티(페이지네이션, 검색등), 사진, api
- ##### 김무성:  메인, 회원가입&로그인, CSS
- ##### 권용수:  마이페이지, 관리자페이지
- ##### 장영호:  CSS보조, 데이터수집


---------

### ⚒사용기술
<img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black"> <img src="https://img.shields.io/badge/node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white"> <img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black"> <img src="https://img.shields.io/badge/mysql-4479A1?style=for-the-badge&logo=mysql&logoColor=white"> <img src="https://img.shields.io/badge/express-000000?style=for-the-badge&logo=express&logoColor=white" /> <img src="https://img.shields.io/badge/linux-FCC624?style=for-the-badge&logo=linux&logoColor=black" /> <img src="https://img.shields.io/badge/yarn-2C8EBB?style=for-the-badge&logo=yarn&logoColor=white" /> 


---------

### 내가 구현한 부분

- 메인페이지
<img src="https://github.com/kim-museong/Pet-Friends-Project2/assets/130715054/11ccd404-410c-467c-8b8a-433b45e50047.png" width=600 height=350/>
<img src="https://github.com/kim-museong/Pet-Friends-Project2/assets/130715054/7952bed8-1005-4bdb-9945-811189d52fe3.png" width=600 height=350/>

- #### 서브버튼
<div>
   <h3>출석버튼</h3>  
   <p>00시 마다 데이터베이스의 전체유저출석여부를 false로 초기화시킵니다.</p>
   <p>출석버튼 클릭시 유저의 출석여부를 ture로 변경후 db에 금일 날짜를 저장합니다. 출석여부에 따라 출석버튼 활성화를 설정합니다.</p> 
</div>


<div>
   <h3>출석페이지</h3>
   <p>db에 유저테이블과 연결된 출석테이블에서 createAt의 값을 가져와서 캘린더의 날짜와 동일한 날짜가 있으면 해당 부분에 출석도장이미지를 표시하게 만들었습니다.</p> 
<img src="https://github.com/kim-museong/Pet-Friends-Project2/assets/130715054/f6465cca-9947-4d2f-904d-fdd9a090e2a2.png"  width=300 height=200  />
</div>


<div>
   <h3>랜덤사진</h3>
   <p>TheCat과 TheDog의 api를 가져와서 버튼을 누를 때마다 호출하여 랜덤한 사진이 나오게 만들었습니다.</p>
<img src="https://github.com/kim-museong/Pet-Friends-Project2/assets/130715054/d6d621da-1d53-4103-bff8-f9bf15d4596d.png"  width=300 height=200  />
</div>


<div>
   <h3>메모장</h3>
   <p>유저가 간단한 내용을 저장하고 수정할 수 있게 만들었습니다. 원하는 값을 검색하여 해당 값이 내용에 포함된 포스트를 찾을 수 있게 만들었습니다.</p>
<img src="https://github.com/kim-museong/Pet-Friends-Project2/assets/130715054/a9307bd7-5872-4265-a4d6-c02ca9b78624.png"  width=300 height=200  />
</div>


<div>
   <h3>로그인페이지</h3>
   <p>아이디저장은 체크시 아이디인풋창에 있는 값을 로컬스토리지에 저장하도록 하였습니다. 페이지가 렌더링될때 로컬스토리지에 존재여부 따라 값를 가져오도록 만들었습니다. </p>
   <img src="https://github.com/kim-museong/Pet-Friends-Project2/assets/130715054/62f577f2-5a14-48ab-9054-335e926ffdf0.png" width=600 height=350 />
</div>


<div>
   <h3>회원가입</h3>
   <p>휴대폰인증은  Naver Cloud의 서비스인 SENS(Simple & Easy Notification Service)를 사용하여 만들었습니다. SENS를 선택한 이유는 한달 50건 무료라는 점이 테스트하기 좋아서 선택을 하였습니다. </p>
   <img src="https://github.com/kim-museong/Pet-Friends-Project2/assets/130715054/d06a116a-81c1-4a8c-aba4-6e6f874c3862.png" width=300 height=200 />
   <img src="https://github.com/kim-museong/Pet-Friends-Project2/assets/130715054/715ddde8-e52f-4dee-81f9-612f2dca4c8a.png" width=300 height=200 />
   <img src="https://github.com/kim-museong/Pet-Friends-Project2/assets/130715054/1c87c696-f5d2-4721-8173-351bb8045758.png" width=300 height=200 />
</div>  


<div>
   <h3>아이디찾기</h3>
   <p>이름으로 찾기는 아이디 일부분만 보여주도록 만들었고 휴대폰인증은 아이디전체를 보여주게 만들었습니다. </p>
   <img src="https://github.com/kim-museong/Pet-Friends-Project2/assets/130715054/493f6dfa-eff9-43f0-ab81-e9d8015debfe.png" width=600 height=350 />
</div>


<div>
   <h3>비밀번호찾기</h3>
   <p>회원가입에 이메일을 입력했을 경우 이메일로도 찾기가 가능하도록 만들었습니다. 이메일 인증은 nodemailer를 사용하여 만들었습니다. </p>
   <img src="https://github.com/kim-museong/Pet-Friends-Project2/assets/130715054/c732dc1a-68c8-48f1-8100-d608ab715593.png"  width=600 height=350 /> 
</div>











