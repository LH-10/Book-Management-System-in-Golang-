import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';
import { FaChartBar, FaClipboardList, FaPlus, FaRegEdit } from 'react-icons/fa';
 import {APP_NAME} from '../configs/Names.js'
 import BookListing from "../assets/booklisting.png"
 import UpdatesImage from "../assets/updates.png"
import StockUpdates from "../assets/AddBook.png"
const LandingPage = () => {
  return (
    <div className="landing-container">
      <header className="landing-header">
        <div className="landing-logo">
          <h1>{APP_NAME}</h1>
        </div>
        <nav className="landing-nav">
          <ul>
            <li><a href="#features">Features</a></li>
            <li><a href="#categories">Modules</a></li>
            <li><a href="#about">About Us</a></li>
            <li><Link to="/login" className="landing-nav-button">Sign In</Link></li>
          </ul>
        </nav>
      </header>

      <main>
        <section className="landing-hero">
          <div className="landing-hero-content">
            <h2>Manage Your Bookstore Efficiently</h2>
            <p>This App is your all-in-one solution for managing bookstore inventory, tracking book records, and ensuring smooth operations behind the scenes.</p>
            <div className="landing-cta">
              <Link to="/signup" className="landing-cta-button">Create Account</Link>
              <Link to="/login" className="landing-cta-button landing-cta-button-outline">Sign In</Link>
            </div>
          </div>
          <div className="landing-hero-image">
            <div className="landing-book-stack">
              <div className="landing-book landing-book-1"></div>
              <div className="landing-book landing-book-2"></div>
              <div className="landing-book landing-book-3"></div>
              <div className="landing-book landing-book-4"></div>
            </div>
          </div>
        </section>

        <section id="features" className="landing-features">
          <h2>Key Features</h2>
          <div className="landing-features-grid">
            <div className="landing-feature-card">
              <div className="landing-feature-icon"><FaClipboardList/></div>
              <h3>Inventory Management</h3>
              <p>Keep track of all books in your store with real-time updates and full control over stock levels.</p>
            </div>
            <div className="landing-feature-card">
              <div className="landing-feature-icon"><FaRegEdit/></div>
              <h3>Edit Book Details</h3>
              <p>Easily update book information including title, author, genre, and availability using our intuitive interface.</p>
            </div>
            <div className="landing-feature-card">
              <div className="landing-feature-icon"><FaPlus/></div>
              <h3>Add & Remove Books</h3>
              <p>Quickly add new arrivals or remove outdated inventory to keep your catalog up to date.</p>
            </div>
            {/* <div className="landing-feature-card">
              <div className="landing-feature-icon"><FaChartBar/></div>
              <h3>Data Insights</h3>
              <p>Access reports and logs for smarter decisions on stock, demand trends, and store performance.</p>
            </div> */}
          </div>
        </section>

        
      </main>

    
        <section id="categories" className="landing-categories">
          <h2>Core Modules</h2>
          <div className="landing-categories-grid">
            <div className="landing-category-card">
              <div className="landing-category-image ">

                <img src={BookListing} />
              </div>
              <h3>Book Listings</h3>
            </div>
            <div className="landing-category-card">
              <div className="landing-category-image ">
                <img src={StockUpdates} />
              </div>
              <h3>Stock Updates</h3>
            </div>
            <div className="landing-category-card">
              <div className="landing-category-image ">
                <img src={UpdatesImage}  />

              </div>
              <h3>Record Edits</h3>
            </div>
            </div>
            </section>

      <footer className="landing-footer">
        <div className="landing-footer-content">
          <div className="landing-footer-logo">
            <h2>{APP_NAME}</h2>
          </div>
          <div className="landing-footer-links">
            <div className="landing-footer-column">
              <ul>
                <li><a href="#about">About Us</a></li>
                <li><a href="#contact">Contact</a></li>
              </ul>
            </div>
            <div className="landing-footer-column">
              <ul>
                <li><a href="#help">Help Center</a></li>
                <li><a href="#faq">FAQs</a></li>
              </ul>
            </div>
            
          </div>
        </div>
        <div className="landing-footer-bottom">
          <p>&copy; 2025 {APP_NAME}. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;