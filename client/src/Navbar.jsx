import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from 'react-bootstrap/Container';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

import { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const Navingbar = ({ userID }) => { // user ID is the currently logged in user, 0 for no user
  const [user, setUser] = useState({
	name: '',
	password: '',
  });
  const navigate = useNavigate();

  useEffect(() => {
	if (userID) {
		axios.get(`http://localhost:5000/users/${userID}`).then((res) => {
			setUser({
				...res.data,
			});
		});
	}
  }, []);
  
  return (
    <>
      <Navbar expand="sm">
        <Container>
          <Navbar.Brand onClick={() => navigate("/")}>GO-DE</Navbar.Brand>
		  { user && user.name && user.password
		    ?
				<Nav>
					<Nav.Link style={{color:"white"}} onClick={() => navigate("/people")}>People</Nav.Link>
					<Nav.Link style={{color:"white"}} onClick={() => navigate("/locations")}>Locations</Nav.Link>
					<div style={{backgroundColor:"grey"}}>
					<Nav.Link style={{color:"white"}} onClick={() => navigate("/user/" + user.id)}>{ user.name }</Nav.Link>
					</div>
				</Nav>
			:
				<></>
          }
        </Container>
      </Navbar>
    </>
  );
}

export default Navingbar;
