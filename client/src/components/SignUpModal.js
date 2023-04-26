import React, { useState } from 'react';
import { signUpUser } from '../api/getData';
import './signUpModalStyles.css';
import { useNavigate } from 'react-router-dom';

const SignUpModal = ({ isOpen, onClose }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validate email
    if (!email) {
        setEmailError('Email is required');
        return;
      }
        // Validate password
      if (!password) {
        setPasswordError('Password is required');
        return;
      }
    console.log(`UserName: ${username}\nEmail: ${email}\nPassword: ${password}`);
    let res = await signUpUser(username, email, password);
    console.log(res); 
    if (res.sts==='success'){
      console.log('SignUp successful!');
      setErrorMsg('');
      setUsername('');
      setEmail('');
      setPassword('');
      onClose();
      navigate('/login');
    }
    else {
      console.log('Error in signup, try again!');
      setErrorMsg(res.data);
    }
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setEmailError(null);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setPasswordError(null);
  };

  const handleOnClose = (event) => {
    setErrorMsg('');
    setEmailError(null);
    setPasswordError(null);
    setUsername('');
    setEmail('');
    setPassword('');
    onClose();
    navigate('/login');
};

  return (
    <>
      {isOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleOnClose}>&times;</span>
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit}>
                <div>
              <label htmlFor="name">Username:</label>
              <input type="text" id="name" name="name" value={username} onChange={(e) => setUsername(e.target.value)} />
              {emailError && <span className="error">{emailError}</span>}
              </div>
              <div>
              <label htmlFor="email">Email:</label>
              <input type="email" id="email" name="email" value={email} onChange={handleEmailChange} />
              {passwordError && <span className="error">{passwordError}</span>}
              </div>
              <label htmlFor="password">Password:</label>
              <input type="password" id="password" name="password" value={password} onChange={handlePasswordChange} />
              <button type="submit">Sign Up</button>
            </form>
            <div className='error'>{errorMsg}</div>
          </div>
        </div>
      )}
    </>
  );
};

export default SignUpModal;
