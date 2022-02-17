import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser } from "../../actions/authActions";
import { sendConfirmationEmail } from "../../actions/authActions";
import Posts from "../../components/Posts";
import Create from "../../components/Posts/Create";
import { useEffect, useState } from "react";
import "./Home.scss";
import AppContainer from "../../components/AppContainer";
import Alert from "../../components/UI/Alert";
import Meta from "../../components/Meta/Meta";

function Home() {
  // Current user state
  const currentUser = useSelector((state) => state.currentUser);
  const { user } = currentUser;

  // Confirmation email state
  const confirmationSending = useSelector((state) => state.confirmationSending);
  const [done, setDone] = useState(false);
  const { loading: emailLoading, error: emailError } = confirmationSending;

  // Send confirmation email
  function sendConfirmationHandler() {
    dispatch(sendConfirmationEmail());
    setDone(true);
  }

  // Dispatch
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user) {
      dispatch(getCurrentUser());
    }
  }, [dispatch, user]);

  return (
    <main className='home'>
      <Meta title='Upright' />
      <AppContainer>
        <div className='home__main'>
          {user && !user.isEmailConfirmed && !done && (
            <Alert bg={`${!emailError ? "info" : "danger"}`}>
              Your account is not verified.
              {!emailError ? (
                " Please check your email"
              ) : (
                <span
                  onClick={sendConfirmationHandler}
                  style={{ fontWeight: 600, cursor: "pointer" }}
                >
                  Send me confirmation email
                </span>
              )}
              {emailError && " Something went wrong"}
              {emailLoading && " Sending..."}
            </Alert>
          )}
          <div className='home__head'>Home</div>
          <Create user={user} />
          <Posts user={user} />
        </div>
      </AppContainer>
    </main>
  );
}

export default Home;
