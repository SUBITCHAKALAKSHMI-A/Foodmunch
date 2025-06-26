import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { dishesByCategory } from '../data/dishes';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [isListening, setIsListening] = useState(false);
  const allDishes = Object.values(dishesByCategory).flat();

  // Voice recognition setup
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      console.log("Voice search not supported in your browser");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.lang = 'en-US';

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setQuery(transcript);
      setIsListening(false);
    };

    if (isListening) {
      recognition.start();
    }

    return () => recognition.abort();
  }, [isListening]);

  // Search logic
  const results = query ? allDishes.filter(dish =>
    dish.name.toLowerCase().includes(query.toLowerCase()) ||
    dish.description.toLowerCase().includes(query.toLowerCase()) ||
    (dish.tags && dish.tags.some(tag => tag.includes(query.toLowerCase())))
  ).slice(0, 5) : [];

  return (
    <div className="search-container">
      <div className="search-box">
        <input
          type="text"
          placeholder="Search dishes or say 'pizza'..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button 
          onClick={() => setIsListening(prev => !prev)}
          className={`voice-btn ${isListening ? 'listening' : ''}`}
        >
          🎤
        </button>
      </div>
      
      {results.length > 0 && (
        <div className="search-results">
          {results.map(dish => (
            <Link 
              to={`/dish/${dish.id}`} 
              key={dish.id}
              className="result-item"
              onClick={() => setQuery('')}
            >
              <img src={dish.image} width="40" alt={dish.name} />
              <div>
                <h5>{dish.name}</h5>
                <p>₹{dish.price}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;