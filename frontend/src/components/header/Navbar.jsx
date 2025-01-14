import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { Navbar, Nav, Container, Form, NavDropdown, Offcanvas, Button } from 'react-bootstrap';
import { FaCubes, FaUserCircle } from 'react-icons/fa';
import ThemeOption from "../ThemeOption";
import ProfileSlidebar from "./ProfileSlidebar"; // Importing ProfileSidebar

const CustomNavbar = ({ toggle, setToggle }) => {
  const { user } = useSelector((state) => state.auth);
  const { t } = useTranslation();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showOffcanvas, setShowOffcanvas] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      document.documentElement.setAttribute("data-theme", savedTheme);
      setIsDarkMode(savedTheme === "dark");
    }
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    const theme = !isDarkMode ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  };

  const handleOffcanvasClose = () => setShowOffcanvas(false);
  const handleOffcanvasShow = () => setShowOffcanvas(true);

  return (
    <>
      <Navbar expand="lg" className="p-4" variant={isDarkMode ? 'dark' : 'light'} bg={isDarkMode ? 'dark' : 'light'}>
        <Container>
          <Navbar.Brand href="/" style={{ fontWeight: 550, fontSize: '33px' }}>
            <FaCubes className="me-2" style={{ color: isDarkMode ? 'white' : 'black' }} />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/">{t('home')}</Nav.Link>
              <Nav.Link href="/posts">{t('posts')}</Nav.Link>
              <NavDropdown title={t('posts_page')} id="posts-dropdown">
                <NavDropdown.Item href="/posts/create-post">{t('create_post')}</NavDropdown.Item>
                <NavDropdown.Item href="/posts">{t('posts_page')}</NavDropdown.Item>
              </NavDropdown>
              {user?.isAdmin && (
                <NavDropdown title={t('admin_dashboard')} id="admin-dashboard-dropdown">
                  <NavDropdown.Item href="/admin-dashboard">{t('main_dashboard')}</NavDropdown.Item>
                  <NavDropdown.Item href="/admin-dashboard/users-table">{t('users_table')}</NavDropdown.Item>
                  <NavDropdown.Item href="/admin-dashboard/posts-table">{t('posts_table')}</NavDropdown.Item>
                  <NavDropdown.Item href="/admin-dashboard/categories-table">{t('categories_table')}</NavDropdown.Item>
                  <NavDropdown.Item href="/admin-dashboard/comments-table">{t('comments_table')}</NavDropdown.Item>
                </NavDropdown>
              )}
              <Nav.Link href="/status">{t('status')}</Nav.Link>
              <Nav.Link href="/create-favicon">{t('create_favicon')}</Nav.Link>
              {!user
                ? <Nav.Link href="/login">{t('login')}</Nav.Link>
                : <Nav.Link href="/logout">{t('logout')}</Nav.Link>
              }
            </Nav>
            <Form className="d-flex align-items-center">
              <div className="theme-options ms-3">
                <ThemeOption theme="light" />
                <ThemeOption theme="dark" />
                <ThemeOption theme="purple" />
              </div>
              {user && (
                <Button variant="link" className="text-decoration-none" onClick={handleOffcanvasShow}>
                  <FaUserCircle size={30} />
                </Button>
              )}
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Offcanvas show={showOffcanvas} onHide={handleOffcanvasClose} placement="end" className={isDarkMode ? 'bg-dark text-white' : 'bg-light'}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>User Profile</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <ProfileSlidebar isSidebarOpen={showOffcanvas} toggleSidebar={handleOffcanvasShow} />
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default CustomNavbar;