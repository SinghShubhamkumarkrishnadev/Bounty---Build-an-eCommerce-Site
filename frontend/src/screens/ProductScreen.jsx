import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';

const ProductScreen = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);  // Separate error state for clarity
  const [success, setSuccess] = useState(false);  // Success state for better user feedback

  const auth = useSelector(state => state.auth);
  const { userInfo } = auth;

  useEffect(() => {
    
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/products/${id}`);
        setProduct(data);
        setError(null);  // Reset error if product loads successfully
      } catch (error) {
        setError(error.response?.data.message || error.message);
        console.error('Error fetching product:', error.response || error);
      }
    };

    fetchProduct();
  }, [id]);

  const buyHandler = async () => {
    setMessage(null);  // Reset previous messages
    setError(null);
    setSuccess(false);

    if (!userInfo || userInfo.role !== 'shopper') {
      setError('You must be a shopper to buy products.');
      return;
    }

    if (quantity < 1 || quantity > product.quantity) {
      setError('Please enter a valid quantity.');
      return;
    }

    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/products/${id}/buy`,
        { quantity },
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );
      setSuccess(true);
      setMessage('Product bought successfully!');
      setProduct(prev => ({ ...prev, quantity: prev.quantity - quantity }));  // Update available quantity
    } catch (error) {
      setError(error.response?.data.message || error.message);
    }
  };

  if (!product) {
    return <p>Loading product...</p>;
  }

  return (
    <div className="max-w-2xl mx-auto mt-8 p-6 border rounded shadow">
      <h1 className="text-2xl font-bold mb-4">{product.name}</h1>
      <p className="text-gray-700 mb-2">Price: ${product.price}</p>
      <p className="text-gray-700 mb-2">Quantity Available: {product.quantity}</p>
      <p className="text-gray-700 mb-4">Description: {product.description}</p>
      {error && <p className="mb-2 text-red-500">{error}</p>}
      {success && <p className="mb-2 text-green-500">{message}</p>}
      <div className="flex items-center space-x-4">
        <input
          type="number"
          min="1"
          max={product.quantity}
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          className="w-16 border px-2 py-1 rounded"
        />
        <button
          onClick={buyHandler}
          className={`bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 ${product.quantity === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={product.quantity === 0}
        >
          {product.quantity > 0 ? 'Buy' : 'Out of Stock'}
        </button>
      </div>
    </div>
  );
};

export default ProductScreen;
