
import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import LoginForm from '../components/auth/LoginForm';
import SocialLoginButtons from '../components/auth/SocialLoginButtons';
import Card, { CardContent, CardHeader } from '../components/ui/Card';
import { RoutePath } from '../types';
import { LogoSymbol } from '../assets/icons'; // Example icon

const LoginPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-amber-50">
      <Header variant="simple" />
      <main className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
            <div className="text-center">
                <LogoSymbol className="mx-auto h-16 w-16 text-amber-500 mb-4" />
                <h2 className="text-3xl font-extrabold text-amber-900">ようこそ！</h2>
                <p className="mt-2 text-sm text-amber-700">
                アカウントにログインして、哲学の冒険を始めましょう。
                </p>
            </div>
          <Card className="shadow-xl border-amber-100">
            <CardContent className="p-8 sm:p-10">
              <LoginForm />
              <SocialLoginButtons />
              <p className="mt-8 text-center text-sm text-amber-700">
                アカウントをお持ちでないですか？{' '}
                <Link to={RoutePath.Register} className="font-medium text-amber-600 hover:text-amber-700">
                  会員登録はこちら
                </Link>
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer variant="simple" />
    </div>
  );
};

export default LoginPage;