import {
  BrowserRouter as Router,
  Route,
  Switch,
  withRouter,
} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Auth/Login";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import ForgotPassword from "./pages/ForgotPassword";
import AppContainer from "./components/AppContainer";
import PostPage from "./pages/PostPage";
import NotFound from "./pages/404";
import ConfirmEmail from "./pages/ConfirmEmail";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/:username' component={withRouter(Profile)} />
        <Route path='/:username/settings' component={Settings} />
        <Route path='/search' component={AppContainer} />
        <Route path='/post/:id' component={PostPage} />
        <Route path='/account/login' component={Login} />
        <Route exact path='/' component={Home} />
        <Route exact path='/forgotpassword' component={ForgotPassword} />
        <Route exact path='/confirmemail/:token' component={ConfirmEmail} />
        <Route path='*' component={NotFound} />
      </Switch>
    </Router>
  );
}

export default App;
