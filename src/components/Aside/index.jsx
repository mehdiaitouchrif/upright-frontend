import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { getSuggestions, followUser } from "../../actions/userActions";
import SearchBox from "../SearchBox";
import Flex from "../UI/Flex";
import Spinner from "../UI/Spinner";
import "./Aside.scss";

function Aside() {
  const dispatch = useDispatch();

  const userSuggestions = useSelector((state) => state.userSuggestions);
  const { loading, suggestions } = userSuggestions;

  const userFollow = useSelector((state) => state.userFollow);
  const { success: followSuccess } = userFollow;

  function handleUserFollow(userId) {
    dispatch(followUser(userId));
  }

  const { pathname } = useLocation();

  useEffect(() => {
    dispatch(getSuggestions());
  }, [dispatch, followSuccess]);

  return (
    <div className={`aside ${pathname === "/search" && "aside__responsive"}`}>
      <SearchBox />

      <p className='lead'>Suggestions for you</p>
      {suggestions &&
        suggestions.map((sugg) => (
          <Flex key={sugg._id} className='aside__suggestion'>
            <Link to={`/${sugg.username}`}>
              <Flex align='center'>
                <img src={sugg.profilePhoto} alt='Suggested Profile' />
                <div>
                  <p className='bold'>{sugg.username}</p>
                  <p>Suggested for you</p>
                </div>
              </Flex>
            </Link>
            <button onClick={() => handleUserFollow(sugg._id)}>Follow</button>
          </Flex>
        ))}

      {loading && (
        <Flex justify='center'>
          <Spinner />
        </Flex>
      )}
    </div>
  );
}

export default Aside;
