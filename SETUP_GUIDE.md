# TikTok Developer API Test Project - Setup Guide

## ⚠️ IMPORTANT: You Need a Proxy Server!

**The token exchange errors you're seeing are because TikTok blocks direct browser requests to their OAuth token endpoint.** This is a security feature - the CLIENT_SECRET should never be exposed in frontend code.

### The Real Problem

The error `"access_token_invalid"` and `"Unsupported path(Janus)"` indicate that:
1. ✅ Your OAuth flow is correct
2. ✅ Your code structure is good
3. ❌ **But TikTok rejects direct browser-to-TikTok token exchange**

### The Solution

You **MUST** use a backend proxy server to handle token exchange. I've created one for you in the `proxy-server/` folder.

---

## Quick Start (2 Steps)

### Step 1: Start the Proxy Server

```bash
cd proxy-server
npm install
npm start
```

The server will run at `http://localhost:3000`

### Step 2: Test Your App

1. Go to `https://kennethmyrwjy.github.io/` (your GitHub Pages site)
2. Click "Continue with TikTok"
3. Grant permissions
4. You should now see user data and videos! 🎉

---

## Why You're Getting Errors Without the Proxy

### 1. **TikTok Developer Portal Configuration**
   
Even if users check all scopes in your UI, those scopes must be **approved in your TikTok Developer Portal**. Here's what to check:

#### Go to: https://developers.tiktok.com/

1. **Login** to your TikTok for Developers account
2. Navigate to **"Manage Apps"** → Select your app (`sbawjjtuzyd0z5u7fv`)
3. Go to **"Add Products"** or **"Permissions"** section
4. **Request these scopes** if not already approved:
   - ✅ `user.info.basic` - Basic profile info (name, avatar)
   - ✅ `user.info.profile` - Extended profile (bio, region, gender, signup time)
   - ✅ `user.info.stats` - User statistics (followers, following, likes, video count)
   - ✅ `video.list` - Access user's video list

5. **Submit for review** if required (some scopes need TikTok approval)
6. Check your app's **status** - it may need to be "Live" or "In Production"

### 2. **Scope vs API Field Mismatch**

Your `callback.html` requests many fields that require specific scopes:

| API Field | Required Scope |
|-----------|---------------|
| `display_name`, `avatar_url`, `open_id` | `user.info.basic` |
| `bio_description`, `region`, `gender`, `signup_time`, `profile_deep_link` | `user.info.profile` |
| `follower_count`, `following_count`, `likes_count`, `video_count` | `user.info.stats` |
| Video list endpoint | `video.list` |

**If any required scope is missing or not approved, the API call will fail.**

### 3. **User Authorization**

Even with approved scopes in the Developer Portal, users must:
- See the permission request during TikTok login
- Actually grant those permissions
- Not have previously denied those permissions

---

## Testing Checklist

To successfully test your app:

- [ ] All 4 scopes are **requested** in your TikTok Developer Portal app settings
- [ ] All 4 scopes are **approved** (check approval status)
- [ ] Your app is in the correct environment (Development/Production)
- [ ] The redirect URI in Developer Portal matches: `https://kennethmyrwjy.github.io/callback.html`
- [ ] When testing, select ALL checkboxes on the login page
- [ ] During TikTok OAuth, grant ALL requested permissions
- [ ] Use a TikTok account that has videos (for video.list testing)

---

## What I've Updated in Your Code

I've improved your error handling to make scope issues clearer:

1. **Better error messages** - Now shows specific TikTok API errors
2. **Clearer scope descriptions** - Added labels to explain what each scope does
3. **Default scope selection** - All scopes now checked by default for easier testing
4. **Graceful degradation** - Shows "N/A" for missing fields instead of breaking

---

## Common TikTok API Issues

### Issue: "Invalid scope"
- **Cause**: Scope not approved in Developer Portal
- **Fix**: Request scope approval in TikTok Developer Portal

### Issue: "Access token invalid"
- **Cause**: Token expired or scopes changed
- **Fix**: Re-authenticate with fresh token

### Issue: "No videos found"
- **Cause**: 
  - User has no videos OR
  - `video.list` scope not granted OR
  - Videos are private
- **Fix**: Test with an account that has public videos

### Issue: Some profile fields show "N/A"
- **Cause**: Missing required scope for those fields
- **Fix**: Ensure all scopes are checked and approved

---

## Next Steps

1. **Check TikTok Developer Portal** - Verify all scopes are approved
2. **Test with all scopes selected** - Use the updated UI with all checkboxes
3. **Check browser console** - Look for specific API error messages
4. **Test with different accounts** - Try accounts with/without videos

---

## Security Note

You mentioned this is a test project, so security isn't a concern. However, for production:

- **Never expose `CLIENT_SECRET` in frontend code** (use a backend server)
- **Validate state parameter** to prevent CSRF attacks
- **Use HTTPS** (which GitHub Pages already provides)
- **Store tokens securely** (not in localStorage for production)

---

## Deploy Proxy to Production

For your GitHub Pages site to work for others, deploy the proxy server:

### Recommended: Render.com (Free)

1. Go to https://render.com and sign up
2. Click "New +" → "Web Service"  
3. Connect your GitHub repo
4. **Settings:**
   - **Root Directory:** `proxy-server`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
5. **Environment Variables:**
   ```
   TIKTOK_CLIENT_KEY=sbawjjtuzyd0z5u7fv
   TIKTOK_CLIENT_SECRET=Qdq5gHGlMppmWIFVgpxqDo18Wa7XQFhO
   TIKTOK_REDIRECT_URI=https://kennethmyrwjy.github.io/callback.html
   ```
6. Click "Create Web Service"
7. Copy your Render URL (e.g., `https://your-app.onrender.com`)
8. **Update `callback.html` line 34:**
   ```javascript
   const PROXY_URL = 'https://your-app.onrender.com';
   ```
9. Commit and push to GitHub Pages

### Alternative: Railway.app

1. Go to https://railway.app
2. Click "New Project" → "Deploy from GitHub"
3. Select repo and `proxy-server` folder
4. Add environment variables (same as above)
5. Deploy and copy URL
6. Update `callback.html`

---

## Need More Help?

If errors persist:
1. Check the browser **Console** (F12 → Console tab) for API responses
2. Look at **Network** tab (F12 → Network) to see exact API errors
3. Check proxy server logs (terminal or deployment platform logs)
4. Make sure proxy server is running and accessible

### Common Issues

**"Failed to fetch" error?**
- Proxy server not running
- Wrong PROXY_URL in callback.html
- CORS issue (check allowed origins in server.js)

**"access_token_invalid" still appearing?**
- Authorization code expired (they expire in ~5 minutes)
- Try the login flow again from the start
- Check CLIENT_KEY and CLIENT_SECRET in proxy server

**No videos showing?**
- Make sure `video.list` scope is approved in TikTok Developer Portal
- Test with an account that has public videos
- Check if the account actually has videos

Your code structure is now complete and should work! 🎯

