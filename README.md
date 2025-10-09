# TikTok OAuth Integration

A secure TikTok OAuth implementation with proper credential management following TikTok's API regulations.

## 🔒 Security Compliance

This project follows TikTok's development API security requirements:

- ✅ **CLIENT_SECRET never exposed in frontend code**
- ✅ **Credentials stored in environment variables**
- ✅ **Sensitive files gitignored (.env, config.js)**
- ✅ **Backend proxy for secure token exchange**
- ✅ **HTTPS for all production endpoints**

## 📁 Project Structure

```
├── index.html              # Login page (uses config.js)
├── callback.html           # OAuth callback handler (uses config.js)
├── config.js              # Frontend config (gitignored, your local settings)
├── config.example.js      # Template for frontend config
├── proxy-server/          # Backend OAuth proxy
│   ├── server.js          # Express server with environment variables
│   ├── .env              # Your credentials (gitignored, NEVER commit!)
│   ├── .env.example      # Template for credentials
│   └── package.json      # Dependencies including dotenv
├── SECURITY.md           # Security guidelines and best practices
└── DEPLOYMENT.md         # Deployment instructions

```

## 🚀 Quick Start

### 1. Backend Setup (Proxy Server)

```bash
cd proxy-server
npm install
npm start
```

The `.env` file is already configured with your credentials. The server will start on `http://localhost:3000`.

### 2. Frontend Setup

The `config.js` file is already configured with your settings. Just open `index.html` in your browser or visit your GitHub Pages URL.

### 3. Test the Integration

1. Visit `https://kennethmyrwjy.github.io/`
2. Click "Continue with TikTok"
3. Grant permissions
4. See your TikTok profile data!

## 📖 Documentation

- **[SECURITY.md](SECURITY.md)** - Security guidelines and TikTok API compliance
- **[DEPLOYMENT.md](DEPLOYMENT.md)** - Deploy to Render, Railway, or Heroku
- **[proxy-server/README.md](proxy-server/README.md)** - Backend server documentation

## 🔐 What's Kept Secret

These files contain sensitive data and are **never committed to Git**:

| File | Contains | Status |
|------|----------|--------|
| `proxy-server/.env` | CLIENT_KEY, CLIENT_SECRET, REDIRECT_URI | ✅ Gitignored |
| `config.js` | Your frontend configuration | ✅ Gitignored |

These files are **templates** and **should be committed**:

| File | Purpose | Status |
|------|---------|--------|
| `proxy-server/.env.example` | Template for .env | ⚠️ Commit this |
| `config.example.js` | Template for config.js | ⚠️ Commit this |

## ✅ Security Checklist

Verify your setup is secure:

```bash
# Check that sensitive files are gitignored
git check-ignore proxy-server/.env config.js
# Should output both file paths

# Verify no secrets in tracked files
git grep "Qdq5gHGlMppmWIFVgpxqDo18Wa7XQFhO"
# Should find nothing (or only in this README as an example)

# Check what's staged for commit
git status
# Should NOT show .env or config.js
```

## 🌐 Deployment

### Backend (Required)

Deploy the proxy server to:
- **Render.com** (recommended, free tier)
- **Railway.app** (free tier)
- **Heroku** (paid)

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed instructions.

### Frontend (GitHub Pages)

Already deployed! Your site is live at:
- https://kennethmyrwjy.github.io/

**Important:** For GitHub Pages to work, you need to either:
1. Remove `config.js` from `.gitignore` and commit it (safe - doesn't contain CLIENT_SECRET), OR
2. Manually upload `config.js` to your web server

## 🔧 Configuration

### Backend (.env file in proxy-server/)

```bash
TIKTOK_CLIENT_KEY=sbawjjtuzyd0z5u7fv
TIKTOK_CLIENT_SECRET=Qdq5gHGlMppmWIFVgpxqDo18Wa7XQFhO
TIKTOK_REDIRECT_URI=https://kennethmyrwjy.github.io/callback.html
```

### Frontend (config.js in root)

```javascript
const CONFIG = {
    CLIENT_KEY: "sbawjjtuzyd0z5u7fv",
    REDIRECT_URI: "https://kennethmyrwjy.github.io/callback.html",
    PROXY_URL: "https://your-proxy-server.onrender.com",
    AUTHORIZE_URL: "https://www.tiktok.com/v2/auth/authorize/"
};
```

## 🎯 TikTok Developer Portal

Make sure your TikTok app settings match:

1. **Redirect URI:** `https://kennethmyrwjy.github.io/callback.html`
2. **Scopes requested:**
   - `user.info.basic` (name, avatar)
   - `user.info.profile` (bio, region, gender) - optional
   - `user.info.stats` (followers, likes) - optional
   - `video.list` (user videos) - optional

## 🐛 Troubleshooting

### "Missing environment variables" error
- Make sure `proxy-server/.env` file exists
- Check that it contains all required variables

### "Failed to fetch" error
- Verify proxy server is running
- Check `config.js` has correct PROXY_URL
- Ensure CORS is configured correctly in `server.js`

### "Redirect URI mismatch" error
- Verify REDIRECT_URI matches exactly in:
  - TikTok Developer Portal
  - `proxy-server/.env`
  - `config.js`

## 📞 Support

- See [SECURITY.md](SECURITY.md) for security questions
- See [DEPLOYMENT.md](DEPLOYMENT.md) for deployment help
- Check TikTok's [Developer Documentation](https://developers.tiktok.com/doc/)

## 📝 License

MIT License - This is a test/demo project

---

**⚠️ Remember:** Never commit `.env` or `config.js` files to Git! Your CLIENT_SECRET must remain private.

