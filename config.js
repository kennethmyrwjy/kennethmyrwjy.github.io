// Frontend Configuration for GitHub Pages
// This file contains ONLY public configuration (NO secrets!)
// ✅ SAFE to commit to GitHub - CLIENT_SECRET is NOT here (it's only in backend .env)

const CONFIG = {
    // TikTok App Client Key (public, safe to expose in frontend)
    CLIENT_KEY: "sbawjjtuzyd0z5u7fv",

    // OAuth Redirect URI (must match TikTok Developer Portal)
    REDIRECT_URI: "https://kennethmyrwjy.github.io/callback.html",

    // Your deployed proxy server URL
    PROXY_URL: "https://faceless-deafeningly-geralyn.ngrok-free.dev",

    // TikTok OAuth endpoint (don't change this)
    AUTHORIZE_URL: "https://www.tiktok.com/v2/auth/authorize/"
};

// WARNING: NEVER include CLIENT_SECRET in frontend code!
// CLIENT_SECRET must ONLY exist in the backend proxy server's .env file

