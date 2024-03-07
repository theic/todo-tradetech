import './App.css';
import { UserProvider } from './application/User/UserProvider';
import ListContainerView from './application/List/ListContainerView';

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
