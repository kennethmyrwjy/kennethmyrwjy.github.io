// Simple TikTok OAuth Proxy Server
// This handles the token exchange securely on the backend
// Deploy to Render, Railway, or run locally

const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
const PORT = process.env.PORT || 3000;

// CORS configuration - allow your GitHub Pages domain
app.use(cors({
    origin: [
        'https://kennethmyrwjy.github.io',
        'http://localhost:5500', // For local testing
        'http://127.0.0.1:5500'
    ],
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// TikTok credentials (in production, use environment variables!)
const CLIENT_KEY = process.env.TIKTOK_CLIENT_KEY || 'sbawjjtuzyd0z5u7fv';
const CLIENT_SECRET = process.env.TIKTOK_CLIENT_SECRET || 'Qdq5gHGlMppmWIFVgpxqDo18Wa7XQFhO';
const REDIRECT_URI = process.env.TIKTOK_REDIRECT_URI || 'https://kennethmyrwjy.github.io/callback.html';

// Health check endpoint
app.get('/', (req, res) => {
    res.json({
        status: 'TikTok OAuth Proxy is running!',
        endpoints: {
            tokenExchange: 'POST /token-exchange'
        }
    });
});

// Token exchange endpoint
app.post('/token-exchange', async (req, res) => {
    try {
        const { code } = req.body;

        if (!code) {
            return res.status(400).json({
                error: 'Missing authorization code'
            });
        }

        console.log('Exchanging code for token...');

        // Exchange code for access token with TikTok
        const params = new URLSearchParams({
            client_key: CLIENT_KEY,
            client_secret: CLIENT_SECRET,
            code: code,
            grant_type: 'authorization_code',
            redirect_uri: REDIRECT_URI
        });

        const response = await fetch('https://open.tiktokapis.com/v2/oauth/token/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Cache-Control': 'no-cache'
            },
            body: params.toString()
        });

        const data = await response.json();

        console.log('TikTok response:', {
            status: response.status,
            hasToken: !!data.access_token,
            error: data.error
        });

        if (!response.ok) {
            return res.status(response.status).json({
                error: 'TikTok token exchange failed',
                details: data
            });
        }

        // Return the token data to frontend
        res.json(data);

    } catch (error) {
        console.error('Token exchange error:', error);
        res.status(500).json({
            error: 'Internal server error',
            message: error.message
        });
    }
});

app.listen(PORT, () => {
    console.log(`🚀 TikTok OAuth Proxy running on port ${PORT}`);
    console.log(`📍 Allowed origins: https://kennethmyrwjy.github.io`);
});

