/**
 * Simple API proxy for the chatbot.
 * Usage:
 *   OPENAI_API_KEY=sk-... node server.js
 * Then serve /mnt/data/app with any static server and set CHAT_API_URL to http://localhost:3000/api/chat
 */
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json({ limit: '1mb' }));

app.post('/api/chat', async (req, res) => {
  try {
    const { messages } = req.body || {};
    if (!Array.isArray(messages)) return res.status(400).json({ error: 'messages[] required' });

    // Use global fetch (Node 18+). If older Node, install node-fetch.
    const r = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY||''}`
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages,
        temperature: 0.2
      })
    });
    const data = await r.json();
    if (!r.ok) {
      console.error('OpenAI error:', data);
      return res.status(500).json({ error: data });
    }
    const reply = data?.choices?.[0]?.message?.content || '';
    res.json({ reply });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: String(err) });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Chat proxy ready on http://localhost:${port}`));
