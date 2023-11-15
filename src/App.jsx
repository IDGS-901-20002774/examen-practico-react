import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CajaBusqueda from './components/CajaBusqueda';
import ResultadosBusqueda from './components/ResultadosBusqueda';
import DetalleProducto from './components/DetalleProducto';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'boxicons/css/boxicons.css';
import './styles.css';

const App = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (results, query) => {
    setSearchResults(results);
    setSearchQuery(query);
  };

  return (
    <BrowserRouter>
      <div className="d-flex flex-column align-items-center justify-content-center">
        <div className="icon-title-container mt-4 mb-4">
          <i className='bx bxs-shopping-bag'></i>
          <h1 className="mt-3">Bazar online</h1>
        </div>
        <Routes>
          <Route
            path='/'
            element={<CajaBusqueda onSearch={handleSearch} />}
          />
          <Route
            path='/items'
            element={<ResultadosBusqueda products={searchResults} searchQuery={searchQuery} />}
          />
          <Route path="/item/:id" element={<DetalleProducto />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
