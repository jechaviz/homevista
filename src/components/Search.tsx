import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Filter, ChevronDown, ChevronUp } from 'lucide-react';
import { categories } from '../data/products';
import ProductCard from './ProductCard';
import ServiceCard from './ServiceCard';
import Breadcrumb from './Breadcrumb';

interface SearchProps {
  initialProducts: any[];
  initialServices: any[];
  showProductsOnly?: boolean;
  showServicesOnly?: boolean;
}

const Search: React.FC<SearchProps> = ({ 
  initialProducts, 
  initialServices, 
  showProductsOnly = false, 
  showServicesOnly = false 
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchResults, setSearchResults] = useState({ products: initialProducts, services: initialServices });
  const [filters, setFilters] = useState({
    category: '',
    subcategories: [],
    priceRange: '',
    rating: 0,
    type: showProductsOnly ? 'products' : showServicesOnly ? 'services' : 'all',
    colors: [],
    serviceTypes: [],
  });
  const [showFilters, setShowFilters] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState({});

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const categoryParam = params.get('category');
    if (categoryParam) {
      setFilters(prev => ({ ...prev, category: categoryParam }));
      setExpandedCategories(prev => ({ ...prev, [categoryParam]: true }));
    }
    applyFilters();
  }, [location.search]);

  useEffect(() => {
    applyFilters();
  }, [filters]);

  const handleFilterChange = (e) => {
    const { name, value, checked, type } = e.target;
    if (type === 'checkbox') {
      if (name === 'category') {
        setFilters(prev => ({ ...prev, [name]: checked ? value : '' }));
      } else {
        setFilters(prev => ({
          ...prev,
          [name]: checked
            ? [...prev[name], value]
            : prev[name].filter(item => item !== value)
        }));
      }
    } else {
      setFilters(prev => ({ ...prev, [name]: value }));
    }
  };

  const toggleCategory = (categoryName) => {
    setExpandedCategories(prev => ({
      ...prev,
      [categoryName]: !prev[categoryName]
    }));
  };

  const applyFilters = () => {
    let filteredProducts = initialProducts;
    let filteredServices = initialServices;

    if (filters.category) {
      filteredProducts = filteredProducts.filter(item => item.category === filters.category);
      filteredServices = filteredServices.filter(item => item.category === filters.category);
    }
    if (filters.subcategories.length > 0) {
      filteredProducts = filteredProducts.filter(item => filters.subcategories.includes(item.subcategory));
    }
    if (filters.priceRange) {
      const [min, max] = filters.priceRange.split('-').map(Number);
      filteredProducts = filteredProducts.filter(item => item.price >= min && item.price <= max);
      filteredServices = filteredServices.filter(item => item.price >= min && item.price <= max);
    }
    if (filters.rating) {
      filteredProducts = filteredProducts.filter(item => item.rating >= filters.rating);
      filteredServices = filteredServices.filter(item => item.rating >= filters.rating);
    }
    if (filters.colors.length > 0) {
      filteredProducts = filteredProducts.filter(item => 
        item.colors.some(color => filters.colors.includes(color))
      );
    }
    if (filters.serviceTypes.length > 0) {
      filteredServices = filteredServices.filter(item => 
        filters.serviceTypes.includes(item.serviceType)
      );
    }

    if (filters.type === 'products' || showProductsOnly) {
      filteredServices = [];
    } else if (filters.type === 'services' || showServicesOnly) {
      filteredProducts = [];
    }

    setSearchResults({ products: filteredProducts, services: filteredServices });

    // Update URL with selected category
    if (filters.category) {
      navigate(`/search?category=${filters.category}`, { replace: true });
    } else {
      navigate('/search', { replace: true });
    }
  };

  const breadcrumbItems = [
    { label: 'Search', path: '/search' },
    ...(filters.category ? [{ label: filters.category, path: `/search?category=${filters.category}` }] : []),
  ];

  const allColors = [...new Set(initialProducts.flatMap(product => product.colors))];
  const allServiceTypes = [...new Set(initialServices.map(service => service.serviceType))];

  const showProductFilters = !showServicesOnly && (filters.type === 'all' || filters.type === 'products');
  const showServiceFilters = !showProductsOnly && (filters.type === 'all' || filters.type === 'services');

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumb items={breadcrumbItems} />
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Search Products and Services</h1>
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/4">
          <div className="bg-white rounded-lg shadow-md p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold flex items-center">
                <Filter className="w-5 h-5 mr-2" />
                Filters
              </h2>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="md:hidden"
              >
                {showFilters ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
              </button>
            </div>
            <div className={`${showFilters ? 'block' : 'hidden md:block'}`}>
              {!showProductsOnly && !showServicesOnly && (
                <div className="mb-4">
                  <h3 className="font-semibold mb-2">Type</h3>
                  <select
                    name="type"
                    value={filters.type}
                    onChange={handleFilterChange}
                    className="w-full px-3 py-2 border rounded-lg"
                  >
                    <option value="all">All</option>
                    <option value="products">Products</option>
                    <option value="services">Services</option>
                  </select>
                </div>
              )}
              <div className="mb-4">
                <h3 className="font-semibold mb-2">Categories</h3>
                {categories.map(category => (
                  <div key={category.id} className="mb-2">
                    <div
                      className="flex items-center cursor-pointer"
                      onClick={() => toggleCategory(category.name)}
                    >
                      {expandedCategories[category.name] ? (
                        <ChevronUp className="w-4 h-4 mr-1" />
                      ) : (
                        <ChevronDown className="w-4 h-4 mr-1" />
                      )}
                      <label className="cursor-pointer">
                        <input
                          type="checkbox"
                          name="category"
                          value={category.name}
                          checked={filters.category === category.name}
                          onChange={handleFilterChange}
                          className="mr-2"
                        />
                        {category.name}
                      </label>
                    </div>
                    {expandedCategories[category.name] && (
                      <div className="ml-6 mt-2">
                        {category.subcategories.map(subcategory => (
                          <div key={subcategory.id} className="mb-1">
                            <label className="flex items-center">
                              <input
                                type="checkbox"
                                name="subcategories"
                                value={subcategory.name}
                                checked={filters.subcategories.includes(subcategory.name)}
                                onChange={handleFilterChange}
                                className="mr-2"
                              />
                              {subcategory.name}
                            </label>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <div className="mb-4">
                <h3 className="font-semibold mb-2">Price Range</h3>
                <select
                  name="priceRange"
                  value={filters.priceRange}
                  onChange={handleFilterChange}
                  className="w-full px-3 py-2 border rounded-lg"
                >
                  <option value="">All Prices</option>
                  <option value="0-100">$0 - $100</option>
                  <option value="100-500">$100 - $500</option>
                  <option value="500-1000">$500 - $1000</option>
                  <option value="1000-5000">$1000+</option>
                </select>
              </div>
              <div className="mb-4">
                <h3 className="font-semibold mb-2">Minimum Rating</h3>
                <select
                  name="rating"
                  value={filters.rating}
                  onChange={handleFilterChange}
                  className="w-full px-3 py-2 border rounded-lg"
                >
                  <option value="0">All Ratings</option>
                  <option value="4">4+ Stars</option>
                  <option value="3">3+ Stars</option>
                  <option value="2">2+ Stars</option>
                  <option value="1">1+ Star</option>
                </select>
              </div>
              {showProductFilters && (
                <div className="mb-4">
                  <h3 className="font-semibold mb-2">Colors</h3>
                  {allColors.map(color => (
                    <label key={color} className="flex items-center mb-1">
                      <input
                        type="checkbox"
                        name="colors"
                        value={color}
                        checked={filters.colors.includes(color)}
                        onChange={handleFilterChange}
                        className="mr-2"
                      />
                      {color}
                    </label>
                  ))}
                </div>
              )}
              {showServiceFilters && (
                <div className="mb-4">
                  <h3 className="font-semibold mb-2">Service Types</h3>
                  {allServiceTypes.map(type => (
                    <label key={type} className="flex items-center mb-1">
                      <input
                        type="checkbox"
                        name="serviceTypes"
                        value={type}
                        checked={filters.serviceTypes.includes(type)}
                        onChange={handleFilterChange}
                        className="mr-2"
                      />
                      {type}
                    </label>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="md:w-3/4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {searchResults.products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
            {searchResults.services.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;