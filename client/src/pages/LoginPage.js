import React, { useState } from 'react';
import SignUpModal from '../components/SignUpModal';
import './loginStyles.css';
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
  const [showSignUpModal, setShowSignUpModal] = useState(false);

  const navigate = useNavigate();
  
  const handleSignUpClick = () => {
    setShowSignUpModal(true);
  };

  const handleSignUpClose = () => {
    setShowSignUpModal(false);
  };

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
      <div className="login-container">
        <div className="image-container">
          <img src='./images/logoipsum-226.svg' alt="image" className="image" />
        </div>
        <div className="form-container">
          <h2>Login</h2>
          <form  onSubmit={handleSubmit}>
            <label htmlFor="email">Email:</label>
            <input type="email" value={email} onChange={handleEmailChange} />
            <label htmlFor="password">Password:</label>
            <input type="password" value={password} onChange={handlePasswordChange} />
          <br />
            <button type="submit">Login</button>
          </form>
          <div className='error'>{errorMsg}</div>
          <p>Don't have an account? <a href="#" onClick={handleSignUpClick}>Sign up</a></p>
          <SignUpModal isOpen={showSignUpModal} onClose={handleSignUpClose} />
        </div>
      </div>
      </div>
    );
/*    <div className="container">
      <div className="logo-container">
        <img src='/images/cat1.png' alt="Logo" />
        <h1>Login Page</h1>
      </div>
      <div className='inside-container'>
      <form onSubmit={handleSubmit}>
        <div>
          <img className='login-img' src='/images/cat1.png' alt="Logo" />
        </div>
        <div>
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
          <div className='button-row'>
            <button type="submit">Log In</button>
            <button type="submit">Sign Up</button>
          </div>
        </div>
      </form>
      </div>
    </div>
  );
  */
}

export default LoginPage;
