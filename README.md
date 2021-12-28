## 🌐 사이트 주소
https://surim-notion.vercel.app/

## 🎥 시연 영상

![demo](https://user-images.githubusercontent.com/47546413/132133257-d0abc8cb-35d0-4de8-925a-5059ae586953.gif)

<!--
  템플릿은 아직 PR 작성이 익숙하지 않으신 분들을 위해서 제공하는 가이드입니다!
  리뷰어 또는 이 PR을 보게 될 다른 사람들이 이 PR을 보는데 참고할 수 있는 내용이 있다면 포함해서 작성해주시면 됩니다.
-->

## 📌 프로젝트 설명 <!-- 어떤 걸 만들었는지 대략적으로 설명해주세요 -->

### 앱 구조

![structure](https://user-images.githubusercontent.com/47546413/132133273-5a44bbb5-d835-4f9b-baa9-288e8a7bce57.jpeg)

컴포넌트들을 세분화 하여 이벤트 관리가 복잡하다고 느껴졌습니다..
이벤트와 로직을 어떻게 하면 효율적으로 관리할 수 있을지 고민을 하였고,
리액트의 상태 관리 방법을 찾기 위해 `redux`를 찾아보았습니다. 하지만 사용해보지 않았던 개념이라 파악이 어려웠습니다..
짧게나마 사용해보았던 `vuex` 원리에 착안하여 미약하게나마 `store` 형태를 흉내 내 보았습니다..
위와 같이 구현 한 이유는 `store`를 이용해서 한 군데에서 이벤트와 로직을 관리하면 좋겠다 생각하여 해당 구조를 생각하게 되었습니다.

### 데이터 흐름

1. `emit` **하위 컴포넌트**에서 이벤트가 발생합니다. ( Child → Store)
2. `on` **Store**에서 이벤트를 감지합니다. ( Store ← Child)
3. `dispatch` gettersStore를 이용하여 해당하는 로직을 실행한 뒤, 결과가 반영된 데이터를 가져옵니다. (Store)
4. `commit`  변경된 데이터와 렌더링이 필요한 내용을 담아 **App 컴포넌트**에 전달합니다. ( Store → App)
   - APP 컴포넌트의 데이터는 `commit`으로만 변경이 가능합니다.
5. 비동기 통신 이후 처리될 렌더링관련 로직은 `settesrElement`에서 실행됩니다.
6. Store에서 전달받은 내용으로 **APP 컴포넌트**에서 `state`와 `needRender(렌더링이 필요한 컴포넌트)` 하위 컴포넌트로 전달합니다. (App → Child)
7. `state`는 모두 업데이트되지만 `needRender`에 의해 필요한 부분만 다시 렌더링이 됩니다. (App → Child)

### 디렉토리 구조와 역할

- `main.js` : root에 App을 생성
- `App.js`: 최상위 컴포넌트
  - route 처리
  - Store에서 데이터(nextState, needRender)를 받은 뒤, 하위 컴포넌트들에게 전달
- `api` : api관련 js 파일
  - `config` : api기본 설정 파일
  - `notion` : notion api 파일
- `assets` : style에 필요한 요소
  - `css` : css관련 파일 (index, reset, fontello)
  - `font` : 사용된 font (openSans, fontello)
  - `images` : 페이지 내 이미지 (index, 404)
- `components` : 페이지 내 하위 컴포넌트
  - `modal`
    - `Modal.js` : Modal 하위 요소 생성, 동기적인 UI 로직 실행 → Store에 이벤트 emit
    - `ModalBody.js` : Modal의 Title,Content를 렌더링
    - `ModalHeader.js` : Modal 상단의 페이지로 열기, x 버튼 렌더링
  - `posts`
    - `PostsPage.js` : Posts 하위 요소 생성, 동기적인 UI 로직 실행 → Store에 이벤트 emit
    - `PostsPageBody.js` : document 렌더링
    - `PostsPageNoData.js` : index 렌더링
  - `sidebar`
    - `Sidebar.js` : Sidebar 하위 요소 생성, 동기적인 UI 로직 실행 → Store에 이벤트 emit
    - `SidebarHeader.js` : notion 타이틀 렌더링
    - `SidebarBody.js`: document 트리(navlist) 렌더링
    - `SidebarFooter.js` : 새 페이지 버튼 렌더링
- `pages` : 페이지 컴포넌트
  - `MainPage.js`: 하위 컴포넌트 (Sidebar, posts, modal)들을 가지고 있는 컴포넌트
  - `NotFoundPage.js`: 404 Error 페이지 컴포넌트
- `store` : App 컴포넌트 상태 저장소
  - `index.js`
    - `APP`컴포넌트의 상태 변경 (commit)
    - 하위 컴포넌트의 이벤트 감지 후 비동기 작업 진행 (dispatch)
  - `gettersLi.js` : openedLi의 데이터를 가공하여 반환
  - `gettersState.js` : state의 데이터를 가공하여 반환
  - `settersElement.js` : 가공된 state를 이용하여 비동기적인 UI 로직 실행
- `utils` : 유틸 함수
  - `emitter.js`: on과 emit으로 이벤트를 관리
    - on : 이벤트를 바인딩 (감지)
    - emit: 이벤트를 실행
  - `render.js` : 렌더링에 필요한 함수 (Ex. 태그의 스타일, 컨텐츠 변경 등)
  - `selector.js`: 전역으로 사용되는 element 선택관련 함수
  - `templates.js`: 컨텐츠 없는 template 태그를 생성
  - `storage.js`: 스토리지 get, set 함수
  - `valid.js`: getters의 valid를 체크
