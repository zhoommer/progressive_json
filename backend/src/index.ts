// server.js
import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());

app.get('/stream', (req, res) => {
  res.setHeader('Content-Type', 'application/x-ndjson'); // NDJSON format

  const users = [
    { id: 1, name: 'Ali' },
    { id: 2, name: 'Ayşe' },
    { id: 3, name: 'Mehmet' },
    { id: 4, name: 'Zeynep' },
  ];

  let i = 0;

  const interval = setInterval(() => {
    if (i >= users.length) {
      clearInterval(interval);
      res.end(); // Yayını kapat
    } else {
      res.write(JSON.stringify(users[i]) + '\n'); // NDJSON: her satır ayrı bir JSON
      i++;
    }
  }, 1000); // 1 saniyede bir kullanıcı gönder
});

app.listen(3001, () => {
  console.log('Server is running on http://localhost:3001');
});

