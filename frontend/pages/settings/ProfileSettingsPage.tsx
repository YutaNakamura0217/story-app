import React from 'react';
import ProfileForm from '../../components/settings/ProfileForm';

const ProfileSettingsPage: React.FC = () => {
  return (
    <div>
      <h1 className="text-2xl sm:text-3xl font-bold text-amber-900 mb-6 tracking-tight">
        プロフィール設定
      </h1>
      <ProfileForm />
    </div>
  );
};

export default ProfileSettingsPage;
