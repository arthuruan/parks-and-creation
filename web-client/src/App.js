import { Route, BrowserRouter, Routes } from 'react-router-dom';
import './App.css';

import { Login, Main } from './pages';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Login />}/>
      <Route path='/*' element={<Main />}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
