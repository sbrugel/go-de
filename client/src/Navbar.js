import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from 'react-bootstrap/Container';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
export function Navingbar() {
  return (
    <>
      <Navbar expand="sm" style={{backgroundColor:"#528560",paddingLeft: "10px",color:"white",
                paddingRight: "10px",}}>
        <Container>
          <Navbar.Brand style={{position:"relative", left:"0px"}} href="#home">GO-DE</Navbar.Brand>
          <Nav>
            <Nav.Link style={{color:"white"}} href="#">Submit</Nav.Link>
            <Nav.Link style={{color:"white"}} href="#locations">locations</Nav.Link>
            <div style={{backgroundColor:"grey"}}>
            <Nav.Link style={{color:"white"}} href="#Profile">Profile</Nav.Link>
            </div>
           
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}
