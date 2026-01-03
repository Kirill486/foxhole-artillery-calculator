import './App.css';
import { Arty, Officer, Target } from './hoc/items';
import { MeasurementModal } from './hoc/modal';

function App() {
  return (
    <div className="App">
      <Arty />
      <Target />
      <Officer />
      <MeasurementModal />
    </div>
  );
}

export default App;
