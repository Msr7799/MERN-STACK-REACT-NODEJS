import React from "react";
import "./posts-page.css";
import PostList from "../../components/posts/PostList";
import Sidebar from "../../components/sidebar/Sidebar";
import Pagination from "../../components/pagination/Pagination";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts, getPostsCount } from "../../redux/apiCalls/postApiCall";
import { Link } from "react-router-dom";
import PlaceholderCard from "../../components/PlaceholderCard"; // Adding PlaceholderCard Import

const POST_PER_PAGE = 3;

const PostsPage = () => {
  const dispatch = useDispatch();
  const { postsCount, posts } = useSelector((state) => state.post);

  const [currentPage, setCurrentPage] = useState(1);
  const pages = Math.ceil(postsCount / POST_PER_PAGE);

  useEffect(() => {
    dispatch(fetchPosts(currentPage));
    window.scrollTo(0, 0);
  }, [dispatch, currentPage]);

  useEffect(() => {
    dispatch(getPostsCount());
  }, [dispatch]);

  return (
    <>
   
      
      
      <section className="posts-page">
      <div className="container">
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
                  </div>
        <div className="container">
        <PostList posts={posts} />
        <Sidebar />
      </div>
      
      <PlaceholderCard /> {/* Adding PlaceholderCard */}  
      <div className="container">
      <h2>Pagination</h2>
      </div>
      <Pagination
        pages={pages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
      </section>
    </>
  );
};

export default PostsPage;