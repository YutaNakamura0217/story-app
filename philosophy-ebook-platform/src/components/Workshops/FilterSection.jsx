import React from 'react';

function FilterSection() {
  // Dummy options for filters
  const ageRanges = ["All Ages", "4-6 years", "7-9 years", "10-12 years", "13+ years"];
  const dateOptions = ["Any Date", "Next 7 Days", "Next 30 Days", "Custom Range..."];
  const priceRanges = ["Any Price", "$0 - $20", "$21 - $50", "$51+"];
  const workshopTypes = ["All Types", "Logic & Critical Thinking", "Ethics & Morality", "Creativity & Imagination", "Social & Emotional Learning"];

  const FilterDropdown = ({ label, options }) => (
    <div className="w-full md:w-auto">
      <label htmlFor={label.toLowerCase().replace(' ', '-')} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <select
        id={label.toLowerCase().replace(' ', '-')}
        className="w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
      >
        {options.map(option => <option key={option} value={option}>{option}</option>)}
      </select>
    </div>
  );

  return (
    <section className="py-6 px-4 mb-8 bg-gray-100 rounded-lg shadow">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 items-end">
          <FilterDropdown label="Age Range" options={ageRanges} />
          <FilterDropdown label="Date" options={dateOptions} />
          <FilterDropdown label="Price Range" options={priceRanges} />
          <FilterDropdown label="Workshop Type" options={workshopTypes} />
        </div>
        <div className="mt-4 text-right">
            <button className="bg-purple-600 text-white py-2 px-6 rounded-lg hover:bg-purple-700 transition-colors font-semibold">
                Apply Filters
            </button>
        </div>
      </div>
    </section>
  );
}

export default FilterSection;
