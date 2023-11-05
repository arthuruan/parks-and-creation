import React from 'react';
import { Routes, Route } from 'react-router-dom';

import { Header, TabsController } from '../../components';
import { MainContent } from './styles';
import { Vacancies, Dashboard } from '../';

function Main() {
  return (
    <main>
      <Header />
      <MainContent>
        <TabsController />
        <Routes>
          <Route path='/dashboard' element={<Dashboard />}/>
          <Route exact path='/dashboard/vagas' element={<Vacancies />}/>
        </Routes>
      </MainContent>
    </main>
  )
}

export default Main;

