import logo from './logo.svg';
import './App.css';
import { Menu } from './components/Menu/Menu';
import { Landing } from './components/Landing/Landing';
import { GiveFeedback } from './components/GiveFeedback/GiveFeedback';
import { Layout } from './components/Layout/Layout';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Layout>
          <Landing />
        </Layout>
      </header>
    </div>
  );
}

export default App;
