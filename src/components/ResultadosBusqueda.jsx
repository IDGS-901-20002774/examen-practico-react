// ResultadosBusqueda.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import './ResultadosBusqueda.css';

const ResultadosBusqueda = ({ products, searchQuery }) => {
  const renderStars = (rating) => {
    const stars = [];
    const totalStars = 5;

    const fullStars = Math.floor(rating);
    const hasHalfStar = rating - fullStars >= 0.5;

    for (let i = 1; i <= totalStars; i++) {
      if (i <= fullStars) {
        stars.push(<span key={i} className={`star filled`}></span>);
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(<span key={i} className={`star half-filled`}></span>);
      } else {
        stars.push(<span key={i} className={`star empty`}></span>);
      }
    }

    return stars;
  };

  return (
    <div className="row mt-3 p-3">
      {searchQuery !== undefined && (
        <h4 className='text-center card-title mt-2 mb-4'>Resultados de la búsqueda de {searchQuery}: {products.length}</h4>
      )}
      {products.length > 0 ? (
        products.map((product) => (
          <div key={product.id} className="col-md-4 mb-4">
            <div className="card h-100">
              <img src={product.thumbnail} className="card-img-top" alt={product.title} />
              <div className="card-body">
                <h5 className="card-title text-center">{product.title}</h5>
                <p className="card-text text-center mt-3 mb-3">{product.category}</p>
                <p className="card-text">{product.description}</p>
                <div className='row'>
                  <div className="col-6">
                    <p className="card-text text-center text-bold">${product.price}</p>
                  </div>
                  <div className="col-6">
                    <p className="card-text text-center">Marca: {product.brand}</p>
                  </div>
                  <div className="col-12 text-center mt-2 mb-2">
                    <div className="rating-stars">{renderStars(product.rating)}</div>
                  </div>
                </div>
                <div className='text-center'>
                  <Link to={`/item/${product.id}`} className="btn btn-primary">
                    Ver producto
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="col-12 text-center">
          {searchQuery !== undefined && (
            <h4 className='text-center card-title mt-2 mb-4'>¡No se encontró ningún producto con el nombre de "{searchQuery}"</h4>
          )}
        </div>
      )}
    </div>
  );
};

export default ResultadosBusqueda;
