
import React from 'react';
import { useAuth } from '../../hooks/useAuth';
// Removed Badge and AcademicCapIcon as they are not in the new design reference for this section

const WelcomeSection: React.FC = () => {
  const { user } = useAuth();

  if (!user) return null;

  // The reference shows a simple greeting.
  // The "お早うございます" logic can be kept or simplified to just the name.
  // For now, simplifying to match the visual of the reference.
  // const getGreeting = () => {
  //   const hour = new Date().getHours();
  //   if (hour < 12) return 'おはようございます';
  //   if (hour < 18) return 'こんにちは';
  //   return 'こんばんは';
  // };
  // Example: <h2 class="text-amber-900 tracking-tight text-4xl font-bold leading-tight">おかえりなさい、ソフィア！</h2>

  return (
    <div className="p-4 mb-4 sm:mb-8"> {/* Removed background, added margin */}
      <h2 className="text-amber-900 tracking-tight text-3xl sm:text-4xl font-bold leading-tight">
        おかえりなさい、{user.name}さん！
      </h2>
      {/* Removed tier badge and other elements to match the simpler reference design */}
    </div>
  );
};

export default WelcomeSection;