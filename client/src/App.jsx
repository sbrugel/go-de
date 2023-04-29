import './App.css';
import UserPage from './UserPage';
import HomePage from './HomePage';
import Login from './Login';
import Register from './Register';

import { useState } from 'react';
import { Route, Routes } from 'react-router-dom'
import PeoplePage from './PeoplePage';
function App() {
  const [user, setLoginUser] = useState({});

  return (
    <div className="App">
      <div className="App">
        <Routes>
          <Route path="/" element={user && user._id ? <HomePage currentUser={ user } /> : <Login setLoginUser={ setLoginUser } />} />
          <Route path="/user/:id" element={user && user._id ? <UserPage currentUser={ user } /> : <Login setLoginUser={ setLoginUser } />} />
          <Route path="/people" element={user && user._id ? <PeoplePage currentUser={ user } /> : <Login setLoginUser={ setLoginUser } />} />

          <Route exact path="/register" element={<Register />} />
          <Route exact path="/login" element={<Login setLoginUser={ setLoginUser } />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
