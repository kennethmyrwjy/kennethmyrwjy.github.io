# 🚀 Quick Deploy to GitHub Pages

## TL;DR - For GitHub Pages

**Your `config.js` is SAFE to commit!** It contains NO secrets.

```bash
# 1. Commit config.js and all changes
git add .
git commit -m "Deploy secure TikTok OAuth to GitHub Pages"
git push origin main

# 2. Wait 1-2 minutes for GitHub Pages to rebuild

# 3. Visit https://kennethmyrwjy.github.io/ and test!
```

---

## ✅ Why config.js is Safe to Commit

### What's IN config.js (All Public):
```javascript
CLIENT_KEY: "sbawjjtuzyd0z5u7fv"           // ✅ Public identifier
REDIRECT_URI: "https://kennethmyrwjy.github.io/callback.html"  // ✅ Public URL  
PROXY_URL: "https://your-proxy.onrender.com"   // ✅ Public endpoint
AUTHORIZE_URL: "https://www.tiktok.com/v2/auth/authorize/"  // ✅ Public API
```

### What's NOT in config.js (The Secret):
```javascript
CLIENT_SECRET: "Qdq5gHGlMppmWIFVgpxqDo18Wa7XQFhO"  // ❌ ONLY in proxy-server/.env
```

**The CLIENT_SECRET is the only secret, and it's ONLY in the backend `.env` file (gitignored).**

---

## 🔒 Security Model

```
Frontend (GitHub Pages - PUBLIC)          Backend (Render/Railway - PRIVATE)
────────────────────────────────          ─────────────────────────────────
config.js                                 .env (gitignored)
├─ CLIENT_KEY     ✅ Public                ├─ CLIENT_KEY     (same)
├─ REDIRECT_URI   ✅ Public                ├─ CLIENT_SECRET  ❌ SECRET!
└─ PROXY_URL      ✅ Public                └─ REDIRECT_URI   (same)
```

---

## 📝 Current Git Status

Run `git status` to see what will be committed:

```
✅ SAFE to commit:
   config.js              (no secrets!)
   .gitignore             (updated)
   SECURITY.md            (updated)
   GITHUB_PAGES.md        (new)
   All other files

❌ NEVER commit:
   proxy-server/.env      (gitignored - contains CLIENT_SECRET)
```

---

## 🚀 Deploy Now

### Step 1: Verify Security

```bash
# Make sure .env is gitignored
git check-ignore proxy-server/.env
# ✅ Should output: proxy-server/.env

# Make sure config.js will be committed (NOT gitignored)
git check-ignore config.js
# ✅ Should output nothing (it's not ignored)

# Make sure no CLIENT_SECRET in tracked files
git ls-files | xargs grep -l "Qdq5gHGlMppmWIFVgpxqDo18Wa7XQFhO" 2>/dev/null
# ✅ Should find nothing
```

### Step 2: Commit Everything

```bash
# Add all files (config.js will be included, .env will be ignored automatically)
git add .

# Commit
git commit -m "feat: Deploy secure TikTok OAuth to GitHub Pages

- config.js added (safe - no CLIENT_SECRET)
- CLIENT_SECRET only in backend .env (gitignored)
- Frontend uses config.js for GitHub Pages
- Security documentation updated
"

# Push
git push origin main
```

### Step 3: Wait and Test

```bash
# Wait 1-2 minutes for GitHub Pages to rebuild

# Then visit your site
open https://kennethmyrwjy.github.io/

# Check browser console (F12)
# Should see NO "CONFIG is not defined" error
```

---

## 🐛 Troubleshooting

### Still seeing "CONFIG is not defined"?

**Cause:** config.js not committed yet

**Fix:**
```bash
# Make sure config.js is staged
git add config.js

# Commit and push
git commit -m "Add config.js for GitHub Pages"
git push origin main

# Wait 1-2 minutes, then hard refresh (Cmd+Shift+R / Ctrl+Shift+R)
```

### Backend not working?

**Cause:** PROXY_URL points to ngrok (temporary)

**Fix:**
1. Deploy backend to Render (see DEPLOYMENT.md)
2. Update config.js:
   ```javascript
   PROXY_URL: "https://your-app.onrender.com",  // Your permanent URL
   ```
3. Commit and push again

---

## 📋 Final Checklist

- [ ] Backend deployed to Render/Railway (or ngrok running locally)
- [ ] config.js has correct PROXY_URL
- [ ] Verified .env is gitignored: `git check-ignore proxy-server/.env`
- [ ] Committed config.js: `git add config.js && git commit -m "..."`
- [ ] Pushed to GitHub: `git push origin main`
- [ ] Waited 1-2 minutes for GitHub Pages rebuild
- [ ] Tested at https://kennethmyrwjy.github.io/
- [ ] No console errors
- [ ] OAuth flow works!

---

**You're done! Your GitHub Pages site is live and secure! 🎉**

For detailed info, see [GITHUB_PAGES.md](GITHUB_PAGES.md)

