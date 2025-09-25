# HalalNestKafur

Local dev instructions

1. Serve the site from project root:
   - Python:
     ```
     python3 -m http.server 8000 --bind 0.0.0.0
     ```
   - Docker (nginx):
     ```
     docker run --rm -v "$PWD":/usr/share/nginx/html:ro -p 8080:80 nginx:alpine
     ```

2. Open in host browser from the dev container:
   ```
   $BROWSER http://localhost:8000
   # or with Docker:
   $BROWSER http://localhost:8080
   ```

3. Google Sign-In setup
   - Create an OAuth 2.0 Client ID in Google Cloud Console (Web application).
   - Add Authorized JavaScript Origins:
     - http://localhost:8000 (or your deployed origin)
   - Replace `YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com` in the HTML files or set a small inline script in `index.html` before `/assets/main.js`:
     ```html
     <script>window.HALALNEST_GSI_CLIENT = 'YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com'</script>
     ```
   - The site uses Google Identity Services (GSI) for simplified sign-in rendering.

4. Notes
   - Styles are in `/assets/styles.css`. Animations and microinteractions live in `/assets/main.js`.
   - To add local images place them into `/assets` and update the markup.
