import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, NavLink, Link } from 'react-router-dom';
import { signUp, login } from '../../store/session';
import './signupform.css';
import pic from '../../images/QuickPics.png'


const SignUpForm = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      await dispatch(signUp(username, email, password));
    }
  };

  const onDemoLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login('demo@aa.io', 'password'));
    if (data.errors) {
      throw data.errors
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <main>
      <div className="page">
        <div className="header">
          <img src={pic}></img>
          <p>Sign up to see photos and videos from your friends.</p>
          {/* <button><a href='//facebook.com'><i className="fab fa-facebook-square" />  Log in with Facebook</a></button> */}
          <button onClick={onDemoLogin}>Demo User</button>
          <div>
            <hr />
            <p>OR</p>
            <hr />
          </div>
        </div>
        <div className="container">
          <form onSubmit={onSignUp}>
            <input
              type="text"
              name="username"
              onChange={updateUsername}
              value={username}
              placeholder={'Username'} />

            <input
              type="text"
              name="email"
              onChange={updateEmail}
              value={email}
              placeholder={'Email'} />

            <input
              type="password"
              name="password"
              onChange={updatePassword}
              value={password}
              placeholder={'Password'} />

            <input
              type="password"
              name="repeat_password"
              onChange={updateRepeatPassword}
              value={repeatPassword}
              required={true}
              placeholder={'Confirm Password'} />

            <button type="submit">Sign Up</button>
          </form>
          <ul>
            <li>By signing up, you agree to our Terms, Data Policy and Cookies Policy</li>
          </ul>
        </div>
      </div>
      <div className="option">
        <p>Have an account? <NavLink to='/login'>Log in</NavLink></p>
      </div>
      <div className="footer">
        <p>© 2021 QuickPics</p>
      </div>
    </main>
  );
}

export default SignUpForm;
