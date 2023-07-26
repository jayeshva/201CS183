import './App.css';
import TrainDashboard from './components/TrainDashboard'; 
import TrainDetails from '../src/components/Traindetails';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';


function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={TrainDashboard} />
        <Route path="/:trainNumber" component={TrainDetails} />
      </Switch>
    </Router>
  );
}

export default App;
