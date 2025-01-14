import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import "./post-details.css";
import { toast } from "react-toastify";
import AddComment from "../../components/comments/AddComment";
import CommentList from "../../components/comments/CommentList";
import swal from "sweetalert";
import UpdatePostModal from "./UpdatePostModal";
import { useDispatch, useSelector } from "react-redux";
import {
    deletePost,
    fetchSinglePost,
    toggleLikePost,
    updatePostImage,
} from "../../redux/apiCalls/postApiCall";
import { useTranslation } from "react-i18next";
import "bootstrap/dist/css/bootstrap.min.css";

const PostDetails = () => {
    const dispatch = useDispatch();
    const { post } = useSelector((state) => state.post);
    const { user } = useSelector((state) => state.auth);
    const { t } = useTranslation();
    const { id } = useParams();

    const [file, setFile] = useState(null);
    const [updatePost, setUpdatePost] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
        dispatch(fetchSinglePost(id));
    }, [id, dispatch]);

    const updateImageSubmitHandler = (e) => {
        e.preventDefault();
        if (!file) return toast.warning("There is no file!");

        const formData = new FormData();
        formData.append("image", file);
        dispatch(updatePostImage(formData, post?._id));
    };

    const navigate = useNavigate();

    const deletePostHandler = () => {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this post!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((isOk) => {
            if (isOk) {
                dispatch(deletePost(post?._id));
                navigate(`/profile/${user?._id}`);
            }
        });
    };

    return (
        <>
            <section className="post-details">
              
                <nav className="navbar navbar-expand-lg bg-dark" data-bs-theme="dark">
                      <div className="container-fluid">
                          <Link className="navbar-brand" to="#">Navbar</Link>
                          <button
                              className="navbar-toggler"
                              type="button"
                              data-bs-toggle="collapse"
                              data-bs-target="#navbarColor02"
                              aria-controls="navbarColor02"
                              aria-expanded="false"
                              aria-label="Toggle navigation"
                          >
                              <span className="navbar-toggler-icon"></span>
                          </button>
                          <div className="collapse navbar-collapse" id="navbarColor02">
                              <ul className="navbar-nav me-auto">
                                  <li className="nav-item">
                                      <Link className="nav-link active" to="#">Home</Link>
                                  </li>
                               
                                  <li className="nav-item dropdown">
                                      <a
                                          className="nav-link dropdown-toggle"
                                          data-bs-toggle="dropdown"
                                          href="#"
                                          role="button"
                                          aria-haspopup="true"
                                          aria-expanded="false"
                                      >
                                          Dropdown
                                      </a>
                                      <div className="dropdown-menu">
                                          <Link className="dropdown-item" to="#">Action</Link>
                                          <Link className="dropdown-item" to="#">Another action</Link>
                                          <Link className="dropdown-item" to="#">Something else here</Link>
                                          <div className="dropdown-divider"></div>
                                          <Link className="dropdown-item" to="#">Separated link</Link>
                                      </div>
                                  </li>
                              </ul>
                              <form className="d-flex">
                                  <input
                                      className="form-control me-sm-2"
                                      type="search"
                                      placeholder="Search"
                                  />
                                  <button className="btn btn-secondary my-2 my-sm-0" type="submit">
                                      Search
                                  </button>
                              </form>
                          </div>
                      </div>
                  </nav>
              
                  <div className="posts-container">
                  <div className="post-details-image-wrapper">
                    <img
                        src={file ? URL.createObjectURL(file) : post?.image.url}
                        alt=""
                        className="post-details-image"
                    />
                    </div>
                
                
                    <hr />
                    
                    {user?._id === post?.user?._id && (
                        <form onSubmit={updateImageSubmitHandler} className="update-post-image-form">
                            <label htmlFor="file" className="update-post-label">
                                <i className="bi bi-image-fill"></i>
                                Select new image
                            </label>
                            <input
                                style={{ display: "none" }}
                                type="file"
                                name="file"
                                id="file"
                                onChange={(e) => setFile(e.target.files[0])}
                            />
                            <button type="submit">upload</button>
                        </form>
                    )}
            
                <h1 className="post-details-title">{post?.title}</h1>
                <div className="post-details-user-info">
                    <img
                        src={post?.user.profilePhoto?.url}
                        alt=""
                        className="post-details-user-image"
                    />
                    <div className="post-details-user">
                        <strong>
                            <Link to={`/profile/${post?.user._id}`}>{post?.user.username}</Link>
                        </strong>
                        <span>{new Date(post?.createdAt).toDateString()}</span>
                    </div>
                </div>
                </div>
                <p className="post-item-description">
                    <strong><h4>{post?.description}</h4></strong>
                    <h5 style={{ color: "red" }}>تنبيه: نرجو الالتزام بعدم نشر تعليقات غير لائقة أو خارجة عن إطار الاحترام</h5>
                </p>
                <div className="post-details-icon-wrapper">
                    <div>
                        {user && (
                            <i
                                onClick={() => dispatch(toggleLikePost(post?._id))}
                                className={
                                    post?.likes.includes(user?._id)
                                        ? "bi bi-hand-thumbs-up-fill"
                                        : "bi bi-hand-thumbs-up"
                                }
                            ></i>
                        )}
                        <small>{post?.likes.length} likes</small>
                    </div>
                    {user?._id === post?.user?._id && (
                        <div>
                            <i
                                onClick={() => setUpdatePost(true)}
                                className="bi bi-pencil-square"
                            ></i>
                            <i onClick={deletePostHandler} className="bi bi-trash-fill"></i>
                        </div>
                    )}
                </div>
                {user ? (
                    <AddComment postId={post?._id} />
                ) : (
                    <p className="post-details-info-write">
                        to write a comment you should login first
                    </p>
                )}
                <CommentList comments={post?.comments} />
                {updatePost && (
                    <UpdatePostModal post={post} setUpdatePost={setUpdatePost} />
                )}
            </section>
        </>
    );
};

export default PostDetails;