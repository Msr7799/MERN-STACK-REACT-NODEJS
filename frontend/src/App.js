import { Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/header/Header.jsx";
import Home from "./pages/home/Home.jsx";
import Login from "./pages/forms/Login.jsx";
import Register from "./pages/forms/Register.jsx";
import PostsPage from "./pages/posts-page/PostsPage.jsx";
import CreatePost from "./pages/create-post/CreatePost.jsx";
import AdminDashboard from "./pages/admin/AdminDashboard.jsx";
import Footer from "./components/footer/Footer.jsx";
import PostDetails from "./pages/post-details/PostDetails.jsx";
import { ToastContainer } from "react-toastify";
import Category from "./pages/category/Category.jsx";
import Profile from "./pages/profile/Profile.jsx";
import UsersTable from "./pages/admin/UsersTable.jsx";
import PostsTable from "./pages/admin/PostsTable.jsx";
import CategoriesTable from "./pages/admin/CategoriesTable.jsx";
import CommentsTable from "./pages/admin/CommentsTable.jsx";
import ForgotPassword from "./pages/forms/ForgotPassword.jsx";
import ResetPassword from "./pages/forms/ResetPassword.jsx";
import NotFound from "./pages/not-found/NotFound.jsx";
import ServiceStatus from "./pages/forms/ServiceStatus.jsx";
import CreateFavicon from "./pages/create-favicon/CreateFavicon.jsx"; // استيراد المكون الجديد
import { useSelector } from "react-redux";

function App() {
  const { user } = useSelector((state) => state.auth);

  return (
    <>
      <ToastContainer theme="colored" position="top-center" />
      <Header />
      <main className="container mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
          <Route path="/register" element={!user ? <Register /> : <Navigate to="/" />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:userId/:token" element={<ResetPassword />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/status" element={<ServiceStatus />} />
          <Route path="/admin-dashboard" element={user?.isAdmin ? <AdminDashboard /> : <Navigate to="/" />} />
          <Route path="/posts" element={<PostsPage />} />
          <Route path="/posts/create-post" element={user ? <CreatePost /> : <Navigate to="/" />} />
          <Route path="/posts/details/:id" element={<PostDetails />} />
          <Route path="/posts/categories/:category" element={<Category />} />
          <Route path="/admin-dashboard/users-table" element={user?.isAdmin ? <UsersTable /> : <Navigate to="/" />} />
          <Route path="/admin-dashboard/posts-table" element={user?.isAdmin ? <PostsTable /> : <Navigate to="/" />} />
          <Route path="/admin-dashboard/categories-table" element={user?.isAdmin ? <CategoriesTable /> : <Navigate to="/" />} />
          <Route path="/admin-dashboard/comments-table" element={user?.isAdmin ? <CommentsTable /> : <Navigate to="/" />} />
          <Route path="/create-favicon" element={<CreateFavicon />} /> {/* إضافة الراوت الجديد */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;