# TikTok OAuth Proxy Server

This is a simple backend proxy that handles TikTok OAuth token exchange securely.

## Why You Need This

TikTok's OAuth token endpoint blocks direct browser requests for security reasons. This proxy:
- ✅ Runs on a server (not in browser)
- ✅ Keeps your CLIENT_SECRET secure (never exposed in frontend)
- ✅ Handles CORS properly
- ✅ Exchanges authorization codes for access tokens

## 🔒 Security First

**IMPORTANT:** This proxy uses environment variables to keep your CLIENT_SECRET secure. Never commit your `.env` file to Git!

## Quick Start (Local Testing)

### 1. Install Dependencies
```bash
cd proxy-server
npm install
```

### 2. Configure Environment Variables

The `.env` file has already been created with your credentials. Verify it contains:

```bash
cat .env
```

You should see:
```
TIKTOK_CLIENT_KEY=sbawjjtuzyd0z5u7fv
TIKTOK_CLIENT_SECRET=Qdq5gHGlMppmWIFVgpxqDo18Wa7XQFhO
TIKTOK_REDIRECT_URI=https://kennethmyrwjy.github.io/callback.html
PORT=3000
```

⚠️ **NEVER commit this file to Git!** It's already in `.gitignore`.

### 3. Run the Server
```bash
npm start
```

The server will run on `http://localhost:3000`

If you see an error about missing environment variables, make sure your `.env` file exists and contains the required values.

### 4. Update Frontend Configuration
The frontend configuration is in `/config.js` (already set up for local testing with ngrok)

## Deploy to Production (Free Options)

### Option A: Render.com (Recommended - Free tier available)

1. **Go to** https://render.com and sign up
2. **Click** "New +" → "Web Service"
3. **Connect** your GitHub repo or upload code
4. **Configure:**
   - Build Command: `cd proxy-server && npm install`
   - Start Command: `cd proxy-server && npm start`
   - Environment Variables:
     - `TIKTOK_CLIENT_KEY` = `sbawjjtuzyd0z5u7fv`
     - `TIKTOK_CLIENT_SECRET` = `Qdq5gHGlMppmWIFVgpxqDo18Wa7XQFhO`
     - `TIKTOK_REDIRECT_URI` = `https://kennethmyrwjy.github.io/callback.html`
5. **Deploy!** You'll get a URL like `https://your-app.onrender.com`
6. **Update** `callback.html` with your Render URL

### Option B: Railway.app

1. **Go to** https://railway.app
2. **Click** "New Project" → "Deploy from GitHub"
3. **Select** your repo and the `proxy-server` folder
4. **Add environment variables** (same as above)
5. **Deploy!** You'll get a URL
6. **Update** `callback.html` with your Railway URL

### Option C: Heroku

```bash
cd proxy-server
heroku create your-app-name
heroku config:set TIKTOK_CLIENT_KEY=sbawjjtuzyd0z5u7fv
heroku config:set TIKTOK_CLIENT_SECRET=Qdq5gHGlMppmWIFVgpxqDo18Wa7XQFhO
heroku config:set TIKTOK_REDIRECT_URI=https://kennethmyrwjy.github.io/callback.html
git push heroku main
```

## Testing

Once deployed, test the proxy:

```bash
# Should return status message
curl https://your-proxy-url.com/

# Test token exchange (with a real code)
curl -X POST https://your-proxy-url.com/token-exchange \
  -H "Content-Type: application/json" \
  -d '{"code":"YOUR_AUTH_CODE"}'
```

## Security Note

For production:
- ✅ Use environment variables (not hardcoded secrets)
- ✅ Add rate limiting
- ✅ Add authentication if needed
- ✅ Use HTTPS only
- ✅ Whitelist only your domain in CORS

For this test project, the current setup is fine!

## Troubleshooting

**Port already in use?**
```bash
# Use a different port
PORT=4000 npm start
```

**CORS errors?**
- Make sure your GitHub Pages URL is in the allowed origins list in `server.js`

**Connection refused?**
- Check if the server is running
- Check firewall settings
- For deployed servers, check the logs

