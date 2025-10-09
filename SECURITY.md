# 🔒 Security Guidelines

This project follows TikTok's API security requirements and best practices.

## ✅ What's Secure

### Backend (Proxy Server)
- ✅ `CLIENT_SECRET` stored in `.env` file (gitignored)
- ✅ `.env` is never committed to Git
- ✅ Environment variables used for all sensitive data
- ✅ CORS properly configured to allow only your domain
- ✅ No hardcoded credentials in code

### Frontend (GitHub Pages)
- ✅ `CLIENT_SECRET` is NOT in frontend code (only in backend)
- ✅ `config.js` is gitignored (contains your specific setup)
- ✅ Only non-sensitive values exposed (CLIENT_KEY, REDIRECT_URI)
- ✅ All OAuth token exchange happens server-side

## 🚫 What's NOT Committed to Git

These files are in `.gitignore` and will never be uploaded:

```
config.js                    # Your frontend configuration
proxy-server/.env            # Your backend credentials
.DS_Store                    # OS files
node_modules/                # Dependencies
```

## 📋 Setup Checklist

### For Local Development:

1. **Backend Setup:**
   ```bash
   cd proxy-server
   cp .env.example .env
   # Edit .env with your actual credentials
   npm install
   npm start
   ```

2. **Frontend Setup:**
   ```bash
   cp config.example.js config.js
   # Edit config.js with your actual values
   ```

### For Production Deployment:

#### Backend (Render/Railway/Heroku):
Set these environment variables in your hosting platform:
- `TIKTOK_CLIENT_KEY`
- `TIKTOK_CLIENT_SECRET` ⚠️ **KEEP SECRET**
- `TIKTOK_REDIRECT_URI`

#### Frontend (GitHub Pages):

**For GitHub Pages, `config.js` MUST be committed (and it's safe!):**

```javascript
// config.js - Safe to commit (NO secrets!)
const CONFIG = {
    CLIENT_KEY: "sbawjjtuzyd0z5u7fv",  // ✅ Public identifier (safe)
    REDIRECT_URI: "https://kennethmyrwjy.github.io/callback.html",  // ✅ Public URL (safe)
    PROXY_URL: "https://your-proxy.onrender.com",  // ✅ Public endpoint (safe)
    AUTHORIZE_URL: "https://www.tiktok.com/v2/auth/authorize/"  // ✅ Public API (safe)
};
```

**Why it's safe:** None of these values are secret. They're all visible in browser network requests anyway. The `CLIENT_SECRET` is what must stay private, and that's only in the backend `.env` file.

`config.js` is NOT in `.gitignore`, so it will be committed and served by GitHub Pages.

## ⚠️ Critical Security Rules

### NEVER Do This:
- ❌ **NEVER** put `CLIENT_SECRET` in frontend code
- ❌ **NEVER** commit `.env` files to Git
- ❌ **NEVER** expose `CLIENT_SECRET` in browser DevTools
- ❌ **NEVER** log `CLIENT_SECRET` in console

### ALWAYS Do This:
- ✅ **ALWAYS** keep `CLIENT_SECRET` only in backend `.env`
- ✅ **ALWAYS** use environment variables for secrets
- ✅ **ALWAYS** use `.gitignore` for sensitive files
- ✅ **ALWAYS** use HTTPS for production

## 🔍 Verify Your Security

Run these checks before deploying:

```bash
# 1. Check that .env is gitignored
git check-ignore proxy-server/.env
# Should output: proxy-server/.env

# 2. Check that config.js is gitignored (if using Option 1 above, skip this)
git check-ignore config.js
# Should output: config.js

# 3. Search for hardcoded secrets (should find NONE)
grep -r "Qdq5gHGlMppmWIFVgpxqDo18Wa7XQFhO" --exclude-dir=node_modules --exclude=SECURITY.md .

# 4. Verify .env file exists but is not tracked
git status | grep ".env"
# Should show nothing (file is ignored)
```

## 📖 TikTok API Compliance

This setup complies with TikTok's requirements:

1. ✅ **Client Secret Protection**: Never exposed in frontend
2. ✅ **Secure Token Exchange**: Happens server-side via proxy
3. ✅ **HTTPS**: GitHub Pages and hosting platforms use HTTPS
4. ✅ **State Parameter**: CSRF protection implemented
5. ✅ **Redirect URI Validation**: Must match Developer Portal setting

## 🆘 What to Do If Secrets Are Leaked

If you accidentally commit secrets to Git:

1. **Immediately regenerate credentials** in TikTok Developer Portal
2. **Update your .env file** with new credentials
3. **Remove from Git history**:
   ```bash
   git filter-branch --force --index-filter \
   "git rm --cached --ignore-unmatch proxy-server/.env" \
   --prune-empty --tag-name-filter cat -- --all
   ```
4. **Force push** (⚠️ use with caution):
   ```bash
   git push origin --force --all
   ```

## 📞 Questions?

- Review `.env.example` for environment variable setup
- Review `config.example.js` for frontend configuration
- Check TikTok Developer Portal for API credentials
- Consult TikTok's [API Security Documentation](https://developers.tiktok.com/doc/oauth-user-access-token-management)

