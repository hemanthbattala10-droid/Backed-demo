const express = require('express');
const cors = require('cors');
const { auth } = require('express-oauth2-jwt-bearer');
require('dotenv').config();

const app = express();
app.use(cors());

const checkJwt = auth({
  issuerBaseURL: process.env.OKTA_ISSUER,
  audience: process.env.OKTA_CLIENT_ID,
  tokenSigningAlg: 'RS256'
});

app.get('/api/protected', checkJwt, (req, res) => {
  res.json({ message: 'Access granted to protected route!' });
});

app.listen(3000, () => console.log('Backend running on http://localhost:3000'));
