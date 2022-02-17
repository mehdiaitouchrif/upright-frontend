import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser, followUser } from "../../actions/userActions";
import {
  getUserPosts,
  listLikedPosts,
  listSharedPosts,
} from "../../actions/postActions";
import Alert from "../../components/UI/Alert";
import Flex from "../../components/UI/Flex";
import Spinner from "../../components/UI/Spinner";
import "./Profile.scss";
import { format } from "date-fns";
import Button from "../../components/UI/Button";
import Post from "../../components/Posts/Post";
import AppContainer from "../../components/AppContainer";
import GoBack from "../../components/UI/GoBack";
import Setup from "../../components/ProfileSetup";
import Meta from "../../components/Meta/Meta";

function Profile({ match }) {
  // User details state
  const userProfile = useSelector((state) => state.userProfile);
  const { loading, user, error } = userProfile;
  // User info state
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  // User posts state
  const userPosts = useSelector((state) => state.userPosts);
  const { posts } = userPosts;

  // Shared posts state
  const sharedPosts = useSelector((state) => state.sharedPosts);
  const { posts: shared } = sharedPosts;

  // Liked posts state
  const likedPosts = useSelector((state) => state.likedPosts);
  const { posts: liked } = likedPosts;

  // Active tab
  const [activePosts, setActivePosts] = useState(posts);

  // Dispatch
  const dispatch = useDispatch();

  const [follow, setFollow] = useState("Follow");
  // Follow user
  function followUserHandler(userId) {
    dispatch(followUser(userId));
    setFollow((prev) => (prev === "Follow" ? "Unfollow" : "Follow"));
  }

  const [isSetup, setIsSetup] = useState(false);
  function showModal() {
    setIsSetup(!isSetup);
  }

  // Switch tabs
  function switchTabs(str) {
    if (str === "shares") {
      setActivePosts(shared);
    } else if (str === "likes") {
      setActivePosts(liked);
    } else {
      setActivePosts(posts);
    }
  }

  const userUpdate = useSelector((state) => state.userUpdate);
  const { success: successUpdate } = userUpdate;

  useEffect(() => {
    if (!user || user.username !== match.params.username) {
      dispatch(getUser(match.params.username));
    } else {
      dispatch(getUserPosts(user._id));
      dispatch(listSharedPosts(user._id));
      dispatch(listLikedPosts(user._id));
    }
  }, [user, dispatch, match.params.username, successUpdate]);

  return (
    <div className='profile'>
      <AppContainer>
        {isSetup && (
          <Setup customSize={450} showModal={showModal} user={user} />
        )}
        {loading && (
          <Flex justify='center' className='my-2'>
            <Spinner />
          </Flex>
        )}
        {error && <Alert bg='danger'>{error}</Alert>}
        {user && (
          <div className='profile__content'>
            <Meta title={`${user.firstName} ${user.lastName} | Upright`} />
            <GoBack text={`${user.firstName} ${user.lastName}`} />
            <div className='profile__head'>
              <div className='profile__head--cover'>
                {user.coverPhoto && (
                  <img
                    src={user.coverPhoto}
                    alt={`${user.username}'s profile cover`}
                  />
                )}
              </div>
            </div>
            <div className='profile__body'>
              <Flex justify='space-between'>
                <div className='profile__showcase'>
                  <div>
                    <img
                      className='profile__showcase--head'
                      src={user.profilePhoto}
                      alt={`${user.username}'s profile pic`}
                    />
                  </div>

                  <p className='profile__body--name'>
                    {user.firstName} {user.lastName}
                  </p>
                  <p className='profile__body--username'>@{user.username} </p>
                  {user.bio && <p>{user.bio} </p>}
                  {user.website && (
                    <a
                      style={{ fontWeight: 500, color: "#1DA1F2" }}
                      href={user.website}
                      rel='noreferrer'
                      target='_blank'
                    >
                      {user.website}
                    </a>
                  )}
                </div>

                <div className='profile__action mt-1'>
                  {userInfo && userInfo.data.username === user.username ? (
                    <Button
                      onClick={showModal}
                      type='button'
                      className='rounded'
                      bg='red'
                    >
                      Set up profile
                    </Button>
                  ) : (
                    <Button
                      onClick={() => followUserHandler(user._id)}
                      type='button'
                      bg='red'
                      className='rounded'
                    >
                      {follow}
                    </Button>
                  )}
                </div>
              </Flex>
              <Flex align='center' className='mt-1 profile__body--joined'>
                <i className='fas fa-calendar-alt'></i>
                <p>Joined {format(new Date(user.createdAt), "MMMM yyyy")}</p>
              </Flex>
              <Flex className='mt-1'>
                <p>
                  <strong>{user.following.length}</strong> Following
                </p>
                <p className='ml-1'>
                  <strong>{user.followers.length}</strong> Followers
                </p>
              </Flex>
              <Flex className='profile__activities mt-1'>
                <div
                  onClick={() => switchTabs("posts")}
                  className={`profile__activity ${
                    activePosts === posts && "active"
                  }`}
                >
                  Posts
                </div>
                <div
                  onClick={() => switchTabs("shares")}
                  className={`profile__activity ${
                    activePosts === shared && "active"
                  }`}
                >
                  Shares
                </div>
                <div
                  className={`profile__activity ${
                    activePosts === liked && "active"
                  }`}
                  onClick={() => switchTabs("likes")}
                >
                  Likes
                </div>
              </Flex>
            </div>
            {activePosts &&
              activePosts.map((post) => (
                <Post key={post._id} user={user} post={post} />
              ))}
          </div>
        )}
      </AppContainer>
    </div>
  );
}

export default Profile;
