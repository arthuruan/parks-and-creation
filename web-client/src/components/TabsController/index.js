import React, { useState } from 'react';
import { Tab } from '@mui/material';
import { TabsContainer } from './styles';
import { useNavigate } from 'react-router-dom';

function TabsController() {
  const navigate = useNavigate();
  const [currentTab, setCurrentTab] = useState('/dashboard');

  function handleTabChange(event, newTab) {
    setCurrentTab(newTab);
    navigate(newTab);
  }

  return (
    <TabsContainer value={currentTab} onChange={handleTabChange}>
      <Tab value={'/dashboard'} label="Dashboard" />
      <Tab value={'/dashboard/vagas'} label="Vagas" />
    </TabsContainer>
  )
};

export default TabsController;