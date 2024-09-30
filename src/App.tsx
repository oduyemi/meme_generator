import './App.css';
import { Container } from '@mui/material';
import { Generator } from "./components/Generator";



export const App: React.FC = () => {
  return (
    <Container>
      <Generator />
    </Container>
  );
}

