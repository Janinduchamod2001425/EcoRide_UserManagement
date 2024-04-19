import { Navbar, Nav, Container, NavDropdown, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { useLogoutMutation } from '../slices/usersApiSlice';
import { logout } from '../slices/authSlice';
import '../styles/Header.css';
import Logo from '../images/Ecar.png';
import profileAvatar from '../images/Male User.png';

const Header = () => {
  const { userInfo } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate('/');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <header>
      <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect className='navbar'>
        <Container>

          <Link className='siteName' to='/'>
            <Navbar.Brand className="fw-bold fs-2 font-monospace">Ec<span style={{fontFamily: 'monospace', fontSize: '32px', color: 'lime'}}>o</span>Ride<img src={Logo} className='Logo'/></Navbar.Brand>
          </Link>

          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav' className="drop-menu">
            <Nav className='ms-auto'>
              {userInfo ? (
                <>
                  <img src={profileAvatar} className='avatar1'/>
                  <NavDropdown title={userInfo.name} id='username'>
                    <LinkContainer to='/profile'>
                      <NavDropdown.Item className="item fw-bold">
                        📑 &nbsp; Profile
                      </NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Item onClick={logoutHandler} className="item fw-bold">
                      ⚠ &nbsp; Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                  <LinkContainer to='/profile'><Button id='profile'>Profile</Button></LinkContainer>
                  <Button id='logout' onClick={logoutHandler}>Logout</Button>

                </>
              ) : (
                <>
                  <img src={profileAvatar} className='avatar'/>
                  <LinkContainer to='/register' className='signup'>
                    <Button id='signup'>
                      Sign Up
                    </Button>
                  </LinkContainer>
                  <LinkContainer to='/login'>
                    <Button id='signin'>
                      Sign In
                    </Button>
                  </LinkContainer>
                </>
              )}

            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
