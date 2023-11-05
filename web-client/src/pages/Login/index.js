import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { TextField } from '@mui/material';
import { MainContainer, Title, UserInfoContainer, LoginButton } from './styles';

function Login() {
  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useState({
    email: '',
    password: ''
  });
  const [loginErrors, setLoginErrors] = useState({
    email: '',
    password: ''
  });

  function handleInputChange(e) {
    e.preventDefault();

    setUserInfo(prev => ({...prev, [e.target.name]: e.target.value}));
  }

  function handleLogin(e) {
    let errors = {};

    if (!userInfo.email.includes('@') || !userInfo.email.includes('.com')) 
      errors.email = 'E-mail inválido';

    if (!userInfo.password) 
      errors.password = 'Senha inválida';

    if (errors.email || errors.password) {
      setLoginErrors(errors);

      return;
    } else navigate('/dashboard');
  }

  return (
    <MainContainer>
      <UserInfoContainer>
        <Title>
          Dados 
        </Title>

        <TextField 
          label='E-mail'
          name='email'
          value={userInfo.email}
          error={Boolean(loginErrors.email)}
          helperText={loginErrors.email}
          onChange={handleInputChange}
        />

        <TextField 
          label='Senha'
          name='password'
          value={userInfo.password}
          error={Boolean(loginErrors.password)}
          helperText={loginErrors.password}
          onChange={handleInputChange}
          
        />

        <LoginButton onClick={handleLogin}>
          Login
        </LoginButton>
      </UserInfoContainer>
    </MainContainer>
  )
}

export default Login;