import React, { useState } from 'react';
import './loginPageStyles.css';
import {authenticateUser} from '../api/getData'
import Cookies from 'js-cookie';
import {useNavigate} from 'react-router-dom';

function setAccessTokenCookie(token) {
  // Set the access token as a cookie that expires in 1 hour
  Cookies.set('access_token', token, { expires: 1/24, path: '/' });
}

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(`Email: ${email}, Password: ${password}`);
    let res = await authenticateUser(email, password);
    console.log(res); 
    if (res.data.access_token){
      setAccessTokenCookie(res.data.access_token);
      console.log('Login successful!');
      setErrorMsg('');
      navigate('/manageCategory');

    }
    else {
      console.log('Error in login, try again!');
      setErrorMsg('*Error in login, try again!');
    }

  }

  return (
    <div className="container">
      <div className="logo-container">
        <img src='/images/cat1.png' alt="Logo" />
        <h1>Login Page</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input type="email" value={email} onChange={handleEmailChange} />
        </label>
        <br />
        <label>
          Password:
          <input type="password" value={password} onChange={handlePasswordChange} />
        </label>
        <error>{errorMsg}</error>
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default LoginPage;
