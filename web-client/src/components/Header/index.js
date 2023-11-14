import React from 'react';
import { Logout } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

import { HeaderContainer, LogoutButton, Title } from './styles';

function Header(props) {
  const { lastUpdate } = props;

  const navigate = useNavigate();
  function handleLogout() {
    navigate('/');
  }

  return (
    <HeaderContainer>
      <Title>Parks and Creation</Title>
      <p>Última atualização {lastUpdate}</p>
      <LogoutButton onClick={handleLogout}>
        <Logout />
      </LogoutButton>
    </HeaderContainer>
  )
};

export default Header;