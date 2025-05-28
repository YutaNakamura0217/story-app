import React from 'react';
import { Link } from 'react-router-dom'; // Import Link
import SimpleHeader from '../components/Layout/SimpleHeader';
import SimpleFooter from '../components/Layout/SimpleFooter';
import LoginForm from '../components/Auth/LoginForm';
import SocialLoginSection from '../components/Auth/SocialLoginSection';

function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <SimpleHeader />
      <main className="flex-grow container mx-auto flex flex-col justify-center items-center p-4">
        <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-xl my-8">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Login to Your Account</h1>
          <LoginForm />
          <SocialLoginSection />
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <Link to="/register" className="font-medium text-indigo-600 hover:text-indigo-500 hover:underline">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </main>
      <SimpleFooter />
    </div>
  );
}

export default LoginPage;
