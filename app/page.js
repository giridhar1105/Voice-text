"use client"

import { useState, useEffect } from "react";
import { FiMic } from "react-icons/fi"; 

export default function Home() {
  const [searchText, setSearchText] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState(null);

  const setupSpeechRecognition = () => {
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
  };

  const handleMicClick = async () => {
    if (!recognition) {
      setupSpeechRecognition();
    }

    if (isListening) {
      recognition.stop();
    } else {
      recognition.start();
    }

    if (searchText) {
      const response = await fetch("/api/voiceToText", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ voiceText: searchText }),
      });

      const data = await response.json();
      console.log(data);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      setupSpeechRecognition(); 
    }
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="flex items-center bg-white border rounded-full shadow-md p-2 w-96">
        <input
          type="text"
          placeholder="Search..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="flex-grow px-4 py-2 text-gray-700 rounded-full focus:outline-none"
        />
        <button onClick={handleMicClick} className="text-gray-600 ml-2">
          <FiMic size={24} className={isListening ? "text-green-500" : ""} />
        </button>
      </div>
    </div>
  );
}

export async function handler(req, res) {
  if (req.method === "POST") {
    const { voiceText } = req.body;

    console.log("Received voice text:", voiceText);

    return res.status(200).json({ message: "Text received successfully", voiceText });
  } else {
    return res.status(405).json({ message: "Method Not Allowed" });
  }
}
