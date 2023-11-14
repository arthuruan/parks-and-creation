import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import { Header, TabsController } from '../../components';
import { MainContent } from './styles';
import { Vacancies, Dashboard } from '../';

import moment from 'moment';

import { api } from '../../resource/api';

function Main() {
  const [vacanciesData, setVacanciesData] = useState([])
  const [sectorsData, setSectorsData] = useState([])

  const [lastUpdate, setLastUpdate] = useState(moment().format('HH:mm:ss'));

  const getData = () => {
    api.get('/vacancies/')
    .then(res => setVacanciesData(res.data))
    .catch(() => console.error('deu erro'))

    api.get('/sectors/')
      .then(res => setSectorsData(res.data))
      .catch(() => console.error('outro erro'))  

    setLastUpdate(moment().format('HH:mm:ss'))
  }

  useEffect(getData, [])

  useEffect(() => {
    const intervalId = setInterval(getData, 10000);
    
    return () => clearInterval(intervalId);
  }, []);

  console.log(sectorsData)

  return (
    <main>
      <Header lastUpdate={lastUpdate}/>
      <MainContent>
        <TabsController />
        <Routes>
          <Route path='/dashboard' element={<Dashboard vacancies={vacanciesData} sectors={sectorsData}/>}/>
          <Route exact path='/dashboard/vagas' element={<Vacancies vacancies={vacanciesData} sectors={sectorsData}/>}/>
        </Routes>
      </MainContent>
    </main>
  )
}

export default Main;

