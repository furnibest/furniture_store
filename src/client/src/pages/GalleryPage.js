import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChair, faUmbrella, faCouch, faTable, faBed, faLightbulb } from '@fortawesome/free-solid-svg-icons';
import '../styles/CategoriesPage.css';

const categories = [
  {
    id: 1,
    name: 'Outdoor Chairs',
    description: 'Comfortable and durable chairs perfect for your garden, patio, or poolside.',
    icon: faChair,
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 2,
    name: 'Garden Tables',
    description: 'Elegant tables for outdoor dining and entertaining in your garden.',
    icon: faTable,
    image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 3,
    name: 'Outdoor Sofas',
    description: 'Luxurious outdoor sofas for comfortable relaxation in your outdoor space.',
    icon: faCouch,
    image: 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 4,
    name: 'Garden Umbrellas',
    description: 'Stylish umbrellas to provide shade and protection from the elements.',
    icon: faUmbrella,
    image: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 5,
    name: 'Outdoor Beds',
    description: 'Comfortable outdoor beds for ultimate relaxation in your garden.',
    icon: faBed,
    image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 6,
    name: 'Garden Lighting',
    description: 'Beautiful lighting solutions to enhance your outdoor ambiance.',
    icon: faLightbulb,
    image: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?q=80&w=800&auto=format&fit=crop'
  }
];

function CategoriesPage() {
  return (
    <div className="categories-page">
      <div className="categories-hero">
        <h1 className="categories-title">Our Categories</h1>
        <p className="categories-subtitle">Explore our wide range of outdoor furniture categories</p>
      </div>
      
      <div className="categories-content">
        <div className="categories-grid">
          {categories.map(category => (
            <div key={category.id} className="category-card">
              <div className="category-image">
                <img src={category.image} alt={category.name} />
                <div className="category-overlay">
                  <FontAwesomeIcon icon={category.icon} className="category-icon" />
                </div>
              </div>
              <div className="category-info">
                <h3 className="category-name">{category.name}</h3>
                <p className="category-description">{category.description}</p>
                <button className="category-btn">View Products</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CategoriesPage; 