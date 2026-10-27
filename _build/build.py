"""공통 머리글/바닥글을 붙여 HTML 페이지를 만들어요. (저장소에는 결과 HTML만 올립니다)"""
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SRC = Path(__file__).resolve().parent / "pages"

LOGO = ('<svg viewBox="0 0 32 36" aria-hidden="true"><path d="M16 0 32 9v18L16 36 0 27V9z" fill="var(--honey)"/>'
        '<path d="M16 10.5 23 14.5v7L16 25.5 9 21.5v-7z" fill="var(--charcoal)"/></svg>')

NAV = [("index.html", "홈"), ("education.html", "교육"), ("studio.html", "스튜디오"), ("about.html", "소개")]


def header(active):
    items = "".join(
        f'<a href="{h}"{" aria-current=\"page\"" if h == active else ""}>{t}</a>' for h, t in NAV
    )
    return f'''<header class="site-header">
  <div class="wrap nav">
    <a class="brand" href="index.html" aria-label="비하이브 홈">{LOGO}<span>beehive <small>비하이브</small></span></a>
    <button class="menu-btn" type="button" aria-label="메뉴 열기" aria-expanded="false"><i class="ph ph-list"></i></button>
    <nav class="nav-links" aria-label="주요 메뉴">{items}<a class="btn btn-honey" href="contact.html"{" aria-current=\"page\"" if active == "contact.html" else ""}>문의하기</a></nav>
  </div>
</header>'''


FOOTER = f'''<footer class="site-footer">
  <div class="wrap foot">
    <div>
      <div class="brand">{LOGO}<span>beehive</span></div>
      <p>배움과 이야기를 짓는 곳, 비하이브</p>
      <p>&copy; <span data-year></span> Beehive. All rights reserved.</p>
    </div>
    <nav aria-label="바닥글 메뉴">
      <a href="education.html">교육</a><a href="studio.html">스튜디오</a><a href="about.html">소개</a><a href="contact.html">문의하기</a>
    </nav>
  </div>
</footer>'''


def page(name, title, desc, body):
    return f'''<!doctype html>
<html lang="ko">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{title}</title>
<meta name="description" content="{desc}">
<meta property="og:title" content="{title}">
<meta property="og:description" content="{desc}">
<meta name="theme-color" content="#e9a915">
<link rel="icon" href="assets/favicon.svg" type="image/svg+xml">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css">
<link rel="stylesheet" href="https://unpkg.com/@phosphor-icons/web@2.1.1/src/regular/style.css">
<link rel="stylesheet" href="assets/style.css">
</head>
<body>
{header(name)}
<main>
{body}
</main>
{FOOTER}
<script src="assets/site.js"></script>
</body>
</html>
'''


for f in sorted(SRC.glob("*.html")):
    lines = f.read_text(encoding="utf-8").split("\n", 2)
    title = lines[0].removeprefix("<!--title:").removesuffix("-->").strip()
    desc = lines[1].removeprefix("<!--desc:").removesuffix("-->").strip()
    (ROOT / f.name).write_text(page(f.name, title, desc, lines[2]), encoding="utf-8")
    print("built", f.name)

(ROOT / "assets" / "favicon.svg").write_text(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 36"><path d="M16 0 32 9v18L16 36 0 27V9z" fill="#e9a915"/>'
    '<path d="M16 10.5 23 14.5v7L16 25.5 9 21.5v-7z" fill="#23262b"/></svg>', encoding="utf-8")
