import React from 'react';

function AdditionalServices() {
  const services = [
    { title: "Exclusive Workshops", description: "Engage in live, interactive philosophy workshops led by experts. Special discounts for Pro members.", cta: "View Workshops" },
    { title: "Custom Content Packs", description: "Tailor learning paths with curated book and question packs for specific age groups or themes.", cta: "Inquire Now" },
    { title: "School & Corporate Plans", description: "Bring our platform to your institution with bulk licenses and dedicated support.", cta: "Contact Sales" },
  ];

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">More Than Just Books</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-lg text-center flex flex-col">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">{service.title}</h3>
              <p className="text-gray-600 mb-4 flex-grow">{service.description}</p>
              <button className="mt-auto bg-indigo-500 text-white py-2 px-4 rounded-lg hover:bg-indigo-600 transition-colors">
                {service.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
export default AdditionalServices;
