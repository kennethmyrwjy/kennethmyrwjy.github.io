# 🚀 Deployment Guide

## Overview

This TikTok OAuth app has two parts:
1. **Frontend** (GitHub Pages) - Static HTML/JS files
2. **Backend** (Proxy Server) - Node.js server for secure token exchange

## 📦 What You Need

- GitHub account (for frontend hosting)
- Render/Railway/Heroku account (for backend hosting)
- TikTok Developer account with approved app

---

## 1️⃣ Deploy Backend (Proxy Server)

The backend must be deployed first so you can get the PROXY_URL for frontend configuration.

### Option A: Render.com (Recommended - Free Tier)

1. **Sign up** at https://render.com

2. **Create Web Service:**
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Select your repo

3. **Configure Service:**
   - **Name:** `tiktok-oauth-proxy` (or your choice)
   - **Root Directory:** `proxy-server`
   - **Environment:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`

4. **Add Environment Variables:**
   Click "Environment" tab and add:
   ```
   TIKTOK_CLIENT_KEY=sbawjjtuzyd0z5u7fv
   TIKTOK_CLIENT_SECRET=Qdq5gHGlMppmWIFVgpxqDo18Wa7XQFhO
   TIKTOK_REDIRECT_URI=https://kennethmyrwjy.github.io/callback.html
   ```
   
   ⚠️ **Replace with your actual credentials!**

5. **Deploy:**
   - Click "Create Web Service"
   - Wait for deployment (2-3 minutes)
   - Copy your URL: `https://your-app.onrender.com`

6. **Test Backend:**
   ```bash
   curl https://your-app.onrender.com/
   # Should return: {"status":"TikTok OAuth Proxy is running!"}
   ```

### Option B: Railway.app

1. Go to https://railway.app
2. Click "New Project" → "Deploy from GitHub"
3. Select your repository
4. Add environment variables (same as above)
5. Deploy and copy your URL
6. Update frontend config

### Option C: Heroku

```bash
cd proxy-server
heroku create your-app-name
heroku config:set TIKTOK_CLIENT_KEY=sbawjjtuzyd0z5u7fv
heroku config:set TIKTOK_CLIENT_SECRET=Qdq5gHGlMppmWIFVgpxqDo18Wa7XQFhO
heroku config:set TIKTOK_REDIRECT_URI=https://kennethmyrwjy.github.io/callback.html
git push heroku main
```

---

## 2️⃣ Configure Frontend

Now that you have your backend URL, configure the frontend:

### Update config.js

1. **Copy the template:**
   ```bash
   cp config.example.js config.js
   ```

2. **Edit config.js:**
   ```javascript
   const CONFIG = {
       CLIENT_KEY: "sbawjjtuzyd0z5u7fv",  // Your TikTok Client Key
       REDIRECT_URI: "https://kennethmyrwjy.github.io/callback.html",  // Your GitHub Pages URL
       PROXY_URL: "https://your-app.onrender.com",  // ⬅️ Your deployed backend URL
       AUTHORIZE_URL: "https://www.tiktok.com/v2/auth/authorize/"
   };
   ```

3. **For GitHub Pages, you have two options:**

   **Option A: Commit config.js (Recommended for simplicity)**
   ```bash
   # Remove config.js from .gitignore
   # Edit .gitignore and delete the line "config.js"
   git add config.js
   git commit -m "Add frontend configuration"
   git push origin main
   ```
   
   ✅ **This is safe** because config.js doesn't contain CLIENT_SECRET

   **Option B: Keep it private (Manual deployment)**
   - Keep `config.js` in `.gitignore`
   - Manually upload to your web server
   - Not ideal for GitHub Pages

---

## 3️⃣ Deploy Frontend (GitHub Pages)

Your frontend is already on GitHub Pages! Just push your changes.

### Enable GitHub Pages (if not already enabled):

1. Go to your repo on GitHub
2. Settings → Pages
3. Source: `Deploy from branch`
4. Branch: `main` or `master`
5. Folder: `/ (root)`
6. Save

### Push Updates:

```bash
git add .
git commit -m "Configure for production deployment"
git push origin main
```

Wait 1-2 minutes for GitHub Pages to rebuild.

---

## 4️⃣ Update TikTok Developer Portal

