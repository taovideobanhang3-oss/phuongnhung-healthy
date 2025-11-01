PHUONGNHUNG-HEALTHY Full (Organic V1)

Included files:
- index.html (home, menu today, reviews, contact)
- menu.html (full menu with search)
- blog.html (vlog)
- admin.html (admin quick links)
- assets/style.css, assets/main.js, assets/admin.js, assets/hero.jpg, assets/favicon.png
- data/reviews.json (manual reviews editable)

Google Sheet CSV URL used (read-only): https://docs.google.com/spreadsheets/d/1kPWwVqBI4y4EueHCf8RaeqIOOWOmQ1bi7Ib9zcAq0xk/export?format=csv&gid=0

How to deploy:
1) Create repo 'phuongnhung-healthy' in your GitHub account.
2) Upload all files from this package to repo root (Add file -> Upload files).
3) Commit to main branch.
4) Settings -> Pages -> Source: Deploy from a branch -> Branch: main, Folder: / (root). Save.
5) Wait 1-5 minutes. Site will be available at https://<your-github>.github.io/phuongnhung-healthy/

How to manage menu:
- Open Google Sheet: https://docs.google.com/spreadsheets/d/1kPWwVqBI4y4EueHCf8RaeqIOOWOmQ1bi7Ib9zcAq0xk/edit
- Columns expected: group,name,description,price,show,image
- Set 'show' to TRUE to display item, FALSE to hide.
- Changes are reflected automatically on the site via published CSV.

Reviews & moderation:
- Reviews are loaded from data/reviews.json (manual) by default.
- To auto-load Google Maps reviews, you can use Google Places API (requires API key).
- To hide a review, edit data/reviews.json and remove or set a flag (then re-upload to repo).

Floating chat:
- Messenger -> https://m.me/phuongnhunghealthy
- Zalo (placeholder) -> https://zalo.me/0902032188 (replace with Zalo OA link if available)

SEO tips included in code: meta tags, schema.org Restaurant markup.

Contact: 0902032188, Fanpage: https://www.facebook.com/phuongnhunghealthy/
