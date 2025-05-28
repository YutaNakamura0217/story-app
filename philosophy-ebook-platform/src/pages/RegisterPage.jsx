import React from 'react';
import { Link } from 'react-router-dom'; // Import Link
import SimpleHeader from '../components/Layout/SimpleHeader';
import SimpleFooter from '../components/Layout/SimpleFooter';
import RegistrationForm from '../components/Auth/RegistrationForm';

function RegisterPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <SimpleHeader />
      <main className="flex-grow container mx-auto flex flex-col justify-center items-center p-4">
        <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-xl my-8">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Create Your Account</h1>
          <RegistrationForm />
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500 hover:underline">
                Login
              </Link>
            </p>
          </div>
        </div>
      </main>
      <SimpleFooter />
    </div>
  );
}

export default RegisterPage;
