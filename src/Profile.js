// src/Profile.js
import React, { useEffect, useState } from 'react';

function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Fetch user details using the saved ID from local storage
    const storedUser = JSON.parse(localStorage.getItem('user'));

    if (storedUser) {
      fetch(`https://dummyjson.com/users/${storedUser.id}`)
        .then(res => res.json())
        .then(data => {
          // Save user details in local storage
          localStorage.setItem('user', JSON.stringify(data));
          setUser(data);
        })
        .catch(error => console.error(error));
    }
  }, []);

  return (
    <div>
      <h1>Profile</h1>
      {user && (
        <div>
          <p>ID: {user.id}</p>
          <p>Username: {user.username}</p>
          <p>Email: {user.email}</p>
          {/* Add more details as needed */}
        </div>
      )}
    </div>
  );
}

export default Profile;
