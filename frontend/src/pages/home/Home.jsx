import PostList from "../../components/posts/PostList";
import "./home.css";
import Sidebar from "../../components/sidebar/Sidebar";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchPosts } from "../../redux/apiCalls/postApiCall";

// أمثلة للأقسام
const sections = ["التكنولوجيا", "الصحة", "الألعاب", "الأعمال", "السفر"];

const Home = () => {
  const dispatch = useDispatch();
  const { posts } = useSelector(state => state.post);

  useEffect(() => {
    dispatch(fetchPosts(1));
  }, []);

  return (
    <section className="home">
      <div className="home-hero-header">
        <div className="home-hero-header-layout">
          <h1 className="home-title">Welcome to AL-Romaihi Blog</h1>
        </div>
      </div>
      <div className="home-sections">
        {sections.map((section) => (
          <Link key={section} to={`/posts/categories/${section}`} className="home-section">
            {section}
          </Link>
        ))}
      </div>
      <div className="home-images">
        <img src="https://via.placeholder.com/300" alt="Example 1" />
        <img src="https://via.placeholder.com/300" alt="Example 2" />
        <img src="https://via.placeholder.com/300" alt="Example 3" />
      </div>
      <div className="home-latest-post">Latest Posts</div>
      <div className="home-container">
        <PostList posts={posts} />
        <Sidebar />
      </div>
      <div className="home-see-posts-link">
        <Link to="/posts" className="home-link">
          See All Posts
        </Link>
      </div>
    </section>
  );
};

export default Home;