import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/authSlice';

const Header = () => {
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);
  const { userInfo } = auth;

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <header className="bg-blue-600 text-white py-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">
          eCommerce
        </Link>
        <nav>
          {userInfo ? (
            <div className="flex items-center space-x-4">
              <span>Welcome, {userInfo.name}</span>
              <button onClick={logoutHandler} className="bg-red-500 px-3 py-1 rounded">
                Logout
              </button>
              {userInfo.role === 'admin' && (
                <Link to="/admin" className="bg-green-500 px-3 py-1 rounded">
                  Admin
                </Link>
              )}
              {userInfo.role === 'seller' && (
                <Link to="/seller" className="bg-yellow-500 px-3 py-1 rounded">
                  Seller
                </Link>
              )}
            </div>
          ) : (
            <div className="flex space-x-4">
              <Link to="/login" className="bg-green-500 px-3 py-1 rounded">
                Login
              </Link>
              <Link to="/register" className="bg-purple-500 px-3 py-1 rounded">
                Register
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
