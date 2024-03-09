import './App.css';
import { UserProvider } from './application/User';
import { ListContainerView } from './application/List';
import React from 'react';

function App() {
  return (
    <UserProvider>
      <div className="App">
        <ListContainerView />
      </div>
    </UserProvider>
  );
}

export default App;
