import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Navingbar from './Navbar';
import ProgressHeader from './HomePageProgressHeader';
import { LocationList } from './HomePageLocationList';
import './App.css';
import { useState } from 'react';

const HomePage = ({ currentUser }) => {
	const [currUser, setCurrUser] = useState(currentUser);
	return (
		<>
			<Navingbar userID={ currUser.id } />
			<Container className='HomePage'>
				<Row>
					<Col className='col-8'>
						<ProgressHeader currentUser={ currentUser } />
						<LocationList />
					</Col>
					<Col className='col-4'>
						<div className='go-card' style={{width: '100%', height: '100%'}}></div>
					</Col>
				</Row>
			</Container>
			<h1>Hello, { currUser.name }!</h1>
		</>
	);
}

export default HomePage;
