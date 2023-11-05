import logo from './logo.svg';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import './App.css';

import { Login } from './pages';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Login />}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
