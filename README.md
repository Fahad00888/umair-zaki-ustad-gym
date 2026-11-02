# Umair Zaki Ustad

Gym website. The site is in `public/`, and its text is in `public/js/content.js`.

Run it on your computer:

    python3 server.py

Then open http://localhost:8080

Publish changes to the live site:

    git add -A && git commit -m "Update site"
    git push origin main
    git subtree push --prefix public origin gh-pages

Online booking requests go to the WhatsApp number or email set in `content.js`. Until one is set, the live site hides the booking form.
