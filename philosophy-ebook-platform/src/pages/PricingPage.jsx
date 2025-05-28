import React from 'react';
import MainHeader from '../components/Layout/MainHeader';
import MainFooter from '../components/Layout/MainFooter';
import PricingHero from '../components/Pricing/PricingHero';
import PricingCard from '../components/Pricing/PricingCard';
import ComparisonTable from '../components/Pricing/ComparisonTable';
import AdditionalServices from '../components/Pricing/AdditionalServices';
import FAQ from '../components/Pricing/FAQ';
import TestimonialSection from '../components/Pricing/TestimonialSection';


function PricingPage() {
  // Dummy data for pricing cards
  const plans = [
    { 
      id: 'free', 
      planName: "Free Tier", 
      priceDisplay: "$0/mo", 
      features: [
        "Access to 10 selected free books", 
        "Basic progress tracking for one child", 
        "Community forum access"
      ], 
      ctaText: "Get Started",
      isCurrentPlan: false
    },
    { 
      id: 'monthly', 
      planName: "Monthly Pro", 
      priceDisplay: "$14.99/mo", 
      isPopular: true, 
      features: [
        "Unlimited access to all books", 
        "Advanced progress tracking for up to 3 children", 
        "Priority customer support", 
        "Download books for offline reading",
        "Access to exclusive workshops"
      ], 
      ctaText: "Choose Monthly",
      isCurrentPlan: true 
    },
    { 
      id: 'yearly', 
      planName: "Yearly Pro", 
      priceDisplay: "$149.99/yr", 
      features: [
        "All Monthly Pro features", 
        "Save 20% compared to monthly plan", 
        "Early access to new content & features",
        "Yearly reading report summary"
      ], 
      ctaText: "Choose Yearly",
      isCurrentPlan: false
    }
  ];
  

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <MainHeader />
      <PricingHero />

      <section className="py-12 sm:py-16 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch justify-center">
            {plans.map(plan => (
              <div key={plan.id} className="flex justify-center">
                <PricingCard
                  planName={plan.planName}
                  priceDisplay={plan.priceDisplay}
                  isPopular={plan.isPopular}
                  features={plan.features}
                  ctaText={plan.ctaText}
                  isCurrentPlan={plan.isCurrentPlan}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <div className="container mx-auto px-4 space-y-12 sm:space-y-16 mb-12 sm:mb-16"> {/* Added container and spacing for new sections */}
        <ComparisonTable />
        <AdditionalServices />
        <FAQ />
        <TestimonialSection />
      </div>
      
    <div className="flex-grow"></div> {/* Pushes footer down */}
    <MainFooter />
    </div>
  );
}

export default PricingPage;
