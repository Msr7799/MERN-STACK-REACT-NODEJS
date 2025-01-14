import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { logoutUser } from '../../redux/apiCalls/authApiCall'; // تأكد من المسار الصحيح

const ProfileSlidebar = ({ isSidebarOpen, toggleSidebar }) => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
    toggleSidebar();
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div>
      <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <div className='sidebar-header text-center'>
          <img src={user?.profilePhoto?.url || '/default-avatar.png'} alt={user.username} className='profile-photo' />
          <h3>{user.username}</h3>
          <div className='followers-following-wrapper'>
            <span>Followers: {user.followers?.length || 0}</span>
            <span>Following: {user.following?.length || 0}</span>
          </div>
          <p>{user.bio}</p>
        </div>
        <ul className='sidebar-links'>
          <li>
            <Link to='/profile/MyComments' onClick={toggleSidebar}>
              <i className='bi bi-chat-dots'></i> My Comments
            </Link>
          </li>
          <li>
            <Link to='/profile/LikedPosts' onClick={toggleSidebar}>
              <i className='bi bi-hand-thumbs-up'></i> Liked Posts
            </Link>
          </li>
          <li>
            <Link to='/profile/Profile' onClick={toggleSidebar}>
              <i className='bi bi-pencil'></i> Edit Profile
            </Link>
          </li>
          <li>
            <Link to='/not-found/NotFound' onClick={toggleSidebar}>
              <i className='bi bi-key'></i> Change Password
            </Link>
          </li>
          <li className='text-danger'>
            <Link to='/profile' onClick={toggleSidebar}>
              <i className='bi bi-trash'></i> Delete Account
            </Link>
          </li>
          <li>
            <Link to='/' onClick={toggleSidebar}>
              <i className='bi bi-life-preserver'></i> Access Support
            </Link>
          </li>
          <li className='text-danger'>
            <button className='nav-link btn btn-link text-danger' onClick={handleLogout}>
              <i className='bi bi-box-arrow-right'></i> Logout
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ProfileSlidebar;