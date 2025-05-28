import React from 'react';
import { Link } from 'react-router-dom';
import { PhilosophyTheme, RoutePath } from '../../types';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Badge from '../ui/Badge';
import { BookIcon, QuestionMarkCircleIcon } from '../../assets/icons'; // UsersIcon for age range

interface ThemeCardProps {
  theme: PhilosophyTheme;
}

const ThemesPageThemeCard: React.FC<ThemeCardProps> = ({ theme }) => {
  const coverImage = theme.coverImageUrl || `https://picsum.photos/seed/${theme.id}/600/400`;

  return (
    <Card className="flex flex-col h-full overflow-hidden transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl">
      <Link to={`${RoutePath.Themes}/${theme.id}${RoutePath.ThemeBooks.substring(RoutePath.ThemeBooks.lastIndexOf('/'))}`} className="block group">
        <div 
          className="w-full h-48 bg-center bg-no-repeat bg-cover relative"
          style={{ backgroundImage: `url("${coverImage}")` }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent group-hover:from-black/60 transition-all duration-300"></div>
          {theme.iconElement && React.cloneElement(theme.iconElement, { className: "absolute top-3 left-3 w-10 h-10 text-white opacity-80 group-hover:opacity-100"})}
        </div>
      </Link>

      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-amber-900 mb-2 leading-tight group-hover:text-amber-600 transition-colors">
          <Link to={`${RoutePath.Themes}/${theme.id}${RoutePath.ThemeBooks.substring(RoutePath.ThemeBooks.lastIndexOf('/'))}`}>
            {theme.name}
          </Link>
        </h3>

        {theme.question && (
          <p className="text-amber-700 text-sm mb-3 leading-relaxed flex items-start">
            <QuestionMarkCircleIcon className="w-5 h-5 mr-2 mt-0.5 text-amber-500 shrink-0" />
            <span>{theme.question}</span>
          </p>
        )}
        
        <div className="flex flex-wrap gap-2 my-3">
           <Badge colorScheme="info" variant="subtle" size="sm" icon={<BookIcon className="w-3 h-3"/>}>
            {theme.bookCount}冊の絵本
          </Badge>
          <Badge colorScheme="gray" variant="subtle" size="sm">
            {theme.ageRange}
          </Badge>
        </div>

        <p className="text-sm text-amber-600 leading-relaxed line-clamp-3 flex-grow mb-4">
          {theme.description}
        </p>

        <div className="mt-auto pt-4 border-t border-amber-100">
          <Button 
            as={Link} 
            to={`${RoutePath.Themes}/${theme.id}${RoutePath.ThemeBooks.substring(RoutePath.ThemeBooks.lastIndexOf('/'))}`}
            variant="primary" 
            className="w-full rounded-full"
          >
            このテーマの絵本を見る
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default ThemesPageThemeCard;