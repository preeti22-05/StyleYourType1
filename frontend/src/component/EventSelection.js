import React, { useState } from 'react';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Divider } from 'primereact/divider';
import { RadioButton } from 'primereact/radiobutton';
import background from './media/back.mp4';
import './event.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../api';

const EventSelection = () => {
  const [eventType, setEventType] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const eventOptions = [
    { name: 'Casual Outing', value: 'casual', icon: 'pi pi-sun' },
    { name: 'Formal Event', value: 'formal', icon: 'pi pi-star' },
    { name: 'Business Meeting', value: 'business', icon: 'pi pi-briefcase' },
    { name: 'Party', value: 'party', icon: 'pi pi-moon' },
    { name: 'Wedding', value: 'wedding', icon: 'pi pi-heart' },
    { name: 'Date Night', value: 'date', icon: 'pi pi-users' }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!eventType) return;
    
    setLoading(true);
    try {
      const response = await axios.post(
        `${API_URL}/auth/select-event`,
        { eventType },
        { withCredentials: true }
      );
      setMessage(response.data.msg);
      setTimeout(() => navigate('/recommendations'), 1000);
    } catch (error) {
      console.error("Error selecting event:", error);
      setMessage("Error selecting event. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="event-container">
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

      <div className="event-content">
        <div className="transparent-card event-card">
          <div className="text-center mb-6">
            <div className="event-icon-container">
              <i className="pi pi-calendar event-icon"></i>
            </div>
            <h1 className="event-title">Select Event Type</h1>
            <p className="event-subtitle">
              Choose the occasion to get personalized recommendations
            </p>
          </div>

          {message && (
            <div className={`message-container ${
              message.includes('Error') ? 'error-message' : 'success-message'
            }`}>
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="event-form">
            <div className="event-grid">
              {eventOptions.map((option) => (
                <div key={option.value} className="event-option">
                  <RadioButton
                    inputId={option.value}
                    name="eventType"
                    value={option.value}
                    onChange={(e) => setEventType(e.value)}
                    checked={eventType === option.value}
                  />
                  <label htmlFor={option.value} className="event-label">
                    <i className={`${option.icon} event-option-icon`}></i>
                    <span>{option.name}</span>
                  </label>
                </div>
              ))}
            </div>

            <Divider />

            <div className="flex justify-content-between mt-4">
              <Button 
                label="Back to Measurements" 
                icon="pi pi-arrow-left" 
                className="p-button-text text-white" 
                onClick={() => navigate('/measurements')}
              />
              <Button
                type="submit"
                label={loading ? "Saving..." : "Get Recommendations"}
                icon={loading ? "pi pi-spin pi-spinner" : "pi pi-arrow-right"}
                loading={loading}
                className="custom-button"
                disabled={!eventType}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EventSelection;