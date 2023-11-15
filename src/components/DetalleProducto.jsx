import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import CajaBusqueda from './CajaBusqueda';

const DetalleProducto = () => {
  const { id } = useParams();
  const [productoDetalle, setProductoDetalle] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://givy0905-001-site1.atempurl.com/api/items/${id}`);
        const data = await response.json();
        setProductoDetalle(data);
      } catch (error) {
        console.error('Error al obtener los detalles del producto:', error);
      }
    };

    fetchData();
  }, [id]);

  if (!productoDetalle) {
    return <div>Loading...</div>;
  }

  const { title, description, price, discountPercentage, rating, stock, brand, category, images } = productoDetalle;

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
    <div className="container">
      <div className="row mb-5">
        <div className="col-12 text-center">
          <h4 className='card-title'>{title}</h4><br />
          <h6 className='card-text text-center'>{category}</h6>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-6 col-md-12 col-12">
          <div id="carouselExampleIndicators" className="carousel slide">
            <div className="carousel-indicators">
              {images.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  data-bs-target="#carouselExampleIndicators"
                  data-bs-slide-to={index}
                  className={index === 0 ? 'active' : ''}
                  aria-current={index === 0 ? 'true' : 'false'}
                  aria-label={`Slide ${index + 1}`}
                ></button>
              ))}
            </div>
            <div className="carousel-inner">
              {images.map((image, index) => (
                <div
                  key={index}
                  className={`carousel-item ${index === 0 ? 'active' : ''}`}
                >
                  <img src={image} className="d-block w-100" alt={`Product ${index}`} />
                </div>
              ))}
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>
        <div className="col-lg-6 col-md-12 col-12 mt-4">
          <p className="card-text">{description}</p>
          <div className="row">
            <div className="col-lg-6 col-md-6 col-6 mb-2">
              <p className="card-text text-bold text-center">${price}</p>
            </div>
            <div className="col-lg-6 col-md-6 col-6 mb-2">
              <p className="card-text text-center">{renderStars(rating)}</p>
            </div>
            <div className="col-lg-6 col-md-6 col-6 mb-2">
              <p className="card-text text-center">Marca: {brand}</p>
            </div>
            <div className="col-lg-6 col-md-6 col-6 mb-2">
              <p className="card-text text-center">Disponibles: {stock} piezas.</p>
            </div>
          </div>
          <div className="mt-4 mb-5 text-center">
            <button className="btn btn-primary">Comprar</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetalleProducto;
