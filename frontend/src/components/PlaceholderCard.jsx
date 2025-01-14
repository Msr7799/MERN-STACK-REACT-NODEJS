import React from 'react';

const PlaceholderCard = ({ imgSrc }) => {
  return (
    <div className="card border-warning mb-3" aria-hidden="true" style={{ maxWidth: '20rem' }}>
      <img src={imgSrc} className="card-img-top" alt="..." />
      <div className="card-body bg-dark ">
        <h5 className="card-title placeholder-glow">
          <span className="placeholder col-6"></span>
        </h5>
        <p className="card-text placeholder-glow">
          <span className="placeholder col-7"></span>
          <span className="placeholder col-4"></span>
          <span className="placeholder col-4"></span>
          <span className="placeholder col-6"></span>
          <span className="placeholder col-8"></span>
        </p>
        <a className="btn btn-danger disabled placeholder col-6" aria-disabled="true"></a>
      </div>
    </div>
  );
};


export default PlaceholderCard;