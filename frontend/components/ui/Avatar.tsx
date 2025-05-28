
import React from 'react';

interface AvatarProps {
  src?: string;
  alt: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  shape?: 'circle' | 'square';
}

const Avatar: React.FC<AvatarProps> = ({
  src,
  alt,
  size = 'md',
  className = '',
  shape = 'circle',
}) => {
  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-10 w-10', // Default for header avatar
    lg: 'h-16 w-16',
    xl: 'h-24 w-24',
  };

  const shapeClasses = {
    circle: 'rounded-full',
    square: 'rounded-md',
  };

  const placeholderColor = (name: string) => {
    // Warmer placeholder colors to match amber theme
    const colors = ['bg-amber-500', 'bg-orange-500', 'bg-yellow-500', 'bg-lime-500', 'bg-emerald-500', 'bg-teal-500'];
    let hash = 0;
    if (!name) return colors[0]; // Default if name is empty
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    return colors[Math.abs(hash) % colors.length];
  };

  const getInitials = (name: string) => {
    if (!name) return "";
    const nameParts = name.split(' ');
    if (nameParts.length > 1 && nameParts[0] && nameParts[1]) {
      return `${nameParts[0][0]}${nameParts[1][0]}`.toUpperCase();
    }
    if (nameParts[0] && nameParts[0].length >=2) {
      return name.substring(0, 2).toUpperCase();
    }
    if (nameParts[0] && nameParts[0].length === 1) {
      return nameParts[0][0].toUpperCase();
    }
    return "??";
  };
  
  // Added border styling from reference
  const borderStyle = "border-2 border-amber-200 hover:border-amber-400 transition-colors";

  return (
    <div
      className={`inline-flex items-center justify-center overflow-hidden 
                  ${sizeClasses[size]} ${shapeClasses[shape]} 
                  ${borderStyle} ${className}`}
    >
      {src ? (
        <img src={src} alt={alt} className="h-full w-full object-cover" />
      ) : (
        <div className={`h-full w-full flex items-center justify-center text-white font-semibold ${placeholderColor(alt)} ${size === 'sm' ? 'text-xs' : size === 'xl' ? 'text-2xl' : 'text-base'}`}>
          {getInitials(alt)}
        </div>
      )}
    </div>
  );
};

export default Avatar;