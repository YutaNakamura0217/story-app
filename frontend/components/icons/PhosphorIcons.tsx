import React from 'react';

interface IconProps {
  size?: number | string;
  weight?: 'thin' | 'light' | 'regular' | 'bold' | 'fill' | 'duotone';
  className?: string;
  color?: string;
  mirrored?: boolean;
}

export const IconBell: React.FC<IconProps> = ({ size = "24px", className, color = "currentColor" }) => ( // Default size 24px
  <svg fill={color} height={size} viewBox="0 0 256 256" width={size} xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M221.8,175.94C216.25,166.38,208,139.33,208,104a80,80,0,1,0-160,0c0,35.34-8.26,62.38-13.81,71.94A16,16,0,0,0,48,200H88.81a40,40,0,0,0,78.38,0H208a16,16,0,0,0,13.8-24.06ZM128,216a24,24,0,0,1-22.62-16h45.24A24,24,0,0,1,128,216ZM48,184c7.7-13.24,16-43.92,16-80a64,64,0,1,1,128,0c0,36.05,8.28,66.73,16,80Z"></path>
  </svg>
);

export const IconList: React.FC<IconProps> = ({ size = "24px", className, color = "currentColor" }) => (
  <svg fill={color} height={size} viewBox="0 0 256 256" width={size} xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M224,128a8,8,0,0,1-8,8H40a8,8,0,0,1,0-16H216A8,8,0,0,1,224,128ZM40,88H216a8,8,0,0,0,0-16H40a8,8,0,0,0,0,16ZM216,168H40a8,8,0,0,0,0,16H216a8,8,0,0,0,0-16Z"></path>
  </svg>
);

export const IconBookOpen: React.FC<IconProps> = ({ size = "20px", className, color = "currentColor" }) => (
    <svg fill={color} height={size} viewBox="0 0 256 256" width={size} xmlns="http://www.w3.org/2000/svg" className={className}>
        <path d="M224,48H32A16,16,0,0,0,16,64V224a15.87,15.87,0,0,0,4.31,11.11A16.12,16.12,0,0,0,32,240H224a16,16,0,0,0,16-16V64A16,16,0,0,0,224,48ZM40,192l32.61-37.27a8,8,0,0,1,10.78,0L128,202.05l26.61-20a8,8,0,0,1,9.58-.22L216,216.91V224H40Zm176-19.09-50.61-35.08a8,8,0,0,0-9.58-.22L128,158.05,83.39,110.73a8,8,0,0,0-10.78,0L40,148V64H216Z"></path>
    </svg>
);

export const IconPlayCircle: React.FC<IconProps> = ({ size = "20px", className, color = "currentColor" }) => (
    <svg fill={color} height={size} viewBox="0 0 256 256" width={size} xmlns="http://www.w3.org/2000/svg" className={className}>
        <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm45.15-86.57-56-40a8,8,0,0,0-8.3,0l-56,40a8,8,0,1,0,8.3,13.14L120,114.07V176a8,8,0,0,0,16,0V114.07l41.15-29.43a8,8,0,1,0-8.3-13.14Z"></path>
    </svg>
);

