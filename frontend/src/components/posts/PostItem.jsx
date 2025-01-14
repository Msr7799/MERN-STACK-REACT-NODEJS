import { Link } from "react-router-dom";

const PostItem = ({ post, username, userId }) => {
  const profileLink = userId
    ? `/profile/${userId}`
    : `/profile/${post?.user?._id}`;

  return (
    <div className="post-item">
      <div className="post-item-image-wrapper">
        <img src={post?.image.url} alt="" className="post-item-image" />
      </div>
      <div className="post-item-info-wrapper">
        <div className="post-item-info">
          <div className="post-item-author">
            <strong>Author: </strong>
            <Link className="post-item-username" to={profileLink}>
              {username ? username : post?.user.username}
            </Link>
          </div>
          <div className="post-item-date">
            {new Date(post?.createdAt).toDateString()}
          </div>
        </div>
        <div className="post-item-details">
          <h4 className="post-item-title">{post?.title}</h4>
          <Link className="post-item-category" to={`/posts/categories/${post?.category}`}>
            {post?.category}
          </Link>
        </div>
        <div className="container">
          <p className="post-item-description">
            <div>{post?.description}</div>
            <div>
              <span>
                <h4>تنبيه:</h4> نرجو الالتزام بعدم نشر تعليقات غير لائقة أو
                خارجة عن إطار الاحترام
              </span>
            </div>
            <div>
              <span>
                Notice: Please avoid inappropriate or disrespectful comments.
              </span>
            </div>
          </p>
        </div>
        <Link className="post-item-link" to={`/posts/details/${post?._id}`}>
          Read More...
        </Link>
      </div>
    </div>
  );
};

export default PostItem;