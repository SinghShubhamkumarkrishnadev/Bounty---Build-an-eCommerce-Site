import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  return (
    <div className="border rounded p-4 shadow">
      <h2 className="text-lg font-semibold">{product.name}</h2>
      <p className="text-gray-700">${product.price}</p>
      <Link to={`/products/${product._id}`} className="text-blue-500 mt-2 inline-block">
        View Details
      </Link>
    </div>
  );
};

export default ProductCard;
