import React, { useState } from 'react';

const App = () => {
  const [imageUrl, setImageUrl] = useState('');
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [uuid, setUuid] = useState('');
  const [statusLoading, setStatusLoading] = useState(false);

  const callAPI = async () => {
    const url = 'https://runwayml.p.rapidapi.com/generate/image';

    const options = {
      method: 'POST',
      headers: {'x-rapidapi-key': 'e321aa8d18msh97d9883e0eaa424p11f6aejsn708be65d48c9',
        'x-rapidapi-host': 'runwayml.p.rapidapi.com',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        img_prompt: imageUrl,
        motion: 20,
        seed: 0,
        upscale: true,
        interpolate: true,
        callback_url: ''
      })
    };

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
      const result = await response.json();
      setResponse(result);
      if (result.uuid) {
        setUuid(result.uuid);
      }
    } catch (error) {
      console.error('Error:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const checkStatus = async () => {
    if (!uuid) {
      alert('No UUID found. Please generate an image first.');
      return;
    }

    const url = `https://runwayml.p.rapidapi.com/status?uuid=${uuid}`;
    const options = {
      method: 'GET',
      headers: {'x-rapidapi-key': 'e321aa8d18msh97d9883e0eaa424p11f6aejsn708be65d48c9',
        'x-rapidapi-host': 'runwayml.p.rapidapi.com'
      }
    };

    setStatusLoading(true);
    setError(null);

    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
      const result = await response.json();
      setResponse(result);
    } catch (error) {
      console.error('Error:', error);
      setError(error.message);
    } finally {
      setStatusLoading(false);
    }
  };

  return (
    <div className="App">
      <h1>Image Generation</h1>
      <input
        type="text"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
        placeholder="Enter image URL"
      />
      <button onClick={callAPI} disabled={loading}>
        {loading ? 'Generating...' : 'Generate Image'}
      </button>
      <button onClick={checkStatus} disabled={statusLoading || !uuid}>
        {statusLoading ? 'Checking...' : 'Check Status'}
      </button>
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      {response && (
        <div>
          <h2>Response:</h2>
          <pre>{JSON.stringify(response, null, 2)}</pre>
          {response.status === "Task is in queue" && response.uuid && (
            <p>Task UUID: {response.uuid}</p>
          )}
          {response.result_url && (
            <div>
              <h3>Generated Image:</h3>
              <img src={response.result_url} alt="Generated" />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default App;
