"use client";

import { useState, useEffect } from "react";
import { FiMic, FiSend } from "react-icons/fi";

export default function Home() {
  const [searchText, setSearchText] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState(null);
  const [aiResponse, setAiResponse] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(""); 

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
     
    };

    setLoading(true);
    setError(""); // Reset previous errors

    try {
      const response = await fetch("http://localhost:5000/macha_telugu", {
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
        setError("Error: Could not process your request.");
      }
    } catch (error) {
      setError("Error: Unable to reach the server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 py-6 px-4">
      <div className="flex flex-col items-center w-full max-w-md bg-white border rounded-lg shadow-md p-6">
        <div className="flex items-center w-full mb-4">
          <input
            type="text"
            placeholder="Type or speak something"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="flex-grow px-4 py-2 text-gray-700 rounded-full focus:outline-none border border-gray-300"
          />
          <button onClick={handleMicClick} className="text-gray-600 ml-3">
            <FiMic size={24} className={isListening ? "text-green-500" : "text-gray-600"} />
          </button>
          <button onClick={handleSendClick} className="text-gray-600 ml-3">
            <FiSend size={24} />
          </button>
        </div>

        {loading && (
          <div className="mt-4 p-4 bg-blue-100 border border-blue-300 rounded-md shadow-md">
            <p className="text-blue-600">Loading...</p>
          </div>
        )}

        {error && (
          <div className="mt-4 p-4 bg-red-100 border border-red-300 rounded-md shadow-md">
            <p className="text-red-600">{error}</p>
          </div>
        )}

        {aiResponse.length > 0 && !loading && (
          <div className="mt-4 p-4 bg-white border rounded-md shadow-md w-full">
            <h3 className="font-bold text-xl text-blue-500">AI Response:</h3>
            <div className="text-gray-700">
              {/* {aiResponse.map((line, index) => (
                <pre key={index} className="whitespace-pre-wrap break-words">{line}</pre>
              ))} */}
              <pre className="whitespace-pre-wrap break-words">{aiResponse
                }</pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
