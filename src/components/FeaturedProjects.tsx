import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ExternalLink } from 'lucide-react';

const projects = [
  {
    id: 1,
    title: 'Modern Living Room',
    images: [
      'https://images.unsplash.com/photo-1600210492493-0946911123ea?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1567225557594-88d73e55f2cb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    ],
    designer: {
      name: 'Jane Doe',
      id: 1,
    },
    likes: 245,
    description: 'A sleek and contemporary living room design with minimalist furniture and bold accents.',
    serviceId: 1,
  },
  {
    id: 2,
    title: 'Cozy Bedroom',
    images: [
      'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1617325247661-675ab4b64b12?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1618377385526-83312906f0dc?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    ],
    designer: {
      name: 'John Smith',
      id: 2,
    },
    likes: 189,
    description: 'A warm and inviting bedroom design with soft textures and calming colors.',
    serviceId: 2,
  },
  {
    id: 3,
    title: 'Minimalist Kitchen',
    images: [
      'https://images.unsplash.com/photo-1556912167-f556f1f39faa?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1600585152220-90363fe7e115?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1565538810643-b5bdb714032a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    ],
    designer: {
      name: 'Emma Wilson',
      id: 3,
    },
    likes: 302,
    description: 'A clean and functional kitchen design with sleek appliances and ample storage.',
    serviceId: 3,
  },
  {
    id: 4,
    title: 'Luxurious Bathroom',
    images: [
      'https://images.unsplash.com/photo-1600566752355-35792bedcfea?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1620626011761-996317b8d101?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    ],
    designer: {
      name: 'Michael Brown',
      id: 4,
    },
    likes: 178,
    description: 'An opulent bathroom design featuring marble surfaces and high-end fixtures.',
    serviceId: 4,
  },
];

const FeaturedProjects = () => {
  const [activeImageIndexes, setActiveImageIndexes] = useState(projects.map(() => 0));

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, projectIndex: number) => {
    const { left, width } = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - left;
    const percentage = x / width;
    const imageIndex = Math.floor(percentage * projects[projectIndex].images.length);
    setActiveImageIndexes(prev => {
      const newIndexes = [...prev];
      newIndexes[projectIndex] = imageIndex;
      return newIndexes;
    });
  };

  return (
    <section className="container mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-gray-800 mb-8">Featured Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {projects.map((project, index) => (
          <div key={project.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div 
              className="relative h-64 overflow-hidden cursor-pointer"
              onMouseMove={(e) => handleMouseMove(e, index)}
              onMouseLeave={() => setActiveImageIndexes(prev => {
                const newIndexes = [...prev];
                newIndexes[index] = 0;
                return newIndexes;
              })}
            >
              <img 
                src={project.images[activeImageIndexes[index]]} 
                alt={project.title} 
                className="w-full h-full object-cover transition-opacity duration-300"
              />
              <Link
                to={`/services/${project.serviceId}`}
                className="absolute top-2 right-2 bg-white bg-opacity-75 p-2 rounded-full hover:bg-opacity-100 transition-opacity duration-300"
                title="View project details"
              >
                <ExternalLink className="w-5 h-5 text-gray-600" />
              </Link>
            </div>
            <div className="p-4">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{project.title}</h3>
              <p className="text-gray-600 mb-2">
                by{' '}
                <Link
                  to={`/services/${project.serviceId}`}
                  className="text-emerald-600 hover:underline"
                  title="View designer's services"
                >
                  {project.designer.name}
                </Link>
              </p>
              <p className="text-sm text-gray-500 mb-4">{project.description}</p>
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <Heart className="w-5 h-5 text-red-500 mr-1" fill="currentColor" />
                  <span className="text-gray-500">{project.likes}</span>
                </div>
                <Link
                  to={`/services/${project.serviceId}`}
                  className="bg-emerald-600 text-white px-4 py-2 rounded-full hover:bg-emerald-700 transition duration-300"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedProjects;