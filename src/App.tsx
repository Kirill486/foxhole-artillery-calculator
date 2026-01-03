import './App.css';
import { Arty, Officer, Target } from './hoc/items';

function App() {
  return (
    <div className="App">
      <Arty />
      <Target />
      <Officer />
    </div>
  );
}

export default App;
