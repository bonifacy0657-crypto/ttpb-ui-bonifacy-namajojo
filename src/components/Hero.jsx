import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import slideOne from '../assets/slide 1.jpg'
import slideTwo from '../assets/slide 2.png'
import slideThree from '../assets/slide 3.png'
import slideFour from '../assets/slide 4.jpg'

const slides = [slideOne, slideTwo, slideThree, slideFour]

function Hero() {
  const navigate = useNavigate()
  const [activeSlide, setActiveSlide] = useState(0)

  useEffect(() => {
    const slideTimer = window.setInterval(() => {
      setActiveSlide((currentSlide) => (currentSlide + 1) % slides.length)
    }, 5000)

    return () => window.clearInterval(slideTimer)
  }, [])

  return (
    <section className="hero-section" id="home">
      <div className="container hero-layout">
        <div className="hero-content">
          <span className="eyebrow">Professional Standards & Registration</span>
          <h1>Tanzania Teachers Professional Board</h1>
          <p className="hero-subtitle">
            Supporting teacher registration, licensing, and professional development to
            uphold quality teaching standards and strengthen the education system in
            Tanzania.
          </p>

          <div className="hero-actions">
            <button type="button" className="btn btn-primary large" onClick={() => navigate('/register')}>
              Register as a Teacher
            </button>
            <button type="button" className="btn btn-secondary large" onClick={() => navigate('/login')}>
              Login
            </button>
          </div>

          <div className="hero-stats" aria-label="Board statistics">
            <div className="stat-item">
              <strong>150K+</strong>
              <span>Registered Teachers</span>
            </div>
            <div className="stat-item">
              <strong>24/7</strong>
              <span>Online Support</span>
            </div>
            <div className="stat-item">
              <strong>100%</strong>
              <span>Professional Standards</span>
            </div>
          </div>
        </div>

        <div className="hero-visual" aria-label="TTPB image slideshow">
          <div className="slideshow-frame">
            {slides.map((slide, index) => (
              <img
                key={slide}
                className={`slide-image ${index === activeSlide ? 'active' : ''}`}
                src={slide}
                alt={`TTPB presentation slide ${index + 1}`}
              />
            ))}
            <div className="slide-caption">
              <span>Professional education in Tanzania</span>
              <strong>Slide {activeSlide + 1}</strong>
            </div>
          </div>

          <div className="slide-dots" aria-label="Choose slideshow image">
            {slides.map((slide, index) => (
              <button
                key={slide}
                type="button"
                className={`slide-dot ${index === activeSlide ? 'active' : ''}`}
                onClick={() => setActiveSlide(index)}
                aria-label={`Show slide ${index + 1}`}
                aria-current={index === activeSlide ? 'true' : undefined}
              />
            ))}
          </div>

          <div className="license-status">
            <span className="license-icon">✓</span>
            <span>
              <small>License Status</small>
              <strong>Verified & Licensed</strong>
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
