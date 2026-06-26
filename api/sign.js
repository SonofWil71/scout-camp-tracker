const crypto = require('crypto');

// Returns a short-lived Cloudinary upload signature so the client can upload
// WITHOUT an abusable unsigned preset. The API secret never leaves the server.
module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', 'https://scout-camp-tracker.vercel.app');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-app-key');
  res.setHeader('X-Robots-Tag', 'noindex, nofollow');
  if (req.method === 'OPTIONS') return res.status(200).end();

  // Same passphrase gate as the Notion API
  const APP_KEY = process.env.APP_KEY;
  if (APP_KEY && req.headers['x-app-key'] !== APP_KEY) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const apiKey    = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME || 'dx11frxfp';
  if (!apiKey || !apiSecret) {
    return res.status(500).json({ error: 'Missing CLOUDINARY_API_KEY / CLOUDINARY_API_SECRET env vars' });
  }

  const timestamp = Math.round(Date.now() / 1000);
  const folder = 'scout-camp';
  // Params to sign must be sorted alphabetically, joined, then suffixed with the secret
  const toSign = `folder=${folder}&timestamp=${timestamp}`;
  const signature = crypto.createHash('sha1').update(toSign + apiSecret).digest('hex');

  return res.status(200).json({ cloudName, apiKey, timestamp, folder, signature });
};
