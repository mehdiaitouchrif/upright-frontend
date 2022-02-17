import Flex from "../../../UI/Flex";
import "./PostFooter.scss";

function PostFooter({
  post,
  handlePostLike,
  handlePostShare,
  handlePostComment,
}) {
  return (
    <div className='post-footer'>
      <Flex justify='space-between' className='post__actions'>
        <Flex align='center'>
          <i
            onClick={() => handlePostLike(post._id)}
            className='far fa-heart red'
          ></i>
          <p style={{ fontSize: 16 }}>{post.likes.length}</p>
        </Flex>
        <Flex align='center'>
          <i onClick={handlePostComment} className='far fa-comment green'></i>
          <p style={{ fontSize: 16 }}>{post.comments?.length} </p>
        </Flex>
        <Flex align='center'>
          <i onClick={handlePostShare} className='fas fa-share blue'></i>
          <p style={{ fontSize: 16 }}>{post.shares.length}</p>
        </Flex>
      </Flex>
    </div>
  );
}

export default PostFooter;
