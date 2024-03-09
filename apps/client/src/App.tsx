import './App.css';
import { UserProvider, ErrorBoundary } from './application/User';
import { ListContainerView } from './application/List';
import React from 'react';

function App() {
  return (
    <UserProvider>
      <ErrorBoundary>
        <div className="App">
          <ListContainerView />
        </div>
      </ErrorBoundary>
    </UserProvider>
  );
}

export default App;
