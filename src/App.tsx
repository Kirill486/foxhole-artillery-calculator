import './App.css';
import { Arty, Impacts, Officer, Target } from './hoc/items';
import { MeasurementModal } from './hoc/modal';

function App() {
  const publicUrl = process.env.PUBLIC_URL;

  return (
    <div className="App">
      <h1 className="app-title">
        <img className="app-title-icon" src={`${publicUrl}/artillery-icon.svg`} alt="" />
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
