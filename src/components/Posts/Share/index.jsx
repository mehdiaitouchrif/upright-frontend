import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { sharePost } from "../../../actions/postActions";
import Modal from "../../UI/Modal";
import TextArea from "../../UI/FormComponents/TextArea";
import Button from "../../UI/Button";
import Flex from "../../UI/Flex";
import "./Share.scss";

function Share({ post, user, showModal, customSize, title }) {
  const [text, setText] = useState(null);

  const dispatch = useDispatch();

  const sharePostHandler = (postId) => {
    dispatch(sharePost(postId, text));
  };

  return (
    <Modal
      className='share'
      showModal={showModal}
      customSize={customSize}
      title={title}
    >
      <Flex align='center'>
        <div className='share__user'>
          <img src={user.profilePhoto} alt={user.username} />
        </div>
        <TextArea
          name='text'
          className='share__input'
          placeholder='Your quote'
          onChange={(e) => setText(e.target.value)}
          value={text}
        />
      </Flex>
      <Flex>
        <div className='share__user' style={{ visibility: "hidden" }}>
          <img src={user.profilePhoto} alt={user.username} />
        </div>
        <div className='share__post my-1'>
          <Flex>
            <div className='post__user'>
              <Link to={`/${post.user.username}`}>
                <img
                  src={post.user.profilePhoto}
                  alt={`${post.user.username} avatar`}
                />
              </Link>
            </div>
            <Link to={`/post/${post._id}`} className='post__details'>
              <p>
                <Flex justify='space-between' align='center'>
                  <div>
                    <Link to={`/@${post.user.username}`}>
                      {post.user.firstName} {post.user.lastName}
                    </Link>
                    <span>@{post.user.username}</span>
                  </div>
                </Flex>
              </p>
              <h3 className='tertiary-heading'>{post.text}</h3>
              {post.image && (
                <img
                  className='post__image'
                  src={post.image}
                  alt={post.image}
                />
              )}
            </Link>
          </Flex>
        </div>
      </Flex>
      <Flex justify='right'>
        <Button
          onClick={() => sharePostHandler(post._id)}
          type='submit'
          bg='blue'
          className='rounded'
        >
          Share
        </Button>
      </Flex>
    </Modal>
  );
}

export default Share;
