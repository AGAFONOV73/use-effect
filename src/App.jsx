import React, { useState } from 'react';
import List from './components/List';
import Details from './components/Details'; 

import './App.css'

function App() {
  const [selectedUser, setSelectedUser] = useState(null);
  
  const handleUserSelect = (user) => {
    setSelectedUser(user);
  };



  return (
  <div className="app">
    <div className="container">
    <div className="sidebar">    
      <List onUserSelect={handleUserSelect} selectedUserId={selectedUser?.id}/>
    </div>
    <div className="content">
      <Details info={selectedUser} />
    
    </div>
    </div>
  </div>
  )
}

export default App
