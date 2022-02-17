import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { logout, getCurrentUser } from "../../actions/authActions";
import Container from "../UI/Container";
import Aside from "../Aside";
import Navigation from "../Navigation";
import "./AppContainer.scss";

function AppContainer({ children }) {
  const dispatch = useDispatch();
  const history = useHistory();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const currentUser = useSelector((state) => state.currentUser);
  const { user } = currentUser;

  function logoutHandler() {
    dispatch(logout());
    window.location.reload();
  }

  useEffect(() => {
    if (!user) {
      dispatch(getCurrentUser());
    }

    if (!userInfo) {
      history.push("/account/login");
    }
  }, [dispatch, history, user, userInfo]);
  return (
    <Container className='app-container'>
      <Navigation user={user} logout={logoutHandler} />
      {children}
      <Aside user={user} />
    </Container>
  );
}

export default AppContainer;
