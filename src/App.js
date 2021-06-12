import Header from '../src/components/Header';
import Container from 'reactstrap/lib/Container';
import Dashboard from './pages/Dashboard/index';
import './App.css';

function App() {
  return (
    <div>
      <Header />
      <Container className={'main'}>
        <Dashboard />
      </Container>
    </div>
  );
}

export default App;
