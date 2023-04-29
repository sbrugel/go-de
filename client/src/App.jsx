import './App.css';
import UserPage from './UserPage';
import HomePage from './HomePage';
import Login from './components/Login';
import Register from './components/Register';

import { useState } from 'react';
import { Route, Routes } from 'react-router-dom'
function App() {
  const [user, setLoginUser] = useState({});

  return (
    <div className="App">
      <div className="App">
        <Routes>
        <Route path="/" element={user && user._id ? <HomePage currentUser={ user } /> : <Login setLoginUser={ setLoginUser } />} />
          <Route path="/user/:id" element={user && user._id ? <UserPage currentUser={ user } /> : <Login setLoginUser={ setLoginUser } />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/login" element={<Login setLoginUser={ setLoginUser } />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
