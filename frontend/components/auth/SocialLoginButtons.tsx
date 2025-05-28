
import React from 'react';
import Button from '../ui/Button';
import { GoogleIcon, TwitterIcon } from '../../assets/icons';

const SocialLoginButtons: React.FC = () => {
  const handleGoogleLogin = () => {
    console.log('Attempting Google login...');
  };

  const handleTwitterLogin = () => {
    console.log('Attempting Twitter login...');
  };

  return (
    <div className="space-y-4">
       <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-amber-200" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-amber-700">またはSNSアカウントでログイン</span>
        </div>
      </div>
      <Button 
        variant="outline" 
        className="w-full !border-amber-300 !text-amber-700 hover:!bg-amber-50 hover:!border-amber-500" 
        onClick={handleGoogleLogin}
        leftIcon={<GoogleIcon className="w-5 h-5" />}
      >
        Googleでログイン
      </Button>
      <Button 
        variant="outline" 
        className="w-full !border-blue-400 !text-blue-500 hover:!bg-blue-50 hover:!border-blue-500" // Twitter retains its brand color for now
        onClick={handleTwitterLogin}
        leftIcon={<TwitterIcon className="w-5 h-5 text-blue-500" />}
      >
        Twitterでログイン
      </Button>
    </div>
  );
};

export default SocialLoginButtons;