Make sure your TikTok app settings match your deployment:

1. Go to https://developers.tiktok.com/
2. Select your app
3. **Redirect URI:** Must be exactly `https://kennethmyrwjy.github.io/callback.html`
4. **Scopes:** Ensure these are approved:
   - `user.info.basic`
   - `user.info.profile` (optional)
   - `user.info.stats` (optional)
   - `video.list` (optional)

---

## 5️⃣ Test Your Deployment

### Test Backend:
```bash
curl https://your-app.onrender.com/
# Should return JSON with status message
```

### Test Frontend:
1. Visit `https://kennethmyrwjy.github.io/`
2. Click "Continue with TikTok"
3. Authorize the app
4. Should see your profile data!

### Check Browser Console:
- Open DevTools (F12)
- Console tab should show successful token exchange
- Network tab should show successful API calls

---

## 🔧 Troubleshooting

### "Failed to fetch" Error
- **Cause:** Backend not accessible
- **Fix:** 
  - Check if backend URL is correct in `config.js`
  - Verify backend is running (visit the URL in browser)
  - Check backend logs for errors

### CORS Error
- **Cause:** Frontend domain not in backend's allowed origins
- **Fix:** Update `proxy-server/server.js` CORS config:
  ```javascript
  app.use(cors({
      origin: [
          'https://kennethmyrwjy.github.io',  // Add your domain here
          'http://localhost:5500'
      ],
      credentials: true
  }));
  ```

### "Invalid client_key" Error
- **Cause:** Wrong credentials in backend
- **Fix:** Check environment variables in hosting platform match TikTok Developer Portal

### "Redirect URI mismatch" Error
- **Cause:** REDIRECT_URI doesn't match TikTok Developer Portal
- **Fix:** 
  - Backend `.env`: `TIKTOK_REDIRECT_URI=https://kennethmyrwjy.github.io/callback.html`
  - Frontend `config.js`: Same URL
  - TikTok Portal: Same URL (must match exactly!)

---

## 📊 Monitoring

### Check Backend Logs:

**Render.com:**
- Dashboard → Your Service → Logs tab

**Railway.app:**
- Project → Deployments → View Logs

**Heroku:**
```bash
heroku logs --tail
```

### Check Frontend:
- Browser DevTools → Console tab
- Browser DevTools → Network tab

---

## 🔄 Updating

### Update Backend:
1. Make changes to `proxy-server/`
2. Commit and push to GitHub
3. Render/Railway will auto-deploy (if connected to Git)
4. Or manually deploy via platform dashboard

### Update Frontend:
1. Make changes to HTML/JS files
2. Update `config.js` if needed
3. Commit and push to GitHub
4. GitHub Pages auto-deploys in 1-2 minutes

---

## 📝 Environment Variables Reference

### Backend (.env or hosting platform):
```bash
TIKTOK_CLIENT_KEY=sbawjjtuzyd0z5u7fv
TIKTOK_CLIENT_SECRET=Qdq5gHGlMppmWIFVgpxqDo18Wa7XQFhO
TIKTOK_REDIRECT_URI=https://kennethmyrwjy.github.io/callback.html
PORT=3000  # Optional, hosting platforms set this automatically
```

### Frontend (config.js):
```javascript
const CONFIG = {
    CLIENT_KEY: "sbawjjtuzyd0z5u7fv",
    REDIRECT_URI: "https://kennethmyrwjy.github.io/callback.html",
    PROXY_URL: "https://your-app.onrender.com",
    AUTHORIZE_URL: "https://www.tiktok.com/v2/auth/authorize/"
};
```

---

## ✅ Deployment Checklist

- [ ] Backend deployed and running
- [ ] Backend environment variables set
- [ ] Backend health check passing (visit URL in browser)
- [ ] Frontend `config.js` updated with backend URL
- [ ] Frontend pushed to GitHub
- [ ] GitHub Pages enabled and building successfully
- [ ] TikTok Developer Portal redirect URI matches
- [ ] TikTok Developer Portal scopes approved
- [ ] Test login flow end-to-end
- [ ] Check browser console for errors
- [ ] Verify user data displays correctly

---

## 🎉 You're Done!

Your TikTok OAuth app should now be fully deployed and secure! 🚀

For security best practices, see `SECURITY.md`.

