// Frontend Configuration Template
// Copy this file to config.js and update with your values
// Note: config.js is gitignored to keep your setup private

const CONFIG = {
    // TikTok App Client Key (public, safe to expose in frontend)
    CLIENT_KEY: "your_client_key_here",

    // OAuth Redirect URI (must match TikTok Developer Portal)
    REDIRECT_URI: "https://kennethmyrwjy.github.io/callback.html",

    // Your deployed proxy server URL
    PROXY_URL: "https://faceless-deafeningly-geralyn.ngrok-free.dev",

    // TikTok OAuth endpoint (don't change this)
    AUTHORIZE_URL: "https://www.tiktok.com/v2/auth/authorize/"
};

// DO NOT include CLIENT_SECRET here - it should ONLY be in the backend proxy server!

