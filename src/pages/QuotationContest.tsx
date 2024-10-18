import React, { useState } from 'react';
import { useLocation } from '../contexts/LocationContext';
import { demoServices } from '../data/demoData';
import Breadcrumb from '../components/Breadcrumb';

const QuotationContest = () => {
  const { location } = useLocation();
  const [projectDetails, setProjectDetails] = useState('');
  const [budget, setBudget] = useState('');
  const [timeline, setTimeline] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Quotation contest submitted:', { projectDetails, budget, timeline, selectedCategories, location });
    alert('Your quotation contest has been submitted. Providers will be notified and you will receive bids soon.');
  };

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const categories = [...new Set(demoServices.map(service => service.category))];

  const breadcrumbItems = [
    { label: 'Services', path: '/services' },
    { label: 'Quotation Contest', path: '/quotation-contest' },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumb items={breadcrumbItems} />
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Create a Quotation Contest</h1>
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
        <div className="mb-4">
          <label htmlFor="projectDetails" className="block text-gray-700 font-bold mb-2">
            Project Details
          </label>
          <textarea
            id="projectDetails"
            value={projectDetails}
            onChange={(e) => setProjectDetails(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg"
            rows={4}
            required
          ></textarea>
        </div>
        <div className="mb-4">
          <label htmlFor="budget" className="block text-gray-700 font-bold mb-2">
            Budget
          </label>
          <input
            type="number"
            id="budget"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="timeline" className="block text-gray-700 font-bold mb-2">
            Timeline
          </label>
          <input
            type="text"
            id="timeline"
            value={timeline}
            onChange={(e) => setTimeline(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg"
            placeholder="e.g., 2 weeks, 1 month"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">
            Categories
          </label>
          {categories.map(category => (
            <label key={category} className="flex items-center mb-2">
              <input
                type="checkbox"
                value={category}
                checked={selectedCategories.includes(category)}
                onChange={handleCategoryChange}
                className="mr-2"
              />
              {category}
            </label>
          ))}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">
            Location
          </label>
          <p>{location || 'Please set your location in the header'}</p>
        </div>
        <button
          type="submit"
          className="bg-emerald-600 text-white px-6 py-3 rounded-full hover:bg-emerald-700 transition duration-300"
        >
          Submit Quotation Contest
        </button>
      </form>
    </div>
  );
};

export default QuotationContest;
