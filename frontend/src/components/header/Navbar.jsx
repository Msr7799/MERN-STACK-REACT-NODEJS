import React, { useState } from "react";
import { useSelector } from "react-redux";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, Container, Form } from 'react-bootstrap';

const CustomNavbar = () => {
  const { user } = useSelector((state) => state.auth);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.body.classList.toggle('bg-dark', !isDarkMode);
    document.body.classList.toggle('text-white', !isDarkMode);
  };

  return (
    <Navbar bg={isDarkMode ? 'dark' : 'light'} expand="lg">
      <Container>
        <Navbar.Brand href="/">AL-Romaihi Blog</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">الرئيسية</Nav.Link>
            <Nav.Link href="/posts">المقالات</Nav.Link>
            {user && <Nav.Link href={`/profile/${user._id}`}>الملف الشخصي</Nav.Link>}
            {user && <Nav.Link href="/posts/create-post">إنشاء مقالة</Nav.Link>}
            {user && <Nav.Link href="/create-favicon">إنشاء أيقونة</Nav.Link>}
            {user?.isAdmin && (
              <>
                <Nav.Link href="/admin-dashboard">لوحة التحكم</Nav.Link>
                <Nav.Link href="/admin-dashboard/users-table">جدول المستخدمين</Nav.Link>
                <Nav.Link href="/admin-dashboard/posts-table">جدول المقالات</Nav.Link>
                <Nav.Link href="/admin-dashboard/categories-table">جدول التصنيفات</Nav.Link>
                <Nav.Link href="/admin-dashboard/comments-table">جدول التعليقات</Nav.Link>
              </>
            )}
            <Nav.Link href="/status">حالة الخدمات</Nav.Link>
            {!user
              ? <Nav.Link href="/login">تسجيل الدخول</Nav.Link>
              : <Nav.Link href="/logout">تسجيل الخروج</Nav.Link>
            }
          </Nav>
          <Form className="d-flex align-items-center">
            <div className="form-check form-switch">
              <input 
                className="form-check-input" 
                type="checkbox" 
                id="darkModeSwitch" 
                checked={isDarkMode} 
                onChange={toggleTheme} 
              />
              <label className="form-check-label" htmlFor="darkModeSwitch">
                <i className={`bi bi-${isDarkMode ? 'sun' : 'moon'}`}></i>
              </label>
            </div>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;