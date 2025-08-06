const express = require('express');
const axios = require('axios');
const app = express();
const PORT = 3000;

app.get('/proxy', async (req, res) => {
  const targetUrl = req.query.url;
  console.log(`Menerima permintaan untuk URL: ${targetUrl}`);
  if (!targetUrl) return res.status(400).send('URL tidak disediakan');

  try {
    const response = await axios.get(targetUrl, {
      headers: { 'User-Agent': 'Mozilla/5.0' }
    });

    let content = response.data;

    // Opsional: Hapus header yang memblokir iframe (jika diperlukan)
    res.setHeader('Content-Type', 'text/html');
    res.send(content);

  } catch (error) {
    res.status(500).send('Gagal mengambil konten');
  }
});

app.listen(PORT, () => {
  console.log(`Proxy aktif di http://localhost:${PORT}`);
});