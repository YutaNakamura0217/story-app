import React from 'react';
import SimpleHeader from '../components/Layout/SimpleHeader';
import SimpleFooter from '../components/Layout/SimpleFooter';
import RegistrationForm from '../components/Auth/RegistrationForm';

function RegisterPage() {
  return (
    <>
      <SimpleHeader />
      <main>
        <h1>Create Account</h1>
        <RegistrationForm />
        <div>
          <p>Already have an account? <a href="/login">Login</a></p>
        </div>
      </main>
      <SimpleFooter />
    </>
  );
}

export default RegisterPage;
