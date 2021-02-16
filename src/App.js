import "./App.css";
import HomePage from './pages/HomePage';
import {
  BrowserRouter,
  Switch,
  Route,
} from "react-router-dom";
import Game from "./pages/Game";
import Victory from "./pages/Victory";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/game">
          <Game />
        </Route>
        <Route path="/victory">
          <Victory />
        </Route>
        <Route path="/">
          <HomePage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
