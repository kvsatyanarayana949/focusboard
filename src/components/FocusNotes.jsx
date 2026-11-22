import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Check } from "lucide-react";
import { focusNotesSlides } from "../data/focusNotesData";

export function FocusNotes() {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  const totalSlides = focusNotesSlides.length;
  const currentSlide = focusNotesSlides[currentSlideIndex];

  const handlePrev = () => {
    setCurrentSlideIndex((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentSlideIndex((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
  };

  return (
    <section className="focus-carousel" aria-label="Focus Notes Carousel">
      <div className="carousel-content-left">
        <div className="carousel-tag-row">
          <span className="carousel-tag">{currentSlide.tag}</span>
          <span className="carousel-slide-num">{currentSlide.slideNumber}</span>
        </div>

        <h2 className="carousel-title">{currentSlide.title}</h2>
        <p className="carousel-subtitle">{currentSlide.subtitle}</p>

        <div className="carousel-indicators" role="tablist" aria-label="Slide indicators">
          {focusNotesSlides.map((slide, idx) => (
            <button
              key={slide.id}
              role="tab"
              aria-selected={idx === currentSlideIndex}
              aria-label={`Go to slide ${idx + 1}`}
              className={`indicator-bar ${idx === currentSlideIndex ? "active" : ""}`}
              onClick={() => setCurrentSlideIndex(idx)}
            />
          ))}
        </div>
      </div>

      <div className="carousel-content-right">
        {/* Floating Tilted Progress Card */}
        <div className="floating-progress-card">
          <div className="floating-card-badge-row">
            {currentSlide.progress === 100 ? (
              <Check size={12} color="#10B981" strokeWidth={3} />
            ) : null}
            <span className="floating-card-badge">{currentSlide.cardBadge}</span>
          </div>

          <div className="floating-card-title">{currentSlide.cardTitle}</div>

          <div className="floating-progress-row">
            <div className="floating-progress-track">
              <div
                className="floating-progress-fill"
                style={{ width: `${currentSlide.progress}%` }}
              />
            </div>
            <span className="floating-progress-text">{currentSlide.progress}%</span>
          </div>
        </div>

        {/* Carousel Previous and Next Controls */}
        <div className="carousel-nav-btns">
          <button
            className="carousel-btn"
            onClick={handlePrev}
            aria-label="Previous slide"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            className="carousel-btn highlight"
            onClick={handleNext}
            aria-label="Next slide"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}
