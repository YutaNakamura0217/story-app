import React from 'react';

function LoginForm() {
  return (
    <form>
      <div>
        <input type="email" placeholder="Email" />
      </div>
      <div>
        <input type="password" placeholder="Password" />
      </div>
      <div>
        <input type="checkbox" id="remember" /> <label htmlFor="remember">Remember Me</label>
      </div>
      <div>
        <button type="submit">Login</button>
      </div>
      <div>
        <a href="/reset-password">Forgot Password?</a>
      </div>
    </form>
  );
}

export default LoginForm;
