import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const videoSamples = [
  {
    url: 'https://assets.mixkit.co/videos/preview/mixkit-living-room-with-a-modern-tv-setup-4646-large.mp4',
    title: 'Modern Living Room',
  },
  {
    url: 'https://assets.mixkit.co/videos/preview/mixkit-hands-holding-a-smart-house-remote-control-4490-large.mp4',
    title: 'Smart Home Control',
  },
  {
    url: 'https://assets.mixkit.co/videos/preview/mixkit-white-living-room-with-huge-windows-4633-large.mp4',
    title: 'Spacious Living Area',
  },
];

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % videoSamples.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % videoSamples.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + videoSamples.length) % videoSamples.length);
  };

  return (
    <div className="relative h-[500px] overflow-hidden">
      {videoSamples.map((video, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <video
            src={video.url}
            autoPlay
            loop
            muted
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="text-center">
              <h2 className="text-4xl font-bold text-white mb-4">{video.title}</h2>
              <p className="text-xl text-white mb-8">Find inspiration, products, and professionals for your next project</p>
              <div className="flex justify-center">
                <Link to="/search" className="bg-emerald-600 text-white px-6 py-3 rounded-full hover:bg-emerald-700 transition duration-300 mr-4">
                  Shop Products
                </Link>
                <Link to="/services" className="bg-white text-emerald-600 px-6 py-3 rounded-full hover:bg-gray-100 transition duration-300">
                  Find Services
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}
      <button
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2 hover:bg-opacity-75 transition duration-300"
        onClick={prevSlide}
      >
        <ChevronLeft className="w-6 h-6 text-gray-800" />
      </button>
      <button
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2 hover:bg-opacity-75 transition duration-300"
        onClick={nextSlide}
      >
        <ChevronRight className="w-6 h-6 text-gray-800" />
      </button>
    </div>
  );
};

export default Hero;