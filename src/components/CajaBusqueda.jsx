// CajaBusqueda.jsx

import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ResultadosBusqueda from './ResultadosBusqueda';

const CajaBusqueda = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();
  const { search } = useParams(); // Obtén el parámetro de búsqueda de la URL

  useEffect(() => {
    if (search) {
      setSearchQuery(search);
      handleSearch();
    }
  }, [search]);

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearch = async () => {
    try {
      const response = await fetch(`http://givy0905-001-site1.atempurl.com/api/items?q=${searchQuery}`);
      const data = await response.json();
      setSearchResults(data.products);

      // Llama a onSearch antes de la navegación
      onSearch(data.products, searchQuery);

      navigate(`/items?search=${encodeURIComponent(searchQuery)}`);
      
    } catch (error) {
      console.error('Error de búsqueda:', error);
    }
  };

  return (
    <div className="container mt-3">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-6 col-12">
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Buscar productos..."
              value={searchQuery}
              onChange={handleInputChange}
            />
            <div className="input-group-append">
              <button className="btn btn-primary" type="button" onClick={handleSearch}>
                Buscar
              </button>
            </div>
          </div>
        </div>
      </div>
      {searchResults.length > 0 && <ResultadosBusqueda products={searchResults} searchQuery={searchQuery} />}
    </div>
  );
};

export default CajaBusqueda;
