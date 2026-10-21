import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button } from 'primereact/button';
import { Divider } from 'primereact/divider';
import { DataView } from 'primereact/dataview';
import background from './media/back.mp4';
import './recommendations.css';

const Recommendations = () => {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bodyType, setBodyType] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch recommendations
        const recResponse = await axios.get('http://localhost:5000/api/auth/recommendations', {
          withCredentials: true,
        });
        setRecommendations(recResponse.data.recommendations);
        
        // Fetch body type from profile
        const profileResponse = await axios.get('http://localhost:5000/api/profile', {
          withCredentials: true,
        });
        setBodyType(profileResponse.data.bodyType || 'your body type');
        
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const itemTemplate = (recommendation) => {
    // First try to use imageUrl field, then try image field as fallback
    const imagePath = recommendation.imageUrl || recommendation.image;
    // Make sure we have the full URL path including the server
    const fullImageUrl = imagePath.startsWith('http') 
      ? imagePath 
      : `http://localhost:5000/images/${imagePath}`;
      return (
      <div className="recommendation-card">
        <div className="recommendation-image">
          <img 
            src={fullImageUrl} 
            alt={recommendation.title || 'Outfit recommendation'} 
            onError={(e) => {
              e.target.onerror = null; 
              e.target.src = '/placeholder-outfit.jpg'; // Fallback image
            }} 
          />
        </div>
        <div className="recommendation-content">
          <h3>{recommendation.title || 'Recommended Outfit'}</h3>
          <div className="recommendation-meta">
            <span className="event-badge">{recommendation.eventType}</span>
            <span className="body-type-badge">{recommendation.bodyType}</span>
          </div>
          <p className="recommendation-desc">{recommendation.description || recommendation.tip}</p>
          <div className="recommendation-tags">
            {recommendation.tags?.map((tag, i) => (
              <span key={i} className="tag">{tag}</span>
            ))}
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="loading-container">
        <i className="pi pi-spinner pi-spin" style={{ fontSize: '2rem' }}></i>
        <p>Loading recommendations...</p>
      </div>
    );
  }

  return (
    <div className="recommendations-container">
      {/* Video Background */}
      <div className="video-container">
        <video autoPlay muted loop className="video-background">
          <source src={background} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Fixed Header */}
      <header className="fixed-header">
        <div className="transparent-menubar">
          <Link to="/" className="brand-logo">StyleYourType</Link>
        </div>
      </header>

      <div className="recommendations-content">
        <div className="transparent-card recommendations-card">
          <div className="text-center mb-6">
            <div className="recommendations-icon-container">
              <i className="pi pi-star recommendations-icon"></i>
            </div>
            <h1 className="recommendations-title">Outfit Recommendations</h1>
            <p className="recommendations-subtitle">
              Curated styles for your {bodyType}
            </p>
          </div>

          <div className="recommendations-header">
            <Button 
              label="Back to Measurements" 
              icon="pi pi-arrow-left" 
              className="p-button-text text-white" 
              onClick={() => navigate('/measurements')}
            />
            <Button 
              label="View Profile" 
              icon="pi pi-user" 
              className="custom-button secondary-button" 
              onClick={() => navigate('/profile')}
            />
          </div>

          <Divider />

          {recommendations.length > 0 ? (
            <DataView
              value={recommendations}
              itemTemplate={itemTemplate}
              paginator
              rows={5}
              layout="grid"
            />
          ) : (
            <div className="no-recommendations">
              <i className="pi pi-info-circle"></i>
              <h3>No recommendations available</h3>
              <p>We couldn't find any recommendations for your body type.</p>
              <Button 
                label="Retake Measurements" 
                icon="pi pi-calculator" 
                className="custom-button" 
                onClick={() => navigate('/measurements')}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Recommendations;              