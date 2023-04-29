import './App.css';
import UserPage from './UserPage';
import HomePage from './HomePage';
import Login from './Login';
import Register from './Register';
import PeoplePage from './PeoplePage';
import LocationsPage from './LocationsPage'
import LocationForm from './LocationForm'

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
          <Route path="/people" element={user && user._id ? <PeoplePage currentUser={ user } /> : <Login setLoginUser={ setLoginUser } />} />
          <Route path="/locations" element={user && user._id ? <LocationsPage currentUser={ user } /> : <Login setLoginUser={ setLoginUser } />} />
          <Route path="/submit/:id" element={user && user._id ? <LocationForm currentUser={ user } /> : <Login setLoginUser={ setLoginUser } />} />

          <Route exact path="/register" element={<Register />} />
          <Route exact path="/login" element={<Login setLoginUser={ setLoginUser } />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
