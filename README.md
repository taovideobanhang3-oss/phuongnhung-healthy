
PHUONGNHUNGHEALTHY - Organic Premium (Full 5 pages)

Files included:
- index.html, menu.html, feedback.html, blog.html, contact.html
- assets/: style.css, main.js, zalo.png, messenger.png, favicon.png
- data/reviews.json (sample)
- README.md

How to deploy (GitHub Pages):
1) Create a new GitHub repository (e.g. phuongnhunghealthy).
2) Upload all files from this package to the repository root.
3) Settings -> Pages -> Source: Branch main (or master) -> Folder: / (root) -> Save.
4) Wait 1-3 minutes and open: https://<your-github-username>.github.io/<repo-name>/

Google Sheet menu:
- The site reads menu from the sheet via gviz JSON URL:
  https://docs.google.com/spreadsheets/d/1kPWwVqBI4y4EueHCf8RaeqIOOWOmQ1bi7Ib9zcAq0xk/gviz/tq?tqx=out:json
- Make sure the Google Sheet is shared "Anyone with the link" -> Viewer.
- Expected headers: group,name,description,price,show,image

Order form:
- The order form in this package is a front-end stub that opens Messenger after submit.
- To auto-save orders to Google Sheet, deploy a Google Apps Script Web App and point the form to it.

Notes:
- Replace placeholder images in assets/ with real photos for best appearance.
- If menu not showing, check sheet sharing & header names.
