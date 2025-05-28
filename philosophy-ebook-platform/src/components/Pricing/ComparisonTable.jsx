import React from 'react';

function ComparisonTable() {
  const features = [
    { name: "Access to all books", free: "Limited", monthly: true, yearly: true },
    { name: "Offline reading", free: false, monthly: true, yearly: true },
    { name: "Advanced progress tracking", free: false, monthly: true, yearly: true },
    { name: "Parental controls", free: true, monthly: true, yearly: true },
    { name: "Priority support", free: false, monthly: true, yearly: true },
    { name: "Exclusive workshops", free: false, monthly: false, yearly: true },
  ];

  const Checkmark = ({ available }) => (
    <span className={`text-2xl ${available ? 'text-green-500' : 'text-gray-400'}`}>
      {available === true ? '✓' : (available === false ? '✕' : available)}
    </span>
  );

  return (
    <section className="py-12 bg-white rounded-lg shadow-xl">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">Compare Our Plans</h2>
        <div className="overflow-x-auto">
          <table className="w-full min-w-max text-left">
            <thead>
              <tr className="border-b border-gray-300">
                <th className="p-4 text-lg font-semibold text-gray-700">Features</th>
                <th className="p-4 text-lg font-semibold text-gray-700 text-center">Free Tier</th>
                <th className="p-4 text-lg font-semibold text-gray-700 text-center">Monthly Pro</th>
                <th className="p-4 text-lg font-semibold text-gray-700 text-center">Yearly Pro</th>
              </tr>
            </thead>
            <tbody>
              {features.map((feature, index) => (
                <tr key={index} className={`border-b border-gray-200 ${index % 2 === 0 ? 'bg-gray-50' : ''}`}>
                  <td className="p-4 text-gray-700">{feature.name}</td>
                  <td className="p-4 text-center"><Checkmark available={feature.free} /></td>
                  <td className="p-4 text-center"><Checkmark available={feature.monthly} /></td>
                  <td className="p-4 text-center"><Checkmark available={feature.yearly} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
export default ComparisonTable;
