const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8080;
const BACKEND_HOST = process.env.BACKEND_HOST || 'backend-api';
const BACKEND_PORT = process.env.BACKEND_PORT || '8080';

// Proxy /api requests directly to backend service inside OpenShift SDN
app.use('/api', createProxyMiddleware({
  target: `http://${BACKEND_HOST}:${BACKEND_PORT}`,
  changeOrigin: true
}));

// Serve frontend static html
app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => {
  console.log(`Frontend server running on port ${PORT}`);
});