export const IconStar: React.FC<IconProps & { variant?: 'fill' | 'half' | 'regular' }> = ({ size = "20px", variant = "fill", className, color = "currentColor" }) => {
  let path;
  switch (variant) {
    case 'fill':
      path = "M234.5,114.38l-45.1,39.36,13.51,58.6a16,16,0,0,1-23.84,17.34l-51.11-31-51,31a16,16,0,0,1-23.84-17.34L66.61,153.8,21.5,114.38a16,16,0,0,1,9.11-28.06l59.46-5.15,23.21-55.36a15.95,15.95,0,0,1,29.44,0h0L166,81.17l59.44,5.15a16,16,0,0,1,9.11,28.06Z";
      break;
    case 'half':
      path = "M128,44.49,149.83,89,199.3,95.85l-36.41,34.89,10.28,49L128,157.53V44.49M234.5,114.38l-45.1,39.36,13.51,58.6a16,16,0,0,1-23.84,17.34L128,200.49l-51.07,29.23a16,16,0,0,1-23.84-17.34L66.61,153.8,21.5,114.38a16,16,0,0,1,9.11-28.06l59.46-5.15,23.21-55.36a16,16,0,0,1,29.44,0L166,81.17l59.44,5.15a16,16,0,0,1,9.11,28.06Z";
      break;
    case 'regular': // Empty star
    default:
      path = "M239.2,97.29a16,16,0,0,0-13.81-11L166,81.17,142.72,25.81h0a15.95,15.95,0,0,0-29.44,0L90.07,81.17,30.61,86.32a16,16,0,0,0-9.11,28.06L66.61,153.8,53.09,212.34a16,16,0,0,0,23.84,17.34l51-31,51.11,31a16,16,0,0,0,23.84-17.34l-13.51-58.6,45.1-39.36A16,16,0,0,0,239.2,97.29Zm-15.22,5-45.1,39.36a16,16,0,0,0-5.08,15.71L187.35,216v0l-51.07-31a15.9,15.9,0,0,0-16.54,0l-51,31h0L82.2,157.4a16,16,0,0,0-5.08-15.71L32,102.35a.37.37,0,0,1,0-.09l59.44-5.14a16,16,0,0,0,13.35-9.75L128,32.08l23.2,55.29a16,16,0,0,0,13.35,9.75L224,102.26S224,102.32,224,102.33Z";
      break;
  }
  return (
    <svg fill={color} height={size} viewBox="0 0 256 256" width={size} xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d={path}></path>
    </svg>
  );
};

export const IconThumbsUp: React.FC<IconProps> = ({ size = "18px", className, color = "currentColor" }) => (
    <svg fill={color} height={size} viewBox="0 0 256 256" width={size} xmlns="http://www.w3.org/2000/svg" className={className}>
        <path d="M234,80.12A24,24,0,0,0,216,72H160V56a40,40,0,0,0-40-40,8,8,0,0,0-7.16,4.42L75.06,96H32a16,16,0,0,0-16,16v88a16,16,0,0,0,16,16H204a24,24,0,0,0,23.82-21l12-96A24,24,0,0,0,234,80.12ZM32,112H72v88H32ZM223.94,97l-12,96a8,8,0,0,1-7.94,7H88V105.89l36.71-73.43A24,24,0,0,1,144,56V80a8,8,0,0,0,8,8h64a8,8,0,0,1,7.94,9Z"></path>
    </svg>
);

export const IconThumbsDown: React.FC<IconProps> = ({ size = "18px", className, color = "currentColor" }) => (
    <svg fill={color} height={size} viewBox="0 0 256 256" width={size} xmlns="http://www.w3.org/2000/svg" className={className}>
        <path d="M239.82,157l-12-96A24,24,0,0,0,204,40H32A16,16,0,0,0,16,56v88a16,16,0,0,0,16,16H75.06l37.78,75.58A8,8,0,0,0,120,240a40,40,0,0,0,40-40V184h56a24,24,0,0,0,23.82-27ZM72,144H32V56H72Zm150,21.29a7.88,7.88,0,0,1-6,2.71H152a8,8,0,0,0-8,8v24a24,24,0,0,1-19.29,23.54L88,150.11V56H204a8,8,0,0,1,7.94,7l12,96A7.87,7.87,0,0,1,222,165.29Z"></path>
    </svg>
);

export const IconArrowRight: React.FC<IconProps> = ({ size = "24px", className, color = "currentColor" }) => ( // Updated path and default size
    <svg fill={color} height={size} viewBox="0 0 256 256" width={size} xmlns="http://www.w3.org/2000/svg" className={className}>
        <path d="M221.66,133.66l-72,72a8,8,0,0,1-11.32-11.32L196.69,136H40a8,8,0,0,1,0-16H196.69L138.34,61.66a8,8,0,0,1,11.32-11.32l72,72A8,8,0,0,1,221.66,133.66Z"></path>
    </svg>
);
