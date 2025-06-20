import React from 'react';
import { Link } from 'react-router-dom';

const ExploreMenu = () => {
  const categories = [
    {
      name: "Non-Veg Starters",
      slug: "non-veg-starters",
      image: "https://d1tgh8fmlzexmh.cloudfront.net/ccbp-responsive-website/em-ginger-fried-img.png"
    },
    {
      name: "Veg Starters",
      slug: "veg-starters",
      image: "https://d1tgh8fmlzexmh.cloudfront.net/ccbp-responsive-website/em-veg-starters-img.png"
    },
    {
      name: "Soups",
      slug: "soups",
      image: "https://d1tgh8fmlzexmh.cloudfront.net/ccbp-responsive-website/em-soup-img.png"
    },
    {
      name: "Fish & Sea food",
      slug: "fish-sea-food",
      image: "https://d1tgh8fmlzexmh.cloudfront.net/ccbp-responsive-website/em-grilled-seafood-img.png"
    },
    {
      name: "Main Course",
      slug: "main-course",
      image: "https://d1tgh8fmlzexmh.cloudfront.net/ccbp-responsive-website/em-hyderabadi-biryani-img.png"
    },
    {
      name: "Desserts",
      slug: "desserts",
      image: "https://d1tgh8fmlzexmh.cloudfront.net/ccbp-responsive-website/em-coffee-bourbon-img.png"
    },
    {
      name: "Desserts",
      slug: "desserts",
      image: "https://d1tgh8fmlzexmh.cloudfront.net/ccbp-responsive-website/em-coffee-bourbon-img.png"
    },
    {
      name: "Desserts",
      slug: "desserts",
      image: "https://d1tgh8fmlzexmh.cloudfront.net/ccbp-responsive-website/em-coffee-bourbon-img.png"
    }
  ];

  return (
    <div className="explore-menu-section pt-5 pb-5" id="exploreMenuSection">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h1 className="menu-section-heading">Explore Menu</h1>
          </div>
          {categories.map((category) => (
            <div className="col-12 col-md-6 col-lg-3" key={category.slug}>
              <div className="shadow menu-item-card p-3 mb-3">
                <img
                  src={category.image}
                  className="menu-item-image w-100"
                  alt={category.name}
                />
                <h1 className="menu-card-title">{category.name}</h1>
                <Link 
                  to={`/category/${category.slug}`}
                  className="menu-item-link"
                >
                  View All
                  <svg width="16px" height="16px" viewBox="0 0 16 16" className="bi bi-arrow-right" fill="#d0b200" xmlns="http://www.w3.org/2000/svg">
                    <path
                      fillRule="evenodd"
                      d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8z"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExploreMenu;