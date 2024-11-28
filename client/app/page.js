"use client";

import { useState, useEffect } from "react";
import { FiMic, FiSend } from "react-icons/fi";

export default function Home() {
  const [searchText, setSearchText] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState(null);
  const [aiResponse, setAiResponse] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;

      if (!SpeechRecognition) {
        alert("Speech recognition is not supported in this browser.");
        return;
      }

      const recognitionInstance = new SpeechRecognition();
      recognitionInstance.lang = "en-US";
      recognitionInstance.interimResults = true;
      recognitionInstance.maxAlternatives = 1;

      recognitionInstance.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setSearchText(transcript);
      };

      recognitionInstance.onstart = () => {
        setIsListening(true);
      };

      recognitionInstance.onend = () => {
        setIsListening(false);
      };

      setRecognition(recognitionInstance);
    }
  }, []);

  const handleMicClick = async () => {
    if (recognition) {
      if (isListening) {
        recognition.stop();
      } else {
        recognition.start();
      }
    }
  };

  const handleSendClick = async () => {
    if (!searchText) return;

    const requestData = {
      input: searchText,
      timestamp: new Date().toISOString(),
    };

    setLoading(true);

    try {
      // Update the endpoint to match the backend route '/gemini-1.5-flash'
      const response = await fetch("http://localhost:5000/gemini-1.5-flash", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      const data = await response.json();

      if (response.ok) {
        setAiResponse(data.aiResponse); 
      } else {
        setAiResponse("Error: Could not process your request.");
      }
    } catch (error) {
      setAiResponse("Error: Unable to reach the server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="flex items-center bg-white border rounded-full shadow-md p-2 w-96">
        <input
          type="text"
          placeholder="Type or speak something"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="flex-grow px-4 py-2 text-gray-700 rounded-full focus:outline-none"
        />
        <button onClick={handleMicClick} className="text-gray-600 ml-2">
          <FiMic size={24} className={isListening ? "text-green-500" : ""} />
        </button>
        <button onClick={handleSendClick} className="text-gray-600 ml-2">
          <FiSend size={24} />
        </button>
      </div>

      {loading && (
        <div className="mt-4 p-4 bg-white border rounded-md shadow-md">
          <p>Loading...</p>
        </div>
      )}

      {aiResponse && (
        <div className="mt-4 p-4 bg-white border rounded-md shadow-md">
          <h3 className="font-bold text-xl text-blue-200">AI Response:</h3>
          <pre className="text-gray-700">{JSON.stringify(aiResponse, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
