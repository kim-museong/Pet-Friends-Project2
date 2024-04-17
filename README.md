# 펫프렌즈
-----


### 📋프로젝트 소개
- 반려동물을 좋아하는 사람들을 위한 커뮤니티사이트
   
- #### 선정하게 된 이유
  팀원중에 반려동물을 키우는 사람이 있고 커뮤니티를 만들어 보는 것이</br>
  기본적인 CRUD와 나중에 추가적인 기능을 넣기 좋을 것 같아서 프로젝트를 진행하게 되었습니다.

- #### 어렵거나 힘들었던 점
  React와 Redux의 코드와 기능을 이해하고 사용하기까지가 가장 어려웠던 것 같습니다. </br>
  책을 많이 보며 어떻게 진행이 되는지 체크를 하며 코드가 어떻게 흘러가는지를 보며 공부를 하였습니다. </br>
  상태관리 라이브러리가 프로젝트에서 얼마나 많은 도움을 주는지 알게 되었습니다.
 
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

- 운영체제<br>
<img src="https://img.shields.io/badge/linux-FCC624?style=for-the-badge&logo=linux&logoColor=black" alt='linux_img'/><br>
- 프로그래밍<br>
<img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt='javascript_img'><br>
- 프론트엔드<br>
<img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt='react_img'><br>
- 백엔드<br>
<img src="https://img.shields.io/badge/node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt='nodejs_img'> <img src="https://img.shields.io/badge/express-000000?style=for-the-badge&logo=express&logoColor=white" alt='express_img'/><br>
- 데이터베이스<br>
<img src="https://img.shields.io/badge/mysql-4479A1?style=for-the-badge&logo=mysql&logoColor=white" alt='mysql_img'><br>
- 패키지<br>
<img src="https://img.shields.io/badge/yarn-2C8EBB?style=for-the-badge&logo=yarn&logoColor=white" alt='yarn_img'/><br>

---------

### 미리보기
<p>* 이미지는 프로젝트발표ppt에서 가져왔습니다. </p>
<div>
   <img src="https://github.com/kim-museong/My-profile/assets/130715054/a488e37e-c58c-4819-a029-1c84f8794ab2" alt="database_img" width="32%"/>
   <img src="https://github.com/kim-museong/My-profile/assets/130715054/e01b3d39-549b-4b06-83c6-3e78eda1d87c" alt="adminPage_img" width="32%"/>
   <img src="https://github.com/kim-museong/My-profile/assets/130715054/de59b1c0-61ed-4c14-ad6b-baaff0b0a5ca" alt="mainPage_img" width="32%"/>
</div>

<div>
   <img src="https://github.com/kim-museong/My-profile/assets/130715054/d89837a1-8d98-4330-b294-6c19a53a7290" alt='postsPage_img' width="32%"/>
   <img src="https://github.com/kim-museong/My-profile/assets/130715054/82ce823e-afae-4ad0-a8e2-4e7d8a9e2f2f" alt='postPage_img' width="32%"/>
   <img src="https://github.com/kim-museong/My-profile/assets/130715054/836e49dd-6310-485b-9230-361c19a8acbb" alt="commit_img" width="32%"/>
</div>

<div>
   <img src="https://github.com/kim-museong/My-profile/assets/130715054/85a11565-2c70-49a4-b215-f60337c4b531" alt='editPage_img' width="32%"/>
   <img src="https://github.com/kim-museong/My-profile/assets/130715054/f66a9a9d-8401-4d81-9592-fcc760b48c86" alt="infoPage_img" width="32%"/>
   <img src="https://github.com/kim-museong/My-profile/assets/130715054/dd13403c-176a-474d-8211-82bedc15b7c4" alt="authPage_img" width="32%" />
</div>

---------

### 맡은 부분

- CSS
   <p>전체적인 css부분을 담당하였습니다. 펫커뮤니티라는 점에서 화사한 분위기가 좋을 것같아 오렌지색상을 선택하였습니다.</p>

- 메인페이지
   <p>메인페이지는 여러 커뮤니티 사이트들의 구조을 보고 참고하여 제작하였습니다.</p>
<img src="https://github.com/kim-museong/Pet-Friends-Project2/assets/130715054/11ccd404-410c-467c-8b8a-433b45e50047.png" width=600 height=350 alt='homePage_img1'/>
<img src="https://github.com/kim-museong/Pet-Friends-Project2/assets/130715054/7952bed8-1005-4bdb-9945-811189d52fe3.png" width=600 height=350 alt='homePage_img2'>

