import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [pokemon, setPokemon] = useState(null);
  const [inputId, setInputId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchPokemon = async () => {
      setLoading(true);
  setError(null);
  
  try {
    const response = await axios.get(`/api/pokemon/${inputId}`, {
      timeout: 15000  // 15 second timeout
    });
    
    if (response.data.error) {
      throw new Error(response.data.error);
    }
    
    setPokemon(response.data);
  } catch (err) {
    setError(err.response?.data?.error || 
            err.message || 
            'Connection to server failed');
  } finally {
    setLoading(false);
  }
    if (!inputId) return;
    
    setLoading(true);
    setError(null);
    
    try {
const response = await axios.get('http://localhost:8000/api/pokemon/1');      setPokemon(response.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch Pokémon');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Pokémon Finder</h1>
      <div>
        <input
          type="number"
          value={inputId}
          onChange={(e) => setInputId(e.target.value)}
          placeholder="Enter Pokémon ID"
          min="1"
        />
        <button onClick={fetchPokemon} disabled={loading}>
          {loading ? 'Loading...' : 'Search'}
        </button>
      </div>
      
      {error && <p style={{ color: 'red' }}>{error}</p>}
      
      {pokemon && (
        <div>
          <h2>{pokemon.name} (ID: {pokemon.id})</h2>
          <img src={pokemon.sprite} alt={pokemon.name} />
          <p>Types: {pokemon.types.join(', ')}</p>
        </div>
      )}
    </div>
  );
}

export default App;