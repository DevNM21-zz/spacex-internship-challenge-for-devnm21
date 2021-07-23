import Header from '../src/components/Header';
import Container from 'reactstrap/lib/Container';
import Dashboard from './pages/Dashboard';
import './App.css';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

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
