// src/components/home/HeroSlider.jsx
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import img1 from '../../assets/1.png';
import img2 from '../../assets/2.png';
import img3 from '../../assets/3.png';
import img4 from '../../assets/4.png';

const slides = [
  { id: 1, src: img1, alt: 'BEGA India State Conclave & Trade Expo' },
  { id: 2, src: img2, alt: 'MSME Business Networking & Support Desk' },
  { id: 3, src: img3, alt: 'BEGA Seva Village Transformation Drive' },
  { id: 4, src: img4, alt: 'Maharashtra Business Excellence Awards' },
];

export default function HeroSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 mt-2 mb-6">
      <div className="relative w-full rounded-2xl overflow-hidden shadow-md border border-slate-200/90 bg-white group flex items-center justify-center">
        
        {/* Slides Track */}
        <div className="relative w-full flex items-center justify-center">
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className={`w-full flex items-center justify-center transition-opacity duration-700 ease-in-out ${
                index === currentIndex ? 'opacity-100 relative z-10 block' : 'opacity-0 absolute inset-0 hidden pointer-events-none'
              }`}
            >
              <img
                src={slide.src}
                alt={slide.alt}
                className="w-full h-auto max-h-[460px] object-cover sm:object-contain rounded-2xl"
              />
            </div>
          ))}
        </div>

        {/* Left Arrow */}
        <button
          onClick={prevSlide}
          className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-slate-900/70 hover:bg-slate-900 text-white flex items-center justify-center shadow transition-all opacity-0 group-hover:opacity-100 focus:opacity-100"
          aria-label="Previous Slide"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* Right Arrow */}
        <button
          onClick={nextSlide}
          className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-slate-900/70 hover:bg-slate-900 text-white flex items-center justify-center shadow transition-all opacity-0 group-hover:opacity-100 focus:opacity-100"
          aria-label="Next Slide"
        >
          <ChevronRight className="w-4 h-4" />
        </button>

        {/* Dots Indicator */}
        <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-full">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                currentIndex === idx ? 'w-4 bg-[#F57C00]' : 'w-1.5 bg-white/60 hover:bg-white'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

      </div>
    </div>
  );
}