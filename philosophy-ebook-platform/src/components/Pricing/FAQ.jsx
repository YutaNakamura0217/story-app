import React from 'react';
import FAQItem from './FAQItem';

function FAQ() {
  const faqs = [
    { q: "Can I cancel my subscription anytime?", a: "Yes, you can cancel your Pro subscription at any time. You'll retain access until the end of your current billing period." },
    { q: "What payment methods do you accept?", a: "We accept all major credit cards, including Visa, Mastercard, and American Express. PayPal is also supported." },
    { q: "Is there a free trial for Pro plans?", a: "Currently, we offer a Free Tier with limited access. We may offer free trials for Pro plans during special promotional periods." },
    { q: "Can I add multiple children to one account?", a: "Yes, all our plans support multiple child profiles under a single parent account, allowing personalized tracking for each child." }
  ];

  return (
    <section className="py-12 bg-gray-100 rounded-lg shadow-xl">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">Frequently Asked Questions</h2>
        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <FAQItem key={index} question={faq.q} answer={faq.a} />
          ))}
        </div>
      </div>
    </section>
  );
}
export default FAQ;
