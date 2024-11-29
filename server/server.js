require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios'); 
const {jsToMachaLangKannada} = require('./jstomacha')
const app = express();
const port = process.env.PORT || 5000;

app.use(cors()); 
app.use(express.json()) 

app.post('/gemini-1.5-flash', async (req, res) => {
  const { input, timestamp } = req.body;
const Prompt = "Provide the JavaScript code only, without any markdown, formatting tags, or comments. Use objects and procedural programming techniques exclusively. Strictly avoid using 'classes', 'function constructor' , 'var' keyword in the solution, make sure no where in the code 'this' keyword is used, if you cant return a code without satisfying the constraints mentioned above don't give the code. You have the ability to use JavaScript object. Return only the raw code."
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
 const parsedText =  jsToMachaLangKannada(aiResponse) 
 console.log(parsedText)
 console.log(aiResponse)
      return parsedText;
    } catch (error) {
      console.error('Error in calling Gemini 1.5 Flash API:', error);
      console.error('Server Response:', error.response.data); 
      throw new Error('Failed to process the request');
    }
  }

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});