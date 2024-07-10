import React, { useState, useEffect } from 'react';
import Card from './Card.jsx';

const App = () => {
  const [query, setQuery] = useState('');
  const [gifs, setGifs] = useState([]);

  useEffect(() => {
    const fetchTrendingGifs = async () => {
      try {
        const response = await fetch('https://api.giphy.com/v1/gifs/trending?api_key=azhXkHJtLitKbtDalJJk7xYTeHZigIB2&limit=10');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setGifs(data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchTrendingGifs();
  }, []); 

  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`https://api.giphy.com/v1/gifs/search?q=${query}&api_key=azhXkHJtLitKbtDalJJk7xYTeHZigIB2&limit=10`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setGifs(data.data); 
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div className="container">
      <h2 className="mt-4 mb-4">Búsqueda de GIFs</h2>
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Buscar GIFs..."
            value={query}
            onChange={handleChange}
          />
          <div className="input-group-append">
            <button type="submit" className="btn btn-primary">
              Buscar
            </button>
          </div>
        </div>
      </form>
      <div className="row">
        {gifs.map(gif => (
          <div key={gif.id} className="col-md-4 mb-4">
            <div className="card">
              <img src={gif.images.original.url} className="card-img-top" alt={gif.title} />
              <div className="card-body">
                <h5 className="card-title">{gif.title}</h5>
                <p className="card-text">Rating: {gif.rating}</p>
                <a href={gif.url} target="_blank" rel="noopener noreferrer" className="btn btn-primary">Ver en Giphy</a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
