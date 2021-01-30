import './App.css';
import NavBar from './components/Navbar';
import Main from './components/Main';
import SecondPage from './components/SecondPage';
import Third from './components/Third';
import Routers from './routes';

function App() {
  return (
    <div className="App">
      <Routers/>
    </div>
  );
}

export default App;
