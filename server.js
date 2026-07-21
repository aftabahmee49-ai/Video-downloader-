const express = require('express');
const cors = require('cors');
const YtDlp = require('yt-dlp-exec');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

// API endpoint to get video info
app.post('/download', async (req, res) => {
  const { url } = req.body;
  
  if(!url) {
    return res.status(400).json({ error: "URL is required" });
  }

  try {
    // Get video info using yt-dlp
    const info = await YtDlp(url, {
      dumpSingleJson: true,
      noWarnings: true
    });
    
    // Send back title, thumbnail and mp4 formats only
    res.json({
      title: info.title,
      thumbnail: info.thumbnail,
      duration: info.duration,
      formats: info.formats.filter(f => f.url && f.ext === 'mp4').slice(0, 5)
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
