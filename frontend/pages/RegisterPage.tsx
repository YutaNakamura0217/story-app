
import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import RegistrationForm from '../components/auth/RegistrationForm';
import { RoutePath } from '../types';
import { UserPlusIcon } from '@heroicons/react/24/outline'; // Example icon, replace if needed

const RegisterPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-amber-50">
      <Header variant="simple" />
      <main className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-2xl space-y-8">
          <div className="text-center">
            <UserPlusIcon className="mx-auto h-16 w-16 text-amber-500 mb-4" /> 
            <h2 className="text-3xl font-extrabold text-amber-900">新しいアカウントを作成</h2>
            <p className="mt-2 text-sm text-amber-700">
              ようこそ！情報を入力して、哲学の冒険を始めましょう。
            </p>
          </div>
          
          <RegistrationForm />

          <p className="mt-8 text-center text-sm text-amber-700">
            すでにアカウントをお持ちですか？{' '}
            <Link to={RoutePath.Login} className="font-medium text-amber-600 hover:text-amber-700">
              ログインはこちら
            </Link>
          </p>
        </div>
      </main>
      <Footer variant="simple" />
    </div>
  );
};

export default RegisterPage;