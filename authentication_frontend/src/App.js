import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import Login from "./components/Login";
import Register from "./components/Register";
import Routeguard from "./Routeguard";
import Index from "./components/Index"
function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/login" exact component={Login} />
          <Route path="/register" exact component={Register} />
          <Routeguard dPath="/index" dComponent={Index} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
