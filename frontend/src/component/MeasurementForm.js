import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { InputNumber } from 'primereact/inputnumber';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Divider } from 'primereact/divider';
import { Steps } from 'primereact/steps';
import background from './media/back.mp4';
import './measurement.css';
import { API_URL } from '../api';

const MeasurementForm = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [measurements, setMeasurements] = useState({
    height: null,
    weight: null,
    bust: null,
    waist: null,
    hip: null,
    shoulderWidth: null,
  });
  const [bodyType, setBodyType] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const steps = [
    { label: 'Basic Info' },
    { label: 'Measurements' },
    { label: 'Results' },
    { label: 'Next Steps' }
  ];

  const handleChange = (e, field) => {
    setMeasurements({ ...measurements, [field]: e.value });
  };

  const next = () => {
    setActiveIndex(prev => prev + 1);
  };

  const prev = () => {
    setActiveIndex(prev => prev - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        `${API_URL}/auth/save-measurements`,
        measurements, 
        { withCredentials: true }
      );
      setBodyType(response.data.bodyType);
      next();
    } catch (error) {
      console.error("Error saving measurements:", error);
      alert("Error saving measurements. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="measurement-container">
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

      <div className="measurement-content">
        <div className="transparent-card measurement-card">
          <div className="text-center mb-6">
            <div className="measurement-icon-container">
              <i className="pi pi-calculator measurement-icon"></i>
            </div>
            <h1 className="measurement-title">Body Measurements</h1>
            <p className="measurement-subtitle">
              {activeIndex < 3 ? 'Enter your measurements' : 'Your body analysis complete'}
            </p>
          </div>

          <Steps 
            model={steps} 
            activeIndex={activeIndex}
            onSelect={(e) => setActiveIndex(e.index)}
            className="mb-4"
          />

          <form onSubmit={handleSubmit} className="measurement-form">
            {activeIndex === 0 && (
              <>
                <div className="field mb-4">
                  <span className="p-float-label w-full">
                    <InputNumber
                      id="height"
                      value={measurements.height}
                      onValueChange={(e) => handleChange(e, 'height')}
                      className="styled-input w-full"
                      mode="decimal"
                      min={0}
                      required
                    />
                    <label htmlFor="height">Height (cm)</label>
                  </span>
                </div>

                <div className="field mb-4">
                  <span className="p-float-label w-full">
                    <InputNumber
                      id="weight"
                      value={measurements.weight}
                      onValueChange={(e) => handleChange(e, 'weight')}
                      className="styled-input w-full"
                      mode="decimal"
                      min={0}
                      required
                    />
                    <label htmlFor="weight">Weight (kg)</label>
                  </span>
                </div>

                <div className="flex justify-content-end mt-4">
                  <Button 
                    label="Next" 
                    icon="pi pi-arrow-right" 
                    iconPos="right" 
                    className="custom-button" 
                    onClick={next}
                  />
                </div>
              </>
            )}

            {activeIndex === 1 && (
              <>
                <div className="field mb-4">
                  <span className="p-float-label w-full">
                    <InputNumber
                      id="bust"
                      value={measurements.bust}
                      onValueChange={(e) => handleChange(e, 'bust')}
                      className="styled-input w-full"
                      mode="decimal"
                      min={0}
                      required
                    />
                    <label htmlFor="bust">Bust (cm)</label>
                  </span>
                </div>

                <div className="field mb-4">
                  <span className="p-float-label w-full">
                    <InputNumber
                      id="waist"
                      value={measurements.waist}
                      onValueChange={(e) => handleChange(e, 'waist')}
                      className="styled-input w-full"
                      mode="decimal"
                      min={0}
                      required
                    />
                    <label htmlFor="waist">Waist (cm)</label>
                  </span>
                </div>

                <div className="field mb-4">
                  <span className="p-float-label w-full">
                    <InputNumber
                      id="hip"
                      value={measurements.hip}
                      onValueChange={(e) => handleChange(e, 'hip')}
                      className="styled-input w-full"
                      mode="decimal"
                      min={0}
                      required
                    />
                    <label htmlFor="hip">Hip (cm)</label>
                  </span>
                </div>

                <div className="field mb-4">
                  <span className="p-float-label w-full">
                    <InputNumber
                      id="shoulderWidth"
                      value={measurements.shoulderWidth}
                      onValueChange={(e) => handleChange(e, 'shoulderWidth')}
                      className="styled-input w-full"
                      mode="decimal"
                      min={0}
                      required
                    />
                    <label htmlFor="shoulderWidth">Shoulder Width (cm)</label>
                  </span>
                </div>

                <div className="flex justify-content-between mt-4">
                  <Button 
                    label="Back" 
                    icon="pi pi-arrow-left" 
                    className="p-button-text text-white" 
                    onClick={prev}
                  />
                  <Button
                    type="submit"
                    label={loading ? "Calculating..." : "Calculate"}
                    icon={loading ? "pi pi-spin pi-spinner" : "pi pi-calculator"}
                    loading={loading}
                    className="custom-button"
                  />
                </div>
              </>
            )}

            {activeIndex === 2 && (
              <div className="text-center">
                <div className="body-type-result">
                  <h3>Your body type is:</h3>
                  <p className="body-type-value">{bodyType}</p>
                </div>
                <div className="body-type-description">
                  {bodyType === 'Hourglass' && (
                    <p>Your balanced proportions mean most styles will flatter your figure.</p>
                  )}
                  {bodyType === 'Pear' && (
                    <p>Look for styles that balance your lower half with your upper body.</p>
                  )}
                  {bodyType === 'Apple' && (
                    <p>Empire waistlines and V-necks will complement your shape.</p>
                  )}
                  {bodyType === 'Rectangle' && (
                    <p>Create curves with belts and layered looks.</p>
                  )}
                </div>
                <Divider />
                <div className="flex justify-content-center gap-3 mt-4">
                  <Button 
                    label="Start Over" 
                    icon="pi pi-refresh" 
                    className="custom-button secondary-button" 
                    onClick={() => setActiveIndex(0)}
                  />
                  <Button 
                    label="Next Step" 
                    icon="pi pi-arrow-right" 
                    className="custom-button" 
                    onClick={next}
                  />
                </div>
              </div>
            )}

            {activeIndex === 3 && (
              <div className="next-steps">
                <h3>What would you like to do next?</h3>
                <div className="step-options">
                  <Card className="step-card" onClick={() => navigate('/event-selection')}>
                    <i className="pi pi-calendar step-icon"></i>
                    <h4>Select an Event</h4>
                    <p>Get personalized recommendations for a specific occasion</p>
                    <Button 
                      label="Choose Event" 
                      className="custom-button small-button" 
                    />
                  </Card>
                  
                  <Card className="step-card" onClick={() => navigate('/recommendations')}>
                    <i className="pi pi-star step-icon"></i>
                    <h4>View All Recommendations</h4>
                    <p>Browse all outfit suggestions for your body type</p>
                    <Button 
                      label="View Outfits" 
                      className="custom-button small-button" 
                    />
                  </Card>
                </div>
                
                <Divider />
                
                <div className="flex justify-content-center mt-4">
                  <Button 
                    label="Back to Results" 
                    icon="pi pi-arrow-left" 
                    className="p-button-text text-white" 
                    onClick={() => setActiveIndex(2)}
                  />
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default MeasurementForm;   