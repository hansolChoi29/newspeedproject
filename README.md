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





## 기능구현

- mypage
1) 닉네임 수정기능: 수퍼베이스에 있는 user_nick_name컬럼을 가져와서 수정버튼을 누르면 실시간으로 반영되지 않게 만들었으며 수정즉시 수퍼베이스 user_nick_name컬럼에 반영됩니다.

2) 프로필 수정기능: 닉네임수정하는 원리와 동일하게 수퍼베이스에 user_profile_image컬럼에 반영됩니다.

3) 게시글 렌더링: 과거에 쓴 게시글을 모두 모아 볼 수 있도록 하였고 3개만 제한하여 보이도록 하였습니다.

4) 좋아요 수: 수퍼베이스에서 likes_count컬럼을 가져와 렌더링되도록 하였습니다.




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
