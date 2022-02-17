import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { listUsers } from "../../actions/userActions";
import Flex from "../UI/Flex";
import Spinner from "../UI/Spinner";
import "./SearchBox.scss";

function SearchBox() {
  const [search, setSearch] = useState("");

  const dispatch = useDispatch();
  const userList = useSelector((state) => state.userList);
  const { users, loading } = userList;

  function searchHandler(e) {
    setSearch(e.target.value);
    dispatch(listUsers(search));
  }

  return (
    <form className='searchBox'>
      <i className='fas fa-search searchBox__icon'></i>
      <input
        className='searchBox__input'
        value={search}
        name='search'
        placeholder='Search Upright'
        onChange={searchHandler}
      />

      <div className='searchBox__results'>
        {loading && (
          <Flex justify='center' className='py-1'>
            <Spinner />
          </Flex>
        )}
        {users &&
          users.splice(0, 7).map((user) => (
            <Link to={`/${user.username}`} className='searchBox__result'>
              <Flex align='center'>
                <img src={user.profilePhoto} alt={user.username} />
                <div>
                  <p>
                    {user.firstName} {user.lastName}
                  </p>
                  <p>{user.username}</p>
                </div>
              </Flex>
            </Link>
          ))}
      </div>
    </form>
  );
}

export default SearchBox;
