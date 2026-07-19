const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3001;

app.disable('x-powered-by');
app.use(cors({ origin: 'http://127.0.0.1:5173' }));
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    message: 'Backend is healthy',
    service: 'express-api',
  });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
