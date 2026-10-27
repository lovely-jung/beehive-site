# beehive-site

비하이브(Beehive) 홈페이지. 빌드 없이 GitHub Pages에서 바로 열리는 정적 사이트예요.

## 자주 고칠 곳

- **연락처**: `assets/site.js` 맨 위 `CONTACT`에 이메일·전화·카카오톡 채널 주소를 넣으면 문의 페이지에 자동 반영돼요.
- **사진**: 각 HTML의 `<!-- TODO: ... -->` 주석이 붙은 `picsum.photos` 주소를 실제 사진으로 바꿔 주세요. 사진 파일은 `assets/img/`에 올리고 `src="assets/img/파일이름.jpg"`로 연결하면 돼요.
- **색**: `assets/style.css` 맨 위 `:root`의 `--honey`(꿀색), `--charcoal`(차콜).

## 페이지 구조

`_build/pages/`의 본문에 공통 머리글·바닥글을 붙여 루트의 HTML을 만들어요.
본문을 고친 뒤 `python3 _build/build.py`를 실행하면 루트 HTML이 다시 만들어져요.
(루트 HTML을 바로 고쳐도 사이트에는 반영돼요. 다만 다음 빌드 때 덮어써지니 둘 중 한 곳만 고쳐 주세요.)
