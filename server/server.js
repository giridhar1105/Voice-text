require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios'); 

const app = express();
const port = process.env.PORT || 5000;

app.use(cors()); 
app.use(express.json()) 

app.post('/gemini-1.5-flash', async (req, res) => {
  const { input, timestamp } = req.body;
  const Prompt = "Provide only the JavaScript code. Do not include any markdown or formatting tags. Only return the raw code."

;
  if (!input || typeof input !== 'string') {
    return res.status(400).json({ error: 'Invalid input text' });
  }

  try {
    const geminiApiResponse = await processWithGemini(Prompt,input);

    res.status(200).json({
      timestamp,
      input,
      aiResponse: geminiApiResponse,
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Error processing the request' });
  }
});

async function processWithGemini(Prompt , input) {
    try {
      const response = await axios({
        url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyCWFTmjf8m7nlCdvrDZ20w1TvBDU7YpJKE`,
        method: "post",
        data: {
          contents: [{ parts: [{ text: Prompt + input }] }],
        },
      });
 const aiResponse = response.data.candidates[0].content.parts[0].text;
 console.log(aiResponse)
      return aiResponse;
    } catch (error) {
      console.error('Error in calling Gemini 1.5 Flash API:', error);
      console.error('Server Response:', error.response.data); 
      throw new Error('Failed to process the request');
    }
  }

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});