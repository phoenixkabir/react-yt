import React, { useState } from 'react';

const App = () => {
  const [userMessage, setUserMessage] = useState('');
  const [responseMessage, setResponseMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    setUserMessage(e.target.value);
  };

  const callAPI = async () => {
    const url = 'https://adult-gpt.p.rapidapi.com/adultgpt';
    const options = {
      method: 'POST',
      headers: {
        'x-rapidapi-key': 'c708ecb398mshd3581deb8052cc2p1017aajsnc307ba7f91cb',
        'x-rapidapi-host': 'adult-gpt.p.rapidapi.com',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        messages: [
          {
            role: 'user',
            content: userMessage
          }
        ],
        genere: 'ai-gf-1',
        bot_name: '',
        temperature: 0.9,
        top_k: 10,
        top_p: 0.9,
        max_tokens: 200
      })
    };

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
      const result = await response.text();
      console.log('API response:', result); // Log the response for debugging
      setResponseMessage(result); // Update the state with the result
    } catch (error) {
      console.error('Error:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <h1>Chat with Lavanya</h1>
      <input
        type="text"
        value={userMessage}
        onChange={handleInputChange}
        placeholder="Type your message here"
      />
      <button onClick={callAPI} disabled={loading}>
        {loading ? 'Sending...' : 'Send Message'}
      </button>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      {responseMessage && <p>{responseMessage}</p>}
    </div>
  );
};

export default App;