- #### 서브버튼
<div>
   <h3>출석버튼</h3> 
   <p>00시 마다 db 유저들의 출석여부를 false로 초기화시킵니다.</p>
   <p>출석여부에 따라 출석버튼 활성화를 설정하고 출석버튼 클릭시 유저의 출석여부를 ture로 변경후 db에 금일 날짜를 저장합니다.</p> 
</div>


<div>
   <h3>출석페이지</h3>
   <p>해당 유저의 출석테이블의 createAt의 값을 가져와서 캘린더의 날짜와 동일한 날짜에 출석도장이미지를 표시하게 만들었습니다.</p> 
<img src="https://github.com/kim-museong/My-profile/assets/130715054/9d5511a9-c9bb-421e-9d0c-4b32d58249cb"  width=300 height=200 alt="attendPage_img"/>
</div>


<div>
   <h3>랜덤사진</h3>
   <p>TheCat과 TheDog의 api를 가져와서 버튼을 누를 때마다 호출하여 랜덤한 사진이 나오게 만들었습니다.</p>
<img src="https://github.com/kim-museong/Pet-Friends-Project2/assets/130715054/d6d621da-1d53-4103-bff8-f9bf15d4596d.png"  width=300 height=200 alt="randomImg_img"  />
</div>


<div>
   <h3>메모장</h3>
   <p>유저가 간단한 내용을 저장하고 수정할 수 있게 만들었습니다. 원하는 값을 검색하여 해당 값이 내용에 포함된 포스트를 찾을 수 있게 만들었습니다.</p>
<img src="https://github.com/kim-museong/My-profile/assets/130715054/1b7d07ac-b8af-4e15-9844-a1f633c7e355"  width=300 height=200 alt="MemoPage_img" />
</div>


<div>
   <h3>로그인페이지</h3>
   <p>아이디저장은 체크시 아이디인풋창에 있는 값을 로컬스토리지에 저장하도록 하였습니다. 페이지가 렌더링될때 로컬스토리지에 존재여부 따라 값를 가져오도록 만들었습니다. </p>
   <img src="https://github.com/kim-museong/Pet-Friends-Project2/assets/130715054/62f577f2-5a14-48ab-9054-335e926ffdf0.png" width=600 height=350 alt="loginPage_img"/>
</div>


<div>
   <h3>회원가입</h3>
   <p>휴대폰인증은  Naver Cloud의 서비스인 SENS(Simple & Easy Notification Service)를 사용하여 만들었습니다. SENS를 선택한 이유는 한달 50건 무료라는 점이 테스트하기 좋아서 선택을 하였습니다. </p>
   <img src="https://github.com/kim-museong/Pet-Friends-Project2/assets/130715054/d06a116a-81c1-4a8c-aba4-6e6f874c3862.png" width=300 height=200 alt="registerPage_img1"/>
   <img src="https://github.com/kim-museong/Pet-Friends-Project2/assets/130715054/715ddde8-e52f-4dee-81f9-612f2dca4c8a.png" width=300 height=200 alt="registerPage_img2"/>
   <img src="https://github.com/kim-museong/Pet-Friends-Project2/assets/130715054/1c87c696-f5d2-4721-8173-351bb8045758.png" width=300 height=200 alt="registerPage_img3"/>
</div>  


<div>
   <h3>아이디찾기</h3>
   <p>이름으로 찾기는 아이디 일부분만 보여주도록 만들었고 휴대폰인증은 아이디전체를 보여주게 만들었습니다. </p>
   <img src="https://github.com/kim-museong/Pet-Friends-Project2/assets/130715054/493f6dfa-eff9-43f0-ab81-e9d8015debfe.png" width=600 height=350 alt="findIdPage_img"/>
</div>


<div>
   <h3>비밀번호찾기</h3>
   <p>회원가입에 이메일을 입력했을 경우 이메일로도 찾기가 가능하도록 만들었습니다. 이메일 인증은 nodemailer를 사용하여 만들었습니다. </p>
   <img src="https://github.com/kim-museong/Pet-Friends-Project2/assets/130715054/c732dc1a-68c8-48f1-8100-d608ab715593.png"  width=600 height=350 alt="findPasswordPage_img" /> 
</div>











