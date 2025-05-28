
import React from 'react';
import { PhilosophyTheme } from '../../types';
import Card, { CardContent } from '../ui/Card'; // Card is used here for individual theme items
import Button from '../ui/Button';
import { Link } from 'react-router-dom';
import { RoutePath } from '../../types';
import { BookIcon, SparklesIcon } from '../../assets/icons'; // SparklesIcon for placeholder

interface ThemeCardProps {
  theme: PhilosophyTheme;
}

const ThemeCard: React.FC<ThemeCardProps> = ({ theme }) => {
  let displayIcon: React.ReactNode;
  // Using a placeholder image if iconElement is not suitable for background
  const imageUrl = theme.id === 'theme1' ? "https://lh3.googleusercontent.com/aida-public/AB6AXuD-7IMwR11KHf4UoE0k3IXXZTErBPhBriHOJvGk0M1W0b0JjHG09onqmGp15bE5gP3c5uRPhplTdLjTJfqyvGiXhvOcvVhQicGvT2absTYyQQ099WeWt-zOZs5TJnOwXI5I4CYPj48Eh18O7rfG0R27LhVdxQ0bXZc1du5xzyyyU0dFGGK0_xIPyP4azUJ_y3P9HruiFbgGVK6hw8aa-dEvEAW1FRsT8hsGxDp1_2WaWuZ_4y0eYMgN6Pmkdw6VosQn5GpM0norKypT" :
                   theme.id === 'theme2' ? "https://lh3.googleusercontent.com/aida-public/AB6AXuDszlIWPoTMomfWrTr3jlpwkaYrvYNeSoBO17sP-QsKefZVGsegpRb1YuqB68WpHumAx_KPu_iO_bivndQ1FZBcfIfsqKqCCCSnbNZndNKasIHcEPeps9bElRcRihzEHswqcW-02XlBs1nI0UOGlcutg5xuLwaaGm0ByP8RsNf4Y0PUNg-VTIz8_QHgKM8TKzts6bopSiJTQboicfI5Y-Kp-9Zxehen61tV0AqouHwvU-lw_hcqMoLaA9O9HNc7xvLYYIgtnvdi1nf0" :
                   "https://lh3.googleusercontent.com/aida-public/AB6AXuAYc8QSpNzdwMzwu3GDAcIUuQMmLkqDas7BhzPyDWNxf3b9l72V3AChMeh2To348hodAN4MHJz-gij-VeXOBFiatUsoD8iKlyV2XROqOjtFyc_fLVSoCr1NfKZFbYqLtomHpBGqtqIA_EyMRNz3xnvt7P8Uu3OQgSkLP0UIIrZ0oDBnoxAohvu3KjC_SA6wfCPOBzXk5feVFlah4Ou0UJOAoHexMtU6l6QgkjCIpRiXoX8n2gM53rOpIkBpYzxiyUA_lrJeEvLD28l8";


  return (
    // Using Card component for consistent styling, reference article is effectively a card
    <Card className="flex h-full flex-1 flex-col gap-0 rounded-xl min-w-64 bg-white shadow-lg hover:shadow-xl transition-shadow overflow-hidden border-amber-100 p-0">
      <div 
        className="w-full h-48 bg-center bg-no-repeat bg-cover" 
        style={{ backgroundImage: `url("${imageUrl}")` }}
        aria-label={theme.name}
      >
        {/* If an overlay or icon on top of image is needed, add here */}
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <h4 className="text-amber-900 text-lg font-semibold leading-normal">{theme.name}</h4>
        <p className="text-amber-700 text-sm font-normal leading-normal mt-1 flex-grow line-clamp-2">
          {theme.description || `${theme.ageRange}対象・${theme.bookCount}冊の絵本`}
        </p>
        <Button 
          as={Link}
          to={`${RoutePath.Themes}/${theme.id}/books`}
          variant="primary" // bg-amber-500
          size="sm" 
          className="mt-4 self-start rounded-full px-4 py-2 !text-sm !font-bold text-white hover:bg-amber-600 transition-colors"
        >
          もっと詳しく
        </Button>
      </div>
    </Card>
  );
};

export default ThemeCard;