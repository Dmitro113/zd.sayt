#!/usr/bin/env python3
"""Створює відсутні сторінки сайту за структурою розділів.

Файли, які вже існують, НЕ перезаписуються — ваш текст у безпеці.
Щоб додати клас або розділ: змініть списки нижче, ті самі зміни внесіть
на початку script.js і запустіть:  python3 build_pages.py
"""
from pathlib import Path

BASE = Path(__file__).resolve().parent
SITE_NAME = 'Назва сайту'
GRADES = [5, 6, 7, 8, 9]

# (назва файлу, назва розділу, [підрозділи: (назва файлу, назва)])
STUDENT_TOPICS = [
    ('games', 'Розвиваючі розваги (Ігри)', []),
    ('schedule', 'Розклад занять', []),
    ('materials', 'Матеріали', []),
    ('videos', 'Відеоуроки', []),
    ('tasks', 'Завдання', [('tests', 'Тести'), ('practice', 'Практичні завдання')]),
    ('useful', 'Корисно', []),
]

TEACHER_TOPICS = [
    ('materials', 'Матеріали', []),
    ('programs', 'Модельні програми', []),
    ('textbooks', 'Підручники', []),
    ('planning', 'Календарно-тематичне планування', []),
    ('useful', 'Корисно', []),
]

SECTIONS = [
    {'folder': 'students', 'label': 'Учням/Батькам', 'hub': 'students-parents.html',
     'who': 'для учнів і батьків', 'topics': STUDENT_TOPICS},
    {'folder': 'teachers', 'label': 'Вчителям', 'hub': 'teachers.html',
     'who': 'для вчителів', 'topics': TEACHER_TOPICS},
]

TEMPLATE = """<!DOCTYPE html>
<html lang="uk">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{title} — {site}</title>
  <link rel="stylesheet" href="{root}style.css">
  <script src="{root}script.js" defer></script>
</head>
<body data-root="{root}">

  <header class="header" id="site-header"></header>

  <main>
    <section class="page-head">
      <div class="container">
        <nav class="breadcrumbs" aria-label="Шлях до сторінки">{crumbs}</nav>
        <h1>{h1}</h1>
        <p>{lead}</p>
      </div>
    </section>

    <section class="section">
      <div class="container">
        {body}
      </div>
    </section>
  </main>

  <footer class="footer" id="site-footer"></footer>

</body>
</html>
"""

created = 0
skipped = 0


def write_page(rel, title, lead, crumbs, body):
    """crumbs — список (назва, шлях від кореня сайту); остання — поточна сторінка."""
    global created, skipped
    path = BASE / rel
    if path.exists():
        skipped += 1
        return
    path.parent.mkdir(parents=True, exist_ok=True)

    root = '../' * (len(Path(rel).parts) - 1)
    parts = []
    for i, (label, href) in enumerate(crumbs):
        if i == len(crumbs) - 1:
            parts.append(f'<span aria-current="page">{label}</span>')
        else:
            parts.append(f'<a href="{root}{href}">{label}</a>')

    path.write_text(
        TEMPLATE.format(
            title=title,
            site=SITE_NAME,
            root=root,
            crumbs='<span aria-hidden="true"> / </span>'.join(parts),
            h1=crumbs[-1][0],
            lead=lead,
            body=body,
        ),
        encoding='utf-8',
    )
    created += 1


def cards(items):
    """items — список (назва, посилання, опис)."""
    lines = ['<div class="cards">']
    for label, href, text in items:
        lines.append(
            f'  <a class="card" href="{href}"><h3>{label}</h3><p>{text}</p></a>'
        )
    lines.append('</div>')
    return '\n        '.join(lines)


def placeholder(label, who, grade):
    return (
        f'<p class="placeholder">Тут з\'являться матеріали розділу «{label}» {who} {grade} класу.</p>\n'
        '        <p class="placeholder">Замініть цей текст власним наповненням.</p>'
    )


for sec in SECTIONS:
    folder, who = sec['folder'], sec['who']
    for g in GRADES:
        grade_label = f'{g} клас'
        grade_rel = f'{folder}/{g}/index.html'
        top = [('Головна', 'index.html'), (sec['label'], sec['hub'])]
        grade_crumb = top + [(grade_label, grade_rel)]

        # Сторінка класу зі списком розділів
        write_page(
            grade_rel,
            f'{grade_label} — {sec["label"]}',
            f'{sec["label"]}: розділи для {g} класу.',
            grade_crumb,
            cards([
                (label, f'{slug}.html', f'Розділ «{label}» для {g} класу.')
                for slug, label, _ in sec['topics']
            ]),
        )

        for slug, label, subs in sec['topics']:
            rel = f'{folder}/{g}/{slug}.html'
            topic_crumb = [
                *top, (grade_label, grade_rel), (label, rel),
            ]
            if subs:
                body = cards([
                    (sub_label, f'{sub_slug}.html', f'{sub_label} для {g} класу.')
                    for sub_slug, sub_label in subs
                ])
            else:
                body = placeholder(label, who, g)

            write_page(rel, f'{label} — {grade_label}',
                       f'{sec["label"]} · {grade_label}', topic_crumb, body)

            for sub_slug, sub_label in subs:
                sub_rel = f'{folder}/{g}/{sub_slug}.html'
                write_page(
                    sub_rel,
                    f'{sub_label} — {grade_label}',
                    f'{sec["label"]} · {grade_label} · {label}',
                    [*topic_crumb, (sub_label, sub_rel)],
                    placeholder(sub_label, who, g),
                )

print(f'Створено сторінок: {created}, пропущено (уже існують): {skipped}')
