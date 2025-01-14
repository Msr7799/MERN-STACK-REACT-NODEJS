import PostList from "../../components/posts/PostList";
import Sidebar from "../../components/sidebar/Sidebar";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchPosts } from "../../redux/apiCalls/postApiCall";
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './home.css';
import { FaRegSmile, FaStar, FaHeart } from 'react-icons/fa';
import ThemeOption from "../../components/ThemeOption"; // Adding ThemeOption Import
import PlaceholderCard from "../../components/PlaceholderCard"; // Adding PlaceholderCard Import

const Home = () => {
  const dispatch = useDispatch();
  const { posts } = useSelector(state => state.post);

  const [theme, setTheme] = useState('light'); // Step 1: State to store theme

  useEffect(() => {
    // Step 1: Get the current theme
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    setTheme(currentTheme);
  }, []);

  const getCardClass = () => {
    // Step 2: Determine the appropriate class based on the theme
    if (theme === 'dark' || theme === 'purple') {
      return 'bg-light';
    } else {
      return 'text-white bg-dark';
    }
  };

  return (
    <Container fluid className="p-0">
      <div className="theme-options mt-3">
        <ThemeOption theme="light" /> {/* Light Theme */}
        <ThemeOption theme="dark" /> {/* Dark Theme */}
        <ThemeOption theme="purple" /> {/* Purple Theme */}
      </div>
      <div className="home-hero-header text-center py-5">
        <h1>Welcome to AL-Romaihi Blog</h1>
        <p>Your go-to platform for all things inspiring and informative.</p>
      </div>
      
      <Container className="my-5">
        <Row className="text-center">
          <Col>
            <h2>About Us <FaRegSmile /></h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum.</p>
          </Col>
        </Row>
      </Container>
  
  
    
      <Container className="my-5">
        <Row className="text-center">
          <Col md={4}>
            <Card className={`border-warning mb-3 ${getCardClass()}`} style={{ maxWidth: '20rem' }}>
              <Card.Header>Header</Card.Header>
              <Card.Body>
                <Card.Title>Warning card title</Card.Title>
                <Card.Text>
                  {/* Card Content */}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className={`border-warning mb-3 ${getCardClass()}`} style={{ maxWidth: '20rem' }}>
              <Card.Header>Header</Card.Header>
              <Card.Body>
                <Card.Title>Warning card title</Card.Title>
                <Card.Text>
                  {/* Card Content */}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className={`border-warning mb-3 ${getCardClass()}`} style={{ maxWidth: '20rem' }}>
              <Card.Header>Header</Card.Header>
              <Card.Body>
                <Card.Title>Warning card title</Card.Title>
                <Card.Text>
                  {/* Card Content */}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      <Container className="my-5">
        <Row className="text-center">
          <Col>
            <h2>Our Projects <FaHeart /></h2>
          </Col>
        </Row>
        <Row>
          <Col md={4}>
            <PlaceholderCard imgSrc={process.env.PUBLIC_URL + '/images/5.jpg'} />
          </Col>
          <Col md={4}>
            <PlaceholderCard imgSrc={process.env.PUBLIC_URL + '/images/3.jpg'} />
          </Col>
          <Col md={4}>
            <PlaceholderCard imgSrc={process.env.PUBLIC_URL + '/images/9.jpg'} />
          </Col>
        </Row>
      </Container>

      <Container className="my-5 border-warning py-5">
       
      </Container>

      <Container className="my-5">
        <Row className="text-center">
          <Col>
            <h2>Meet Our Team <FaStar /></h2>
          </Col>
        </Row>
        <Row>
          <Col md={4}>
            <Card className={`border-warning mb-3 ${getCardClass()}`} style={{ maxWidth: '20rem' }}>
              <Card.Img variant="top"src={process.env.PUBLIC_URL + '/images/17.jpg'} />
              <Card.Body>
                <Card.Title>Team Member 1 <FaRegSmile /></Card.Title>
                <Card.Text>Role/Position</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className={`border-warning mb-3 ${getCardClass()}`} style={{ maxWidth: '20rem' }}>
              <Card.Img variant="top" src={process.env.PUBLIC_URL + '/images/17.jpg'} />
              <Card.Body>
                <Card.Title>Team Member 2 <FaHeart /></Card.Title>
                <Card.Text>Role/Position</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className={`border-warning mb-3 ${getCardClass()}`} style={{ maxWidth: '20rem' }}>
              <Card.Img variant="top" src={process.env.PUBLIC_URL + '/images/17.jpg'} />
              <Card.Body>
                <Card.Title>Team Member 3 <FaStar /></Card.Title>
                <Card.Text>Role/Position</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      <Container className="my-5">
        <h2 className="text-center mb-4">Latest Blog Posts <FaRegSmile /></h2>
        <Row>
          <Col md={8}>
            <PostList posts={posts} />
          </Col>
          <Col md={4}>
            <Sidebar />
          </Col>
        </Row>
      </Container>

      <Container className="my-5">
        <Row className="text-center">
          <Col>
            <h2>Contact Us <FaHeart /></h2>
            <Form>
              <Row>
                <Col md={6}>
                  <Form.Group controlId="formName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter your name" />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="formEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="Enter your email" />
                  </Form.Group>
                </Col>
              </Row>
              <Form.Group controlId="formMessage">
                <Form.Label>Message</Form.Label>
                <Form.Control as="textarea" rows={3} placeholder="Your message" />
              </Form.Group>
              <Button variant="primary" type="submit" className="mt-3">
                Send Message
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>

      <Container className="text-center my-5">
        <Link to="/posts" className="btn btn-primary">See All Posts</Link>
      </Container>
    </Container>
  );
};

export default Home;