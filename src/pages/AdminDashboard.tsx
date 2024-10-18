// ... (keep existing imports)
import { categories } from '../data/products';

const AdminDashboard = () => {
  // ... (keep existing state and functions)

  const [categoryManagement, setCategoryManagement] = useState({
    categories: categories,
    editingCategory: null,
    editingSubcategory: null,
  });

  const handleCategoryChange = (id, newName) => {
    setCategoryManagement(prev => ({
      ...prev,
      categories: prev.categories.map(cat =>
        cat.id === id ? { ...cat, name: newName } : cat
      ),
    }));
  };

  const handleSubcategoryChange = (catId, subId, newName) => {
    setCategoryManagement(prev => ({
      ...prev,
      categories: prev.categories.map(cat =>
        cat.id === catId
          ? {
              ...cat,
              subcategories: cat.subcategories.map(sub =>
                sub.id === subId ? { ...sub, name: newName } : sub
              ),
            }
          : cat
      ),
    }));
  };

  const addCategory = () => {
    const newId = Math.max(...categoryManagement.categories.map(cat => cat.id)) + 1;
    setCategoryManagement(prev => ({
      ...prev,
      categories: [...prev.categories, { id: newId, name: 'New Category', subcategories: [] }],
    }));
  };

  const addSubcategory = (catId) => {
    setCategoryManagement(prev => ({
      ...prev,
      categories: prev.categories.map(cat =>
        cat.id === catId
          ? {
              ...cat,
              subcategories: [
                ...cat.subcategories,
                { id: Math.max(...cat.subcategories.map(sub => sub.id)) + 1, name: 'New Subcategory' },
              ],
            }
          : cat
      ),
    }));
  };

  const renderCategoryManagement = () => (
    <div>
      <h2 className="text-2xl font-bold mb-4">Category Management</h2>
      <button
        onClick={addCategory}
        className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition duration-300 mb-4"
      >
        Add Category
      </button>
      {categoryManagement.categories.map(category => (
        <div key={category.id} className="mb-4">
          <div className="flex items-center mb-2">
            <input
              type="text"
              value={category.name}
              onChange={(e) => handleCategoryChange(category.id, e.target.value)}
              className="border rounded px-2 py-1 mr-2"
            />
            <button
              onClick={() => addSubcategory(category.id)}
              className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 transition duration-300"
            >
              Add Subcategory
            </button>
          </div>
          <div className="ml-4">
            {category.subcategories.map(subcategory => (
              <div key={subcategory.id} className="flex items-center mb-2">
                <input
                  type="text"
                  value={subcategory.name}
                  onChange={(e) => handleSubcategoryChange(category.id, subcategory.id, e.target.value)}
                  className="border rounded px-2 py-1"
                />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      // ... (keep existing cases)
      case 'categories':
        return renderCategoryManagement();
      // ... (keep existing default case)
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <aside className="w-64 bg-white shadow-md">
        {/* ... (keep existing sidebar content) */}
        <Link
          to="#"
          className={`flex items-center px-4 py-2 text-gray-700 ${activeTab === 'categories' ? 'bg-emerald-100' : ''}`}
          onClick={() => setActiveTab('categories')}
        >
          <Package className="w-5 h-5 mr-2" />
          Categories
        </Link>
        {/* ... (keep other sidebar links) */}
      </aside>
      <main className="flex-1 p-8">
        {renderContent()}
      </main>
    </div>
  );
};

export default AdminDashboard;