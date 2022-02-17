import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../actions/authActions";
import { Link } from "react-router-dom";
import Container from "../../components/UI/Container";
import TextInput from "../../components/UI/FormComponents/TextInput";
import Button from "../../components/UI/Button";
import FormGroup from "../../components/UI/FormComponents/FormGroup";
import Grid from "../../components/UI/Grid";
import Card from "../../components/UI/Card";
import Alert from "../../components/UI/Alert";
import Flex from "../../components/UI/Flex";
import Spinner from "../../components/UI/Spinner";
import "./Auth.scss";
import SignUp from "./SignUp";
import Meta from "../../components/Meta/Meta";

function Login({ history }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  // Login form submission
  function handleLogin(e) {
    e.preventDefault();

    dispatch(login({ email, username: email, password }));
  }

  const [isSignUp, setIsSignUp] = useState(false);
  function showModal() {
    setIsSignUp(!isSignUp);
  }

  useEffect(() => {
    if (userInfo) {
      history.push("/");
    }
  }, [history, userInfo]);
  return (
    <div className='auth'>
      <Meta />
      <Container size='md' className='auth__content'>
        <Grid cols={2} gap={2}>
          <div className='auth__side'>
            <h1 className='auth__logo'>Upright</h1>
            <h2 className='auth__heading'>
              Upright helps you connect and share with the people in your life.
            </h2>
          </div>
          <Card>
            <form onSubmit={handleLogin}>
              {error && <Alert bg='danger'>{error}</Alert>}
              <FormGroup>
                <TextInput
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder='Email or username'
                  name='email'
                  type='text'
                />
              </FormGroup>
              <FormGroup>
                <TextInput
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder='Password'
                  name='password'
                  type='password'
                />
              </FormGroup>

              <Button type='submit' bg='red' className='w-full rounded'>
                Login
              </Button>
            </form>
            {loading && (
              <Flex justify='center'>
                <Spinner className='mt-1' />
              </Flex>
            )}

            <Flex justify='center' direction='column'>
              <Link to='/forgotpassword' className='text-center mt-1'>
                Forgot password?{" "}
              </Link>
              <hr className='my-1' />
              <Button
                type='button'
                bg='blue'
                onClick={showModal}
                className='w-full rounded'
              >
                Sign up
              </Button>
            </Flex>
          </Card>
        </Grid>
      </Container>
      {isSignUp && (
        <SignUp title='Sign up' customSize={450} showModal={showModal} />
      )}
    </div>
  );
}

export default Login;
