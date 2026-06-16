import './App.css';
import { Arty, Impacts, Officer, Target } from './hoc/items';
import { MeasurementModal } from './hoc/modal';

function App() {
  return (
    <div className="App">
      <Arty />
      <Target />
      <Impacts />
      <Officer />
      <MeasurementModal />
    </div>
  );
}

export default App;
