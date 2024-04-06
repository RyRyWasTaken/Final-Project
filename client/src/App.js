import React, { useState } from 'react';
import Login from './components/Login';
import Signup from './components/Signup';

const App = () => {
  const [showSignup, setShowSignup] = useState(false);

  const handleShowSignup = () => {
    setShowSignup(true);
  };

  return (
    <div>
      <h1>Login</h1>
      <Login />
      {showSignup && (
        <div>
          <h2>Sign Up</h2>
          <Signup />
        </div>
      )}
      {!showSignup && (
        <p>
          Don't have an account?{' '}
          <button onClick={handleShowSignup}>Sign Up</button>
        </p>
      )}
    </div>
  );
};

export default App;
