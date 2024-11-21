## PROJECT: Voir le chemin (길을 보다)
추천하고싶은 여행지나 가보고 싶은 여행지를 마음껏 말해보는 브라우저입니다. 다른 사용자들이 이동한 코스나 맛집에 대한 정보를 구경할 수 있고 본인이 마음에 든 여행지에 대해 북마크를 설정해두고 필요할 때 찾아볼 수 있습니다
![title](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbQrFbQ%2FbtsKO8tfRoT%2FN1ZVKR8pbnGDZbgrIdjY3k%2Fimg.png)   
## 팀원소개 (한솔과 다섯 똘마니 5조)
|팀장|부팀장|팀원|팀원|팀원|팀원|
|:---:|:---:|:---:|:---:|:---:|:---:|
|최한솔|김민지|김민정|박우석|강대은|김지은|
|Mypage|Home|Join|Login|Header,Footer|CreatePost|

## 📖 목차
1. [PROJECT 목표](#PROJECT-목표)
2. [PROJECT 구조](#PROJECT-구조)
3. [기능구현](#기능구현)
4. [개발기간](#개발기간)
5. [기술스택](#기술스택)
6. [와이어프레임](#와이어프레임)
7. [ERD](#ERD)
8. [Trouble Shooting](#trouble-shooting)
    




## PROJECT 목표
- `styled-components`를 이용한 고도화된 컴포넌트 스타일링 기법
-  `context API`를 이용한 리액트 전역상태 관리 방법
- `react-router-dom`을 이용한 라우팅 기법


## PROJECT 구조

![title](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FKHMnO%2FbtsKQyj5sCV%2FY4V1TGBRTjjKWIngOLq2F1%2Fimg.png)   





## 🖥️기능구현
## Login
  - 로그인 컴포넌트</br>
로그인 컴포넌트는 사용자가 이메일과 비밀번호를 입력하여 인증할 수 있는 React 기반 UI 컴포넌트입니다. Supabase를 활용한 인증, 반응형 디자인, 에러 알림 기능을 제공합니다.
1. **사용자 인증**:
   - `supabase.auth.signInWithPassword`를 통해 이메일/비밀번호 인증을 처리합니다.
   - 인증 실패 시 사용자에게 에러 메시지를 제공합니다.
2. **에러 알림**:
   - `react-toastify`를 활용하여 간단하고 직관적인 알림 메시지를 표시합니다.
3. **페이지 이동**:
   - 로그인 성공 시 `Home` 페이지로 리디렉션됩니다.
   - 회원가입(`Join`) 및 비밀번호 찾기(`FindPassword`) 페이지로 이동할 수 있습니다.
4. **반응형 UI**:
   - `styled-components`를 사용하여 직관적이고 모던한 UI를 구현했습니다.</br>
- **입력 필드**:
  사용자 입력은 커스텀 컴포넌트인 `Loginpassword`를 통해 관리됩니다.
  ```jsx
  <Loginpassword
    email={email}
    setEmail={setEmail}
    password={password}
    setPassword={setPassword}
  />

- 로그아웃 컴포넌트 </br>

1. 로그아웃: 사용자가 로그아웃 요청 시 Supabase 인증 세션을 종료하고 로그인 페이지로 리다이렉트합니다.

2. 세션 체크 및 보호된 경로 관리: 사용자의 로그인 상태를 확인하고, 비로그인 사용자가 보호된 경로에 접근하지 못하도록 제한하며 적절한 페이지로 리다이렉트합니다.


- 비밀번호 찾기 컴포넌트 </br>
**비밀번호 찾기(Find Password)** 컴포넌트는 사용자가 비밀번호 재설정 링크를 이메일로 받을 수 있도록 설계되었습니다. Supabase를 이용해 비밀번호 재설정을 요청하며, 입력한 이메일로 재설정 링크를 전송합니다.
1. **이메일 입력**:
   - 사용자가 이메일을 입력할 수 있는 필드를 제공합니다.
2. **비밀번호 재설정 요청**:
   - `supabase.auth.resetPasswordForEmail`을 호출하여 입력된 이메일로 재설정 링크를 전송합니다.
   - 성공/실패 여부에 따라 사용자에게 알림 메시지를 표시합니다.
3. **페이지 이동**:
   - 비밀번호 재설정 링크 전송 후, 로그인 페이지로 돌아갈 수 있습니다.

- **비밀번호 재설정 요청**: 
  `supabase.auth.resetPasswordForEmail`을 호출하여 이메일로 재설정 링크를 전송합니다.
  ```js
  const linkPasswordReset = async () => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: 'http://localhost:5173/ResetPassword'
    });
    if (error) {
      toast.error(`오류가 발생했습니다: ${error.message}`);
    } else {
      toast.success('패스워드 재설정 링크가 이메일로 전송되었습니다.');
    }
  }; 
- 패스워드 재설정 컴포넌트 </br>
패스워드 재설정(Reset Password) 컴포넌트는 사용자가 패스워드를 잊었을 때 새로운 패스워드를 설정할 수 있도록 도와주는 기능을 제공합니다. `supabase` 인증 시스템과 연동되어 사용자를 검증한 뒤 패스워드를 변경할 수 있습니다.

1. **세션 복구**:
   - URL의 `access_token`을 이용해 사용자 세션을 복구합니다.
   - 세션 복구 실패 시 로그인 페이지로 리디렉션합니다.
2. **패스워드 유효성 검사**:
   - 최소 10자 이상, 두 개 이상의 특수문자를 포함해야 합니다.
   - 새 패스워드와 확인용 패스워드가 일치해야 합니다.
3. **패스워드 변경**:
   - 입력된 패스워드를 `supabase.auth.updateUser`를 통해 변경합니다.
   - 성공/실패 여부에 따라 알림 메시지를 표시합니다.
4. **페이지 이동**:
   - 성공적으로 변경되면 로그인 페이지로 이동합니다.

- **세션 복구**:
  URL에서 `access_token`을 가져와 세션을 복구합니다.
  ```js
  const { error } = await supabase.auth.setSession({
    access_token: accessToken,
    refresh_token: accessToken,
  });
  if (error) {
    toast.error('세션 복구 실패. 다시 로그인해주세요.');
    navigate('/');
    return;
  }
## Home
1. 리스트 영역 : 작성한 사용자의 프로필, 닉네임, 현재 시간으로부터 작성한 시간, 업로드한 사진, 내용이 노출되게 구현하였습니다.

2. 더보기 버튼 : 수정을 클릭하면 해당 게시글의 수정페이지로 이동하게 react router dom으로 구현하였고, 삭제를 클릭하면 해당 게시글이 삭제가 되게 supabase posts 컬럼에 반영되게 하였습니다.

3. 댓글 : 게시글의 각 댓글을 클릭하면 각 게시글의 해당 댓글이 보이게 구현하였고, 댓글 작성 및 댓글 취소, 댓글 삭제까지 구현하였습니다. 실시간으로 작성하면 적용되게 supabase comments 컬럼에 반영하였습니다.

4. 좋아요 버튼 : 각 사용자마다 좋아요를 클릭하면 supabase likes 칼럼에 추가되게 하였고, 다시 한번 클릭하면 삭제되게 하였습니다. 로그인시 사용자 id를 필터링하여 사용자가 좋아요를 눌렀는지 ui에 반영되게 하였습니다.    

5. 작성하기 버튼 : 작성하기 버튼을 클릭하면 게시글 작성 페이지로 넘어가게 react router dom으로 구현하였습니다

## Mypage
1. 닉네임 수정기능: 수퍼베이스에 있는 user_nick_name컬럼을 가져와서 수정버튼을 누르면 실시간으로 반영되지 않게 만들었으며 수정즉시 수퍼베이스 user_nick_name컬럼에 반영됩니다.

2. 프로필 수정기능: 닉네임수정하는 원리와 동일하게 수퍼베이스에 user_profile_image컬럼에 반영됩니다.

3. 게시글 렌더링: 과거에 쓴 게시글을 모두 모아 볼 수 있도록 하였고 3개만 제한하여 보이도록 하였습니다.

4. 좋아요 수: 수퍼베이스에서 likes_count컬럼을 가져와 렌더링되도록 하였습니다.

## Join
  1. 유효성 검사 : 네이버 이메일 주소만 기입이 가능하고 비밀번호는 10글자 이상, 특수기호 2자 이상 포함, 이메일과 닉네임 중복 확인 후 가입이 가능하게 구현하였습니다.

  2. supabase 연동 : 이메일, 비밀번호는 auth에 저장하고 이메일, 닉네임은 users 테이블에 저장되도록 구현하였습니다.


## CreatePost
1. 게시물 내용을 위한 텍스트 영역 : 사용자가 게시물 내용을 입력할 수 있는 텍스트 영역을 구형하였습니다.

2. 이미지 업로드 및 미리보기 기능 : 이미지를 선택하면 미리보기가 제공되며, 미리보기에서 이미지를 삭제하는 기능을 제공하여 사용자가 이미지를 자유롭게 선택하고 취소 할 수 있습니다.

3. 다중 이미지 업로드 지원 (최대 3개) : 최대 3개의 이미지를 업로드할 수 있으며, 이미지를 Supabase 스토리지에 업로드하고 URL을 생성합니다.

4. 기존 게시물 수정 모드 : 편집 모드일 때 Supabase에서 특정 ID의 게시물을 가져와서 내용을 설정하여 기존 게시물 데이터를 불러옵니다.

5. 게시물 업로드/수정 버튼: 현재 모드(작성/수정)에 따라 적절한 텍스트 표시하였습니다.

6.  취소 버튼: 작성 중인 내용을 취소하고 홈 페이지로 이동 하게 구현하였습니다.

## Header
1. mypage에서 프로필을 수정하면 header에 있는 닉네임과 프로필사진이 같이 적용됩니다.

2. header에 있는 로고를 클릭하면 home으로 이동하고 프로필사진을 누르면 mypage로 이동합니다.
    

## ⏲️개발기간 
2024.11.15(월)~2024.11.21(목)

## 📚️ 기술스택
![Context-API](https://img.shields.io/badge/Context--Api-000000?style=for-the-badge&logo=react)
![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)
![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Vercel](https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white)





## 와이어프레임
![title](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbicSc8%2FbtsKP9krGUy%2FVkAKi4b4kcOQC7LvUI7MH1%2Fimg.png)
![title](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FdEYi0F%2FbtsKQfdY5k4%2FBi62lXGp3fNb1mdEz0IEm0%2Fimg.png)




## ERD
![title](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2Fq9EOm%2FbtsKQ43NT2w%2FupJAB8FcbXrfziXdFM3dEK%2Fimg.png)





## Trouble Shooting
