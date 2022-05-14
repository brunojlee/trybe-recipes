import React from 'react';
import LoginCard from '../components/LoginCard';
import styles from '../styles/Login.module.css';

function Login() {
  return (
    <div
      className={ `${styles['background-pattern']} 
      h-screen flex flex-col justify-center items-center w-screen` }
    >
      <div
        className="flex bg-white rounded-xl
        items-center justify-content-center"
      >
        <LoginCard />
      </div>
    </div>
  );
}

export default Login;
