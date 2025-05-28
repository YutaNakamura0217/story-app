import React from 'react';
import SimpleHeader from '../components/Layout/SimpleHeader';
import SimpleFooter from '../components/Layout/SimpleFooter';
import LoginForm from '../components/Auth/LoginForm';
import SocialLoginSection from '../components/Auth/SocialLoginSection';

function LoginPage() {
  return (
    <>
      <SimpleHeader />
      <main>
        <h1>Login</h1>
        <LoginForm />
        <SocialLoginSection />
        <div>
          <p>Don't have an account? <a href="/register">Sign Up</a></p>
        </div>
      </main>
      <SimpleFooter />
    </>
  );
}

export default LoginPage;
