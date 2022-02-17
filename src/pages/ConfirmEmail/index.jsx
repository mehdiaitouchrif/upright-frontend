import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { confirmUserEmail } from "../../actions/authActions";
import AppContainer from "../../components/AppContainer";
import Alert from "../../components/UI/Alert";
import Flex from "../../components/UI/Flex";
import Spinner from "../../components/UI/Spinner";

function ConfirmEmail({ match }) {
  const token = match.params.token;
  const dispatch = useDispatch();

  // State
  const emailConfirmation = useSelector((state) => state.emailConfirmation);
  const { success, error, loading } = emailConfirmation;

  useEffect(() => {
    if (success) {
      window.location.href = "/";
    }
    dispatch(confirmUserEmail(token));
  }, [dispatch, token, match.params.token, success]);

  return (
    <AppContainer>
      <Flex justify='center my-2'>
        {loading && <Spinner />}
        <div>{error && <Alert bg='danger'>{error}</Alert>}</div>
      </Flex>
    </AppContainer>
  );
}

export default ConfirmEmail;
