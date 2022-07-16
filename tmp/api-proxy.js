import { createProxyMiddleware } from 'http-proxy-middleware';
// import config from '#config'

const apiProxyMiddleware = createProxyMiddleware('/api/**', {
  target: 'http://localhost:8000',
  changeOrigin: true
});

export default async (req, res) => {
  // Workaround for h3 not awaiting next.
  await new Promise((resolve, reject) => {
    const next = (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    };
    apiProxyMiddleware(req, res, next);
  });
};
