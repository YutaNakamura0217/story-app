import React from 'react';

function TestimonialSection() {
  const testimonials = [
    { name: "Sarah L.", text: "This platform has transformed how my kids engage with complex ideas. They're asking so many thoughtful questions now!", location: "Parent from California" },
    { name: "David K.", text: "The variety of books and the guiding questions are fantastic. A great tool for homeschooling.", location: "Homeschooling Dad" },
    { name: "Emily R.", text: "As a teacher, I appreciate the curated themes. It makes planning philosophy discussions much easier.", location: "Elementary School Teacher" }
  ];

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">Loved by Parents & Educators</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-lg flex flex-col h-full"> {/* Added h-full for equal height cards */}
              <p className="text-gray-600 italic mb-4 flex-grow">"{testimonial.text}"</p>
              <div className="mt-auto"> {/* Pushes name/location to bottom if text length varies */}
                <p className="font-semibold text-gray-800">{testimonial.name}</p>
                <p className="text-sm text-gray-500">{testimonial.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
export default TestimonialSection;
