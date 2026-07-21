const express = require('express');
const cors = require('cors');
const YtDlp = require('yt-dlp-exec');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/download', async (req, res) => {
  const { url } = req.body;
  try {
    const info = await YtDlp(url, { dumpSingleJson: true });
    res.json({ title: info.title, thumbnail: info.thumbnail, formats: info.formats });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(3000, () => console.log('Server running on 3000'));
