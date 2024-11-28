require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios'); // Add axios for API calls

const app = express();
const port = process.env.PORT || 5000;

app.use(cors()); // Allow cross-origin requests
app.use(express.json()) // Parse JSON request bodies

// POST endpoint for receiving input from frontend and calling Gemini 1.5 Flash API
app.post('/gemini-1.5-flash', async (req, res) => {
  const { input, timestamp } = req.body;
const Prompt = "Provide the complete program code in JavaScript only. Return strictly the code without any additional text, comments, or explanations "
  if (!input || typeof input !== 'string') {
    return res.status(400).json({ error: 'Invalid input text' });
  }

  try {
    // Call Gemini 1.5 Flash API with the input text
    const geminiApiResponse = await processWithGemini(Prompt,input);

    // Send the response back to the frontend
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

// Function to make the request to the Gemini 1.5 Flash API
async function processWithGemini(Prompt , input) {
    try {
      // Call the actual Gemini 1.5 Flash API (replace the URL with the real one)
      const response = await axios({
        url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyCWFTmjf8m7nlCdvrDZ20w1TvBDU7YpJKE`,
        method: "post",
        data: {
          contents: [{ parts: [{ text: Prompt + input }] }],
        },
      });
      // Assuming the response contains a field named "result" for Gemini 1.5 Flash
      ; // Adjust this to match the actual response structure
 const aiResponse = response.data.candidates[0].content.parts[0].text;
 console.log(aiResponse)
      return aiResponse;
    } catch (error) {
      console.error('Error in calling Gemini 1.5 Flash API:', error);
      console.error('Server Response:', error.response.data); // Log the full server response
      throw new Error('Failed to process the request');
    }
  }

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});