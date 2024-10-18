import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, Clock, Tag, CheckCircle, Calendar, MapPin, MessageSquare, ChevronLeft, ChevronRight } from 'lucide-react';
import { demoServices } from '../data/demoData';
import Breadcrumb from '../components/Breadcrumb';

const ServiceDetail = () => {
  const { id } = useParams();
  const service = demoServices.find(s => s.id === Number(id));
  const [selectedPackage, setSelectedPackage] = useState('basic');
  const [showChat, setShowChat] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const [activePortfolioIndex, setActivePortfolioIndex] = useState(0);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [activeProjectTab, setActiveProjectTab] = useState('description');

  if (!service) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">Service not found</h1>
        <Link to="/services" className="text-emerald-600 hover:underline">
          Back to services
        </Link>
      </div>
    );
  }

  const packages = {
    basic: { 
      name: 'Basic', 
      price: service.price,
      features: [
        'Initial consultation',
        'Basic design concept',
        'One revision round',
      ],
    },
    standard: { 
      name: 'Standard', 
      price: service.price * 1.5,
      features: [
        'Everything in Basic',
        'Detailed design plan',
        'Two revision rounds',
        'Material recommendations',
      ],
    },
    premium: { 
      name: 'Premium', 
      price: service.price * 2,
      features: [
        'Everything in Standard',
        '3D rendering of design',
        'Unlimited revision rounds',
        'Project management assistance',
      ],
    },
  };

  const breadcrumbItems = [
    { label: 'Services', path: '/services' },
    { label: service.category, path: `/services?category=${service.category}` },
    { label: service.title, path: `/services/${service.id}` },
  ];

  const handleSendMessage = () => {
    alert("In real mode, you would contact a real seller and they will answer you as soon as our seller is available.");
    setChatMessage('');
    setShowChat(false);
  };

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  const handleTimeChange = (e) => {
    setSelectedTime(e.target.value);
  };

  const isDateBusy = (date) => {
    // Simulate busy days (e.g., weekends are busy)
    const busyDay = new Date(date).getDay();
    return busyDay === 0 || busyDay === 6;
  };

  const getAvailableTimes = () => {
    // Simulate available times based on the selected date
    const availableTimes = ['9:00 AM', '10:00 AM', '11:00 AM', '1:00 PM', '2:00 PM', '3:00 PM'];
    if (isDateBusy(selectedDate)) {
      return availableTimes.slice(0, 3); // Fewer slots on busy days
    }
    return availableTimes;
  };

  const calculatePercentageOff = (originalPrice, discountedPrice) => {
    return Math.round((1 - discountedPrice / originalPrice) * 100);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumb items={breadcrumbItems} />

      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-2/3">
          <div className="relative mb-6">
            <img 
              src={service.image} 
              alt={service.title} 
              className="w-full h-64 object-cover rounded-lg shadow-md"
            />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-4">{service.title}</h1>
          <div className="flex items-center mb-4">
            <div className="flex items-center mr-4">
              <Star className="w-5 h-5 text-yellow-400 mr-1" fill="currentColor" />
              <span className="text-gray-600">{service.rating.toFixed(1)} ({service.reviews} reviews)</span>
            </div>
            <div className="flex items-center mr-4">
              <Clock className="w-5 h-5 text-gray-500 mr-1" />
              <span className="text-gray-600">{service.duration}</span>
            </div>
            <div className="flex items-center">
              <Tag className="w-5 h-5 text-gray-500 mr-1" />
              <span className="text-gray-600">Starting at ${service.price}</span>
            </div>
          </div>
          <p className="text-gray-600 mb-6">{service.description}</p>
          
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Portfolio</h2>
          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <button
                onClick={() => setActivePortfolioIndex((prev) => (prev === 0 ? service.portfolio.length - 1 : prev - 1))}
                className="bg-gray-200 p-2 rounded-full"
              >
                <ChevronLeft className="w-6 h-6 text-gray-600" />
              </button>
              <h3 className="text-xl font-semibold">{service.portfolio[activePortfolioIndex].title}</h3>
              <button
                onClick={() => setActivePortfolioIndex((prev) => (prev === service.portfolio.length - 1 ? 0 : prev + 1))}
                className="bg-gray-200 p-2 rounded-full"
              >
                <ChevronRight className="w-6 h-6 text-gray-600" />
              </button>
            </div>
            <div className="relative">
              <img 
                src={service.portfolio[activePortfolioIndex].images[activeImageIndex]} 
                alt={service.portfolio[activePortfolioIndex].title} 
                className="w-full h-64 object-cover rounded-lg shadow-md"
              />
              <button
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md"
                onClick={() => setActiveImageIndex((prev) => (prev === 0 ? service.portfolio[activePortfolioIndex].images.length - 1 : prev - 1))}
              >
                <ChevronLeft className="w-6 h-6 text-gray-600" />
              </button>
              <button
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md"
                onClick={() => setActiveImageIndex((prev) => (prev === service.portfolio[activePortfolioIndex].images.length - 1 ? 0 : prev + 1))}
              >
                <ChevronRight className="w-6 h-6 text-gray-600" />
              </button>
            </div>
            <div className="flex mt-4 space-x-2 overflow-x-auto">
              {service.portfolio[activePortfolioIndex].images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`${service.portfolio[activePortfolioIndex].title} ${index + 1}`}
                  className={`w-20 h-20 object-cover rounded-md cursor-pointer ${index === activeImageIndex ? 'border-2 border-emerald-500' : ''}`}
                  onClick={() => setActiveImageIndex(index)}
                />
              ))}
            </div>
            <div className="mt-4">
              <div className="flex space-x-4 mb-4">
                <button
                  className={`px-4 py-2 rounded-full ${activeProjectTab === 'description' ? 'bg-emerald-600 text-white' : 'bg-gray-200 text-gray-700'}`}
                  onClick={() => setActiveProjectTab('description')}
                >
                  Description
                </button>
                <button
                  className={`px-4 py-2 rounded-full ${activeProjectTab === 'details' ? 'bg-emerald-600 text-white' : 'bg-gray-200 text-gray-700'}`}
                  onClick={() => setActiveProjectTab('details')}
                >
                  Details
                </button>
              </div>
              {activeProjectTab === 'description' && (
                <p className="text-gray-600">{service.portfolio[activePortfolioIndex].description}</p>
              )}
              {activeProjectTab === 'details' && (
                <div>
                  <p className="text-gray-600"><strong>Personnel Required:</strong> {service.portfolio[activePortfolioIndex].personnelRequired}</p>
                  <p className="text-gray-600"><strong>Time to Complete:</strong> {service.portfolio[activePortfolioIndex].timeToComplete}</p>
                  <p className="text-gray-600"><strong>Cost:</strong> ${service.portfolio[activePortfolioIndex].cost}</p>
                </div>
              )}
            </div>
          </div>

          <h2 className="text-2xl font-bold text-gray-800 mb-4">What's Included</h2>
          <ul className="list-none mb-6">
            <li className="flex items-center mb-2">
              <CheckCircle className="w-5 h-5 text-emerald-500 mr-2" />
              <span>Professional consultation and assessment</span>
            </li>
            <li className="flex items-center mb-2">
              <CheckCircle className="w-5 h-5 text-emerald-500 mr-2" />
              <span>Customized design plan tailored to your needs</span>
            </li>
            <li className="flex items-center mb-2">
              <CheckCircle className="w-5 h-5 text-emerald-500 mr-2" />
              <span>Expert advice on materials and color schemes</span>
            </li>
            <li className="flex items-center mb-2">
              <CheckCircle className="w-5 h-5 text-emerald-500 mr-2" />
              <span>Follow-up support and recommendations</span>
            </li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-800 mb-4">Service Areas</h2>
          <div className="flex items-center mb-6">
            <MapPin className="w-5 h-5 text-gray-500 mr-2" />
            <span className="text-gray-600">New York City, Los Angeles, Chicago, Miami, San Francisco</span>
          </div>

          <h2 className="text-2xl font-bold text-gray-800 mb-4">About the Seller</h2>
          <div className="flex items-center mb-4">
            <img src={service.providerImage} alt={service.providerName} className="w-16 h-16 rounded-full mr-4" />
            <div>
              <h3 className="text-xl font-semibold">{service.providerName}</h3>
              <p className="text-gray-600">Professional Interior Designer</p>
            </div>
          </div>
          <p className="text-gray-600 mb-6">
            With over 10 years of experience in interior design, {service.providerName} has transformed countless homes 
            and commercial spaces. Specializing in modern and contemporary designs, they bring a unique blend of 
            creativity and functionality to every project.
          </p>
        </div>
        <div className="md:w-1/3">
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Choose a Package</h2>
            <div className="flex border-b mb-4">
              {Object.entries(packages).map(([key, pkg]) => (
                <button
                  key={key}
                  className={`flex-1 py-2 ${selectedPackage === key ? 'border-b-2 border-emerald-500 text-emerald-600' : 'text-gray-500'}`}
                  onClick={() => setSelectedPackage(key)}
                >
                  {pkg.name}
                </button>
              ))}
            </div>
            <div className="mb-4">
              <h3 className="text-lg font-semibold mb-2">{packages[selectedPackage].name} Package</h3>
              {selectedPackage !== 'basic' && (
                <p className="text-sm text-red-600 mb-2">
                  {calculatePercentageOff(packages[selectedPackage].price, packages.basic.price)}% OFF
                </p>
              )}
              <p className="text-2xl font-bold text-emerald-600 mb-2">${packages[selectedPackage].price.toFixed(2)}</p>
              <ul className="list-disc list-inside text-gray-600">
                {packages[selectedPackage].features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
            <button className="w-full bg-emerald-600 text-white px-6 py-3 rounded-full hover:bg-emerald-700 transition duration-300">
              Continue (${packages[selectedPackage].price.toFixed(2)})
            </button>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Schedule a Consultation</h2>
            <p className="text-gray-600 mb-4">Choose a date and time that works for you:</p>
            <div className="mb-4">
              <input 
                type="date" 
                className="w-full border rounded-lg px-3 py-2 mb-2"
                onChange={handleDateChange}
                min={new Date().toISOString().split('T')[0]}
              />
              <select 
                className="w-full border rounded-lg px-3 py-2"
                onChange={handleTimeChange}
                disabled={!selectedDate}
              >
                <option value="">Select a time</option>
                {getAvailableTimes().map((time) => (
                  <option key={time} value={time}>{time}</option>
                ))}
              </select>
            </div>
            <button 
              className="w-full bg-emerald-600 text-white px-6 py-3 rounded-full hover:bg-emerald-700 transition duration-300"
              disabled={!selectedDate || !selectedTime}
            >
              Schedule Consultation
            </button>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Contact Seller</h2>
            {!showChat ? (
              <button 
                onClick={() => setShowChat(true)}
                className="w-full bg-gray-100 text-gray-800 px-6 py-3 rounded-full hover:bg-gray-200 transition duration-300 mb-4"
              >
                <MessageSquare className="w-5 h-5 inline-block mr-2" />
                Chat with {service.providerName}
              </button>
            ) : (
              <div>
                <textarea
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  placeholder="Type your message here..."
                  className="w-full border rounded-lg px-3 py-2 mb-2"
                  rows={4}
                ></textarea>
                <button
                  onClick={handleSendMessage}
                  className="w-full bg-emerald-600 text-white px-6 py-3 rounded-full hover:bg-emerald-700 transition duration-300"
                >
                  Send Message
                </button>
              </div>
            )}
            <div className="flex items-center justify-center text-gray-500 mt-4">
              <Calendar className="w-5 h-5 mr-2" />
              <span>Usually responds within 24 hours</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetail;