import React from 'react';
import { Link } from 'react-router-dom';
import { Menubar } from 'primereact/menubar';
import { Button } from 'primereact/button';
import 'primereact/resources/themes/saga-blue/theme.css'; // Theme
import 'primereact/resources/primereact.min.css'; // Core CSS
import 'primeicons/primeicons.css'; // Icons
import 'primeflex/primeflex.css'; // Flexbox utilities
import './home.css';
import background from './media/back.mp4';

const Home = () => {
  // Header menu items with custom template for styling
  const menuItems = [
    {
      label: 'StyleYourType',
      className: 'project-name',
      url: '/',
      template: (item) => (
        <Link to={item.url} className="brand-logo">
          {item.label}
        </Link>
      )
    },
    {
      label: 'Login',
      icon: 'pi pi-sign-in',
      url: '/login',
      template: (item) => (
        <Link to={item.url} className="nav-link">
          <i className={`${item.icon} nav-icon`}></i>
          <span className="nav-text">{item.label}</span>
        </Link>
      )
    },
    {
      label: 'Measurement',
      icon: 'pi pi-calculator',
      url: '/measurement-form',
      template: (item) => (
        <Link to={item.url} className="nav-link">
          <i className={`${item.icon} nav-icon`}></i>
          <span className="nav-text">{item.label}</span>
        </Link>
      )
    },
    {
      label: 'Profile',
      icon: 'pi pi-user',
      url: '/profile',
      template: (item) => (
        <Link to={item.url} className="nav-link">
          <i className={`${item.icon} nav-icon`}></i>
          <span className="nav-text">{item.label}</span>
        </Link>
      )
    },
  ];

  return (
    <div className="home-container">
      {/* Video Background - Fixed to viewport size */}
      <div className="video-container">
        <video autoPlay muted loop className="video-background">
          <source src={background} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Fixed Header with Transparent Background */}
      <header className="fixed-header">
        <Menubar model={menuItems} className="transparent-menubar" />
      </header>

      {/* Main Content with Transparent Cards */}
      <main className="main-content">
        {/* Hero Section */}
        <section className="hero-section">
          <div className="transparent-card hero-card">
            <h1>Welcome to Style Your Type</h1>
            <p className="hero-subtitle">
              Discover your body shape and get personalized style recommendations
            </p>
            <Link to="/measurement-form">
              <Button label="Get Started" className="custom-button" icon="pi pi-arrow-right" iconPos="right" />
            </Link>
          </div>
        </section>

        {/* Features Section */}
        <section className="features-section">
          <h2 className="section-title">Our Services</h2>
          <div className="features-grid">
            <div className="transparent-card feature-card">
              <i className="pi pi-calculator feature-icon"></i>
              <h3>Body Shape Analysis</h3>
              <p>
                Calculate your exact body shape using our advanced measurement tool. Our algorithm analyzes your proportions 
                to determine which of the basic body types you most closely align with.
              </p>
              <Link to="/measurement-form" className="feature-link">Learn More</Link>
            </div>
            
            <div className="transparent-card feature-card">
              <i className="pi pi-heart feature-icon"></i>
              <h3>Style Recommendations</h3>
              <p>
                Get personalized outfit recommendations based on your body type. We suggest clothing styles, cuts, 
                and patterns that flatter your unique figure and highlight your best features.
              </p>
              <Link to="/recommendations" className="feature-link">Explore Styles</Link>
            </div>
            
            <div className="transparent-card feature-card">
              <i className="pi pi-lightbulb feature-icon"></i>
              <h3>Fashion Tips</h3>
              <p>
                Learn how to dress to accentuate your best features. Our expert stylists provide practical advice on 
                proportions, color theory, and accessorizing for your specific body shape.
              </p>
              <Link to="/tips" className="feature-link">View Tips</Link>
            </div>
            
            <div className="transparent-card feature-card">
              <i className="pi pi-calendar feature-icon"></i>
              <h3>Event Styling</h3>
              <p>
                Find the perfect outfit for any occasion. Whether it's a formal event, casual meetup, or professional setting,
                we have curated recommendations tailored to your body type.
              </p>
              <Link to="/event-selection" className="feature-link">Browse Events</Link>
            </div>
          </div>
        </section>

        {/* How It Works Section (New) */}
        <section className="how-it-works-section">
          <h2 className="section-title">How It Works</h2>
          <div className="steps-container">
            <div className="transparent-card step-card">
              <div className="step-number">1</div>
              <h3>Take Your Measurements</h3>
              <p>
                Follow our simple guide to accurately measure key points of your body. These measurements help us determine your unique body shape.
              </p>
            </div>
            
            <div className="transparent-card step-card">
              <div className="step-number">2</div>
              <h3>Get Your Body Shape Analysis</h3>
              <p>
                Our algorithm analyzes your measurements and identifies your body type from the main categories: Hourglass, Pear, Apple, Rectangle, and Inverted Triangle.
              </p>
            </div>
            
            <div className="transparent-card step-card">
              <div className="step-number">3</div>
              <h3>Explore Personalized Recommendations</h3>
              <p>
                Browse through clothing suggestions specifically tailored to enhance your unique body shape and personal style preferences.
              </p>
            </div>
            
            <div className="transparent-card step-card">
              <div className="step-number">4</div>
              <h3>Shop with Confidence</h3>
              <p>
                Use our guidance to shop smarter, choose flattering styles, and feel confident in your fashion choices.
              </p>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="about-section">
          <div className="transparent-card about-card">
            <h2>About Style Your Type</h2>
            <p>
              Style Your Type is a personalized web application designed to help you understand your body shape and
              provide tailored fashion recommendations for various events. Whether it's a wedding, casual gathering,
              or party, we've got you covered!
            </p>
            <p>
              Our mission is to help everyone feel confident in their clothing choices by providing science-based 
              recommendations tailored to individual body types. Fashion should be accessible and enjoyable for all!
            </p>
            <div className="about-stats">
              <div className="stat-item">
                <span className="stat-number">5+</span>
                <span className="stat-label">Body Types</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">100+</span>
                <span className="stat-label">Style Tips</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">50+</span>
                <span className="stat-label">Event Categories</span>
              </div>
            </div>
            <Link to="/event-selection">
              <Button label="Explore Events" className="custom-button secondary-button" icon="pi pi-calendar" iconPos="right" />
            </Link>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="testimonials-section">
          <h2 className="section-title">What Our Users Say</h2>
          <div className="testimonials-container">
            <div className="transparent-card testimonial-card">
              <div className="testimonial-content">
                <div className="testimonial-rating">
                  <i className="pi pi-star-fill"></i>
                  <i className="pi pi-star-fill"></i>
                  <i className="pi pi-star-fill"></i>
                  <i className="pi pi-star-fill"></i>
                  <i className="pi pi-star-fill"></i>
                </div>
                <p className="testimonial-text">
                  "Style Your Type completely transformed how I shop for clothes. I finally understand what styles 
                  work for my rectangle body shape and feel so much more confident!"
                </p>
                <div className="testimonial-author-info">
                  <i className="pi pi-user testimonial-avatar"></i>
                  <div>
                    <p className="testimonial-author">Sarah M.</p>
                    <p className="testimonial-location">New York, NY</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="transparent-card testimonial-card">
              <div className="testimonial-content">
                <div className="testimonial-rating">
                  <i className="pi pi-star-fill"></i>
                  <i className="pi pi-star-fill"></i>
                  <i className="pi pi-star-fill"></i>
                  <i className="pi pi-star-fill"></i>
                  <i className="pi pi-star-fill"></i>
                </div>
                <p className="testimonial-text">
                  "The event-specific recommendations are incredible! I used the app to help me dress for a wedding, 
                  and I received so many compliments on my outfit."
                </p>
                <div className="testimonial-author-info">
                  <i className="pi pi-user testimonial-avatar"></i>
                  <div>
                    <p className="testimonial-author">James T.</p>
                    <p className="testimonial-location">Los Angeles, CA</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="transparent-card testimonial-card">
              <div className="testimonial-content">
                <div className="testimonial-rating">
                  <i className="pi pi-star-fill"></i>
                  <i className="pi pi-star-fill"></i>
                  <i className="pi pi-star-fill"></i>
                  <i className="pi pi-star-fill"></i>
                  <i className="pi pi-star"></i>
                </div>
                <p className="testimonial-text">
                  "As someone who always struggled with fashion, this app has been a game-changer. The body shape analysis was spot-on, and the style tips are practical and easy to follow."
                </p>
                <div className="testimonial-author-info">
                  <i className="pi pi-user testimonial-avatar"></i>
                  <div>
                    <p className="testimonial-author">Emily K.</p>
                    <p className="testimonial-location">Chicago, IL</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Call to Action Section (New) */}
        <section className="cta-section">
          <div className="transparent-card cta-card">
            <h2>Ready to Discover Your Perfect Style?</h2>
            <p>Take the first step towards a more confident and stylish you. Our personalized recommendations are just a few clicks away.</p>
            <Link to="/measurement-form">
              <Button label="Start Your Style Journey" className="custom-button large-button" icon="pi pi-arrow-right" iconPos="right" />
            </Link>
          </div>
        </section>
        
        {/* Footer */}
        <footer className="site-footer">
          <div className="footer-content">
            <div className="footer-section">
              <h3>Style Your Type</h3>
              <p>Personalized fashion recommendations based on your unique body shape.</p>
            </div>
            <div className="footer-section">
              <h3>Quick Links</h3>
              <ul className="footer-links">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/measurement-form">Get Started</Link></li>
                <li><Link to="/event-selection">Events</Link></li>
                <li><Link to="/profile">My Profile</Link></li>
              </ul>
            </div>
            <div className="footer-section">
              <h3>Contact Us</h3>
              <p>Email: info@styleyourtype.com</p>
              <p>Phone: (555) 123-4567</p>
              <div className="social-icons">
                <i className="pi pi-facebook"></i>
                <i className="pi pi-instagram"></i>
                <i className="pi pi-twitter"></i>
                <i className="pi pi-pinterest"></i>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; {new Date().getFullYear()} Style Your Type. All rights reserved.</p>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default Home;