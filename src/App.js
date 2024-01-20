// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, useHistory } from 'react-router-dom';
import './App.css';
import './Profile'
const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const history = useHistory();

  const login = () => {
    fetch('https://dummyjson.com/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: username,
        password: password,
      })
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error('Invalid username or password');
      }
    })
    .then(data => {
      localStorage.setItem('user', JSON.stringify(data));
      history.push('/profile');
    })
    .catch(error => {
      setErrorMessage(error.message);
    });
  };

  return (
    <div>
    <div className="login-container">
      <p>Welcome back!</p>
      <h3>Sign in to your account</h3>
      <label htmlFor="username">Your Email</label>
      <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} required />

      <label htmlFor="password">Password</label>
      <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />

      <button type="button" onClick={login}>Continue</button>
      <p className='pfor'>Forget your password</p>
      <p className="error-message">{errorMessage}</p>
    </div>
    <p className='dont-ac'>Don't have an account? <span>Sign up</span></p>
    </div>
  );
};

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));

    if (storedUser) {
      fetch(`https://dummyjson.com/users/${storedUser.id}`)
        .then(res => res.json())
        .then(data => {
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
};

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/profile" exact component={Profile} />
      </Switch>
    </Router>
  );
};

export default App;
