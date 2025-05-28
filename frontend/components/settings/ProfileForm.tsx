import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useAuth } from '../../hooks/useAuth';
import Avatar from '../ui/Avatar';
import Button from '../ui/Button';
import Input from '../ui/Input';
import { ArrowUpTrayIcon, UserCircleIcon } from '../../assets/icons';
import { Link } from 'react-router-dom';
import { RoutePath } from '../../types';

const ProfileForm: React.FC = () => {
  const { user, loading: authLoading } = useAuth();
  const [name, setName] = useState(user?.name || '');
  const [introduction, setIntroduction] = useState(''); // Assuming introduction is not part of User type yet
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(user?.avatarUrl || null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleAvatarChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setAvatarFile(file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    // Simulate API call
    console.log('Submitting profile update:', { name, introduction, avatarFile });
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Update mock user in useAuth or localStorage if this were real
    // For now, just show a success message
    setSubmitMessage('プロフィールが更新されました！');
    setIsSubmitting(false);
    // Potentially update useAuth user state here if login function could update it
  };

  if (authLoading || !user) {
    return <div className="text-center py-10">読み込み中...</div>;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {submitMessage && <p className="text-green-600 bg-green-100 p-3 rounded-md text-center">{submitMessage}</p>}

      <div className="flex flex-col sm:flex-row items-center gap-6 p-4 border border-amber-200 rounded-lg bg-amber-50/50">
        <div className="relative group">
          <Avatar src={avatarPreview || undefined} alt={name || 'User Avatar'} size="xl" className="!border-amber-300" />
          <label
            htmlFor="avatarUpload"
            className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 group-hover:bg-opacity-50 rounded-full cursor-pointer transition-opacity duration-300"
          >
            <ArrowUpTrayIcon className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </label>
          <input type="file" id="avatarUpload" accept="image/*" onChange={handleAvatarChange} className="sr-only" />
        </div>
        <div>
          <p className="text-sm text-amber-700">アバター画像を変更できます。(JPG, PNG, GIF - 最大2MB)</p>
        </div>
      </div>

      <Input
        id="name"
        label="お名前"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        IconComponent={UserCircleIcon}
        required
        className="bg-white"
      />
      
      <div>
        <label className="block text-sm font-medium text-amber-700 mb-1">ユーザー種別</label>
        <p className="p-3 bg-amber-100 text-amber-800 rounded-md text-sm">{user.tier || '一般ユーザー'}</p>
      </div>

       <div>
        <label className="block text-sm font-medium text-amber-700 mb-1">メールアドレス</label>
        <p className="p-3 bg-amber-100 text-amber-800 rounded-md text-sm">
          {user.email} 
          <Link to={RoutePath.Settings} className="ml-2 text-xs text-amber-600 hover:text-amber-700 underline">(変更)</Link>
        </p>
      </div>
      
      <div>
        <label htmlFor="introduction" className="block text-sm font-medium text-amber-700 mb-1">
          自己紹介 (任意)
        </label>
        <textarea
          id="introduction"
          rows={4}
          value={introduction}
          onChange={(e) => setIntroduction(e.target.value)}
          className="block w-full px-3 py-2 border border-amber-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-amber-500 focus:border-amber-500 sm:text-sm bg-white text-amber-900"
          placeholder="お子様の好きなことや、プラットフォームの利用目的などを自由にご記入ください。"
        />
      </div>

      <div className="pt-4">
        <Button type="submit" variant="primary" className="w-full sm:w-auto" isLoading={isSubmitting} size="lg">
          変更を保存する
        </Button>
      </div>
    </form>
  );
};

export default ProfileForm;
