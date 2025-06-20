import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { dishesByCategory } from '../data/dishes';
import { useCart } from '../contexts/CartContext';

const CategoryPage = () => {
  const { categorySlug } = useParams();
  const navigate = useNavigate();
  const [quantities, setQuantities] = useState({});
  const { addToCart } = useCart();
  
  const dishes = dishesByCategory[categorySlug] || [];
  
  const handleQuantityChange = (dishId, newQuantity) => {
    setQuantities(prev => ({
      ...prev,
      [dishId]: Math.max(0, newQuantity)
    }));
  };

  const handleAddToCart = (dish) => {
    if (quantities[dish.id] > 0) {
      addToCart(dish, quantities[dish.id]);
      navigate('/checkout');
      window.scrollTo(0, 0); // Scroll to top after navigation
    }
  };

  const formatCategoryName = (slug) => {
    return slug.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  return (
    <div className="category-page pt-5 pb-5">
      <div className="container">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><Link to="/">Home</Link></li>
            <li className="breadcrumb-item active" aria-current="page">
              {formatCategoryName(categorySlug)}
            </li>
          </ol>
        </nav>

        <h1 className="category-heading mb-4">{formatCategoryName(categorySlug)}</h1>
        
        <div className="d-flex justify-content-between mb-4">
          <div>
            <span className="me-2">Sort by:</span>
            <select className="form-select form-select-sm d-inline-block w-auto">
              <option>Featured</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Avg. Customer Review</option>
            </select>
          </div>
          <div>
            <span className="text-muted">{dishes.length} items</span>
          </div>
        </div>
        
        <div className="row">
          {dishes.map((dish) => (
            <div className="col-md-6 col-lg-4 mb-4" key={dish.id}>
              <div className="dish-card shadow p-3 h-100 d-flex flex-column">
                <Link to={`/dish/${dish.id}`} className="text-decoration-none">
                  <img 
                    src={dish.image} 
                    alt={dish.name} 
                    className="dish-image w-100 mb-3"
                  />
                  <h3 className="dish-name mb-2 text-dark">{dish.name}</h3>
                </Link>
                
                <div className="mb-2">
                  <div className="text-warning mb-1">
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star-half-alt"></i>
                    <i className="far fa-star"></i>
                    <span className="text-muted ms-2">(24)</span>
                  </div>
                  
                  <div className="d-flex justify-content-between align-items-start">
                    <span className="dish-price fs-4">₹{dish.price}</span>
                    {dish.isChefsSpecial && (
                      <span className="badge bg-warning text-dark">Chef's Choice</span>
                    )}
                  </div>
                </div>
                
                <p className="dish-description text-muted small mb-3 flex-grow-1">
                  {dish.description}
                </p>
                
                <div className="d-flex flex-wrap gap-2 mb-3">
                  {dish.isSpicy && <span className="badge bg-danger">Spicy</span>}
                  {dish.isVegan && <span className="badge bg-success">Vegan</span>}
                  {dish.isGlutenFree && <span className="badge bg-info">Gluten Free</span>}
                </div>
                
                <div className="d-flex justify-content-between align-items-center mt-auto">
                  <div className="quantity-selector d-flex align-items-center">
                    <button 
                      className="btn btn-sm btn-outline-secondary"
                      onClick={() => handleQuantityChange(dish.id, (quantities[dish.id] || 0) - 1)}
                    >
                      -
                    </button>
                    <span className="mx-2">{quantities[dish.id] || 0}</span>
                    <button 
                      className="btn btn-sm btn-outline-secondary"
                      onClick={() => handleQuantityChange(dish.id, (quantities[dish.id] || 0) + 1)}
                    >
                      +
                    </button>
                  </div>
                  
                  <button 
                    className={`btn ${quantities[dish.id] ? 'btn-success' : 'btn-primary'} add-to-cart-btn`}
                    disabled={!quantities[dish.id]}
                    onClick={() => handleAddToCart(dish)}
                  >
                    {quantities[dish.id] ? 'Taste Now' : 'Add to Cart'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;