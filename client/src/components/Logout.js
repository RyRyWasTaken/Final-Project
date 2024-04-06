import React from 'react';

const Logout = ({ onLogout }) => {
  const handleLogout = async () => {
    try {
      const response = await fetch('/logout');
      if (response.ok) {
        onLogout();
      } else {
        const data = await response.json();
        alert(data.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Logout;
