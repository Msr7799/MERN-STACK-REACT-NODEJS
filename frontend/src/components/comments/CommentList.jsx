import "./comment-list.css";
import swal from "sweetalert";
import { useState } from "react";
import UpdateCommentModal from "./UpdateCommentModal";
import Moment from "react-moment";
import { useDispatch, useSelector } from "react-redux";
import { deleteComment } from "../../redux/apiCalls/commentApiCall";

const CommentList = ({ comments }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const [updateComment, setUpdateComment] = useState(false);
  const [commentForUpdate, setCommentForUpdate] = useState(null);

  const updateCommentHandler = (comment) => {
    setCommentForUpdate(comment);
    setUpdateComment(true);
  };

  const deleteCommentHandler = (commentId) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this comment!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((isOk) => {
      if (isOk) {
        dispatch(deleteComment(commentId));
      }
    });
  };

  return (
    <div className="comment-list">
      <h4 className="comment-list-count">{comments?.length} Comments</h4>
      {comments?.map((comment, index) => {
        const alertClass = index % 2 === 0 ? "alert-primary" : "alert-secondary";
        return (
          <div key={comment._id} className={`alert ${alertClass}`} role="alert">
            <button type="button" className="btn-close" data-bs-dismiss="alert"></button>
            <div className="comment-item-info">
              <img
                src={comment.user.profilePhoto?.url || '/default-avatar.png'}
                alt=""
                className="rounded-circle"
                width="30"
                height="30"
                style={{ marginRight: "10px" }}
              />
              <strong>{comment.username}</strong>
              <small>
                <Moment fromNow ago>
                  {comment.createdAt}
                </Moment>{" "}
                ago
              </small>
            </div>
            <p className="comment-item-text">{comment.text}</p>
            <div className="comment-item-icon-wrapper">
              <i
                onClick={() => updateCommentHandler(comment)}
                className="bi bi-pencil-square"
              ></i>
              <i
                onClick={() => deleteCommentHandler(comment._id)}
                className="bi bi-trash-fill"
              ></i>
              <i
                onClick={() => console.log('Like comment')}
                className="bi bi-heart"
              ></i>
              <small>{comment.likes?.length || 0} likes</small>
            </div>
          </div>
        );
      })}
      {updateComment && (
        <UpdateCommentModal
          commentForUpdate={commentForUpdate}
          setUpdateComment={setUpdateComment}
        />
      )}
    </div>
  );
};

export default CommentList;