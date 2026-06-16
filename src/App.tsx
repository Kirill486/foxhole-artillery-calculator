import './App.css';
import { Arty, Impacts, Officer, Target } from './hoc/items';
import { MeasurementModal } from './hoc/modal';

function App() {
  return (
    <div className="App">
      <h1 className="app-title">
        <img className="app-title-icon" src="/artillery-icon.svg" alt="" />
        <span>Foxhole artillery calculator</span>
      </h1>
      <Arty />
      <Target />
      <Impacts />
      <Officer />
      <MeasurementModal />
    </div>
  );
}

export default App;
