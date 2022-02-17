import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { getSinglePost } from "../../actions/postActions";
import {
  listComments,
  addComment,
  deleteComment,
  editComment,
  listSingleComment,
} from "../../actions/commentActions";
import AppContainer from "../../components/AppContainer";
import GoBack from "../../components/UI/GoBack";
import Card from "../../components/UI/Card";
import Flex from "../../components/UI/Flex";
import Spinner from "../../components/UI/Spinner";
import Alert from "../../components/UI/Alert";
import "./PostPage.scss";
import Modal from "../../components/UI/Modal";
import Button from "../../components/UI/Button";
import Meta from "../../components/Meta/Meta";

function PostPage({ match }) {
  const [comment, setComment] = useState("");

  const dispatch = useDispatch();
  const postCrud = useSelector((state) => state.postCrud);
  const { post, loading } = postCrud;

  // const singlePost = useSelector((state) => state.singlePost)
  // const { post, loading } = singlePost

  // Get current user
  const currentUser = useSelector((state) => state.currentUser);
  const { user } = currentUser;

  // State
  const commentCrud = useSelector((state) => state.commentCrud);
  const {
    loading: commentsLoading,
    error: commentsError,
    comments,
    comment: singleComment,
  } = commentCrud;

  function formatDate(dirtyDate) {
    if (dirtyDate) {
      return format(new Date(dirtyDate), "k:mm MMMM d, u");
    }
    return;
  }

  function addCommentHandler(e) {
    e.preventDefault();

    dispatch(addComment(match.params.id, comment));
    setComment("");
  }

  function deleteCommentHandler(id) {
    dispatch(deleteComment(id));
  }

  const [editMode, setEditMode] = useState(false);
  const [newText, setNewText] = useState("");

  function showModal() {
    setEditMode(!editMode);
  }
  function preEditHandler(id) {
    dispatch(listSingleComment(id));
    setEditMode(true);
    if (singleComment) {
      setNewText(singleComment.text);
    }
  }
  function editCommentHandler(e) {
    e.preventDefault();
    dispatch(editComment(singleComment._id, newText));
    showModal();
  }

  useEffect(() => {
    dispatch(getSinglePost(match.params.id));
    dispatch(listComments(match.params.id));
  }, [dispatch, match.params.id]);

  return (
    <div className='postPage'>
      <Meta title='Upright' />
      <AppContainer>
        <div className='postPage__content'>
          <GoBack text='Post' />
          {loading && (
            <Flex className='my-2' justify='center'>
              <Spinner />
            </Flex>
          )}
          {post && post.user && (
            <Card className='post mb-1'>
              <div className='post__user'>
                <Flex>
                  <Link to={`/@${post.user.username}`}>
                    <img
                      src={post.user.profilePhoto}
                      alt={`${post.user.username} avatar`}
                    />
                  </Link>
                  <div className='ml-1'>
                    <Link to={`/@${post.user.username}`}>
                      <p>
                        {post.user.firstName} {post.user.lastName}
                      </p>
                    </Link>

                    <p>@{post.user.username}</p>
                  </div>
                </Flex>
              </div>

              <div className='post__details'>
                <h3 className='tertiary-heading'>{post.text}</h3>
                {post.image && (
                  <img
                    className='post__image'
                    src={post.image}
                    alt={post.image}
                  />
                )}

                <p className='mt-1'>{formatDate(post.createdAt)}</p>
                <Flex className='postPage__stats'>
                  <p className='mr-1'>{post.likes.length} Likes </p>
                  <p>{post.shares.length} Shares </p>
                </Flex>
              </div>
            </Card>
          )}
          <form className='postPage__form' onSubmit={addCommentHandler}>
            {commentsError && (
              <Alert className='mb-1' bg='danger'>
                {commentsError}
              </Alert>
            )}

            <Flex align='center'>
              <div className='postPage__user'>
                <img
                  src={user && user.profilePhoto}
                  alt={user && user.username}
                />
              </div>
              <input
                value={comment}
                className='postPage__input'
                onChange={(e) => setComment(e.target.value)}
                name='comment'
                placeholder='Write a comment'
              />
            </Flex>
          </form>
          <div className='postPage__comments'>
            {commentsLoading && (
              <Flex justify='center' className='mb-1'>
                <Spinner />
              </Flex>
            )}
            {comments &&
              comments.map((com) => (
                <Flex
                  align='center'
                  justify='space-between'
                  className='postPage__comment'
                  key={com._id}
                >
                  <Flex align='center'>
                    <div className='postPage__user'>
                      <img
                        src={com.user.profilePhoto}
                        alt={com.user.username}
                      />
                    </div>
                    <div className='postPage__comment--text'>
                      <p className='postPage__user--name'>
                        {com.user.firstName} {com.user.lastName}
                      </p>
                      <p>{com.text} </p>
                    </div>
                  </Flex>
                  {user && user.username === com.user.username && (
                    <div className='postPage__comment--options'>
                      <button onClick={() => deleteCommentHandler(com._id)}>
                        Delete
                      </button>
                      <button onClick={() => preEditHandler(com._id)}>
                        Edit
                      </button>
                    </div>
                  )}
                </Flex>
              ))}
          </div>
        </div>
        {editMode && (
          <Modal
            customSize={600}
            title='Edit your comment'
            showModal={showModal}
          >
            <form onSubmit={editCommentHandler}>
              <Flex align='center' className='mt-1'>
                <div className='postPage__user'>
                  <img
                    src={user && user.profilePhoto}
                    alt={user && user.username}
                  />
                </div>
                <input
                  value={newText}
                  className='postPage__input'
                  onChange={(e) => setNewText(e.target.value)}
                  name='comment'
                  placeholder='Write a comment'
                />
              </Flex>
              <Flex justify='right'>
                <Button type='submit' bg='blue' className='rounded'>
                  Update
                </Button>
              </Flex>
            </form>
          </Modal>
        )}
      </AppContainer>
    </div>
  );
}

export default PostPage;
