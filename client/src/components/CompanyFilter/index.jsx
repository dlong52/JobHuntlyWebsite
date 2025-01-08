import { CheckIcon } from '@heroicons/react/24/outline';
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import React from 'react';

const CompanyFilter = () => {
  const categories = ['IT', 'Finance', 'Healthcare', 'Education'];
  const employeeSizes = ['1-10', '11-50', '51-200', '201-500', '500+'];

  const location = useLocation();
  const navigate = useNavigate();

  const [activeCategory, setActiveCategory] = useState('');
  const [activeSize, setActiveSize] = useState('');

  const getQueryParam = (param) => {
    const params = new URLSearchParams(location.search);
    return params.get(param);
  };

  useEffect(() => {
    setActiveCategory(getQueryParam('category') || '');
    setActiveSize(getQueryParam('size') || '');
  }, [location.search]);

  const updateQueryParams = (category = activeCategory, size = activeSize) => {
    const params = new URLSearchParams(location.search);
    if (category) params.set('category', category);
    if (size) params.set('size', size);

    navigate(`?${params.toString()}`);
  };

  const renderFilterItem = (label, active, onClick) => (
    <div
      className={`flex cursor-pointer items-center mb-2 rounded p-2 transition-colors duration-200 ${active ? '' : 'hover:bg-gray-100'}`}
      onClick={onClick}
    >
      <div className={`flex items-center justify-center w-5 h-5 rounded-[5px] ${active ? 'bg-blue-700' : 'border-2 border-gray-300'} text-gray-600 mr-2`}>
        {active && <CheckIcon className="w-3 h-3 text-white" />}
      </div>
      <span className={`text-sm font-medium ${active ? 'text-blue-700' : 'text-gray-700'} transition duration-200`}>
        {label}
      </span>
    </div>
  );

  return (
    <div className="py-4">
      {/* Danh mục */}
      <div>
        <span className="block text-md font-semibold mb-3 text-gray-800">Danh mục</span>
        {categories.map((category) =>
          renderFilterItem(
            category,
            activeCategory === category,
            () => updateQueryParams(category, null)
          )
        )}
      </div>
      
      {/* Quy mô */}
      <div className="mt-6">
        <span className="block text-md font-semibold mb-3 text-gray-800">Quy mô</span>
        {employeeSizes.map((size) =>
          renderFilterItem(
            size,
            activeSize === size,
            () => updateQueryParams(null, size)
          )
        )}
      </div>
    </div>
  );
};

export default CompanyFilter;
