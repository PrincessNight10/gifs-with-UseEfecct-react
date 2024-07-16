import React, { useState, useEffect } from 'react';
import Card from './Card.jsx';
import './App.css';

const App = () => {
  const [query, setQuery] = useState(''); // Estado para almacenar la consulta de búsqueda
  const [gifs, setGifs] = useState([]);   // Estado para almacenar los GIFs obtenidos

  useEffect(() => {
    const fetchTrendingGifs = async () => {
      try {
        const response = await fetch('https://api.giphy.com/v1/gifs/trending?api_key=azhXkHJtLitKbtDalJJk7xYTeHZigIB2&limit=20');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setGifs(data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchTrendingGifs();  // Llamada inicial para obtener GIFs tendencia al cargar la aplicación
  }, []);  // El segundo argumento [] indica que useEffect se ejecuta solo una vez al montar el componente

  const handleChange = (event) => {
    setQuery(event.target.value);  // Actualiza el estado 'query' con el valor del input de búsqueda
  };

  const handleSubmit = async (event) => {
    event.preventDefault();  
    
    try {
      const response = await fetch(`https://api.giphy.com/v1/gifs/search?q=${query}&api_key=azhXkHJtLitKbtDalJJk7xYTeHZigIB2&limit=20`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setGifs(data.data);  // Actualiza el estado 'gifs' con los resultados de la búsqueda
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
          />
          <div className="input-group-append">
            <button type="submit" className="btn btn-primary">
              Buscar
            </button>
          </div>
        </div>
      </form>

      <div className="gif-grid">
        {gifs.map((gif, index) => (
          <div key={gif.id} className="gif-item">
            <div className="card">
              <img src={gif.images.original.url} className="card-img-top" alt={gif.title} />
              <div className="card-body">
                <h5 className="card-title">{gif.title}</h5>
                <p className="card-text">Rating: {gif.rating}</p>
                <a href={gif.url} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                  Ver en Giphy
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;

