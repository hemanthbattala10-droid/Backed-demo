const express = require('express');
const cors = require('cors');
const { auth } = require('express-oauth2-jwt-bearer');
require('dotenv').config();

const app = express();
const PORT = 3000;

// ✅ Log startup
console.log('Starting backend...');

// ✅ Enable CORS so frontend can access backend
app.use(cors());

// ✅ Okta JWT authentication middleware
const checkJwt = auth({
  issuerBaseURL: process.env.OKTA_ISSUER,
  audience: 'App5475856',
  tokenSigningAlg: 'RS256'
});

// ✅ Public route
app.get('/', (req, res) => {
  res.send('Backend is up and running!');
});

// ✅ Protected route
app.get('/api/protected', checkJwt, (req, res) => {
  res.json({
    message: 'Access granted to protected route!',
    user: req.auth // shows token claims
  });
});

// ✅ Start server
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});

