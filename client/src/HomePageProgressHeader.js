import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ProgressBar from 'react-bootstrap/ProgressBar';
import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

const ProgressHeader = ({ currentUser }) => {
	const [userEvents, setUserEvents] = useState([]);
	const [locations, setLocations] = useState([]);

	useEffect(() => {
		axios.get(`http://localhost:5000/events/byuser/${currentUser.id}`).then((res) => {
			setUserEvents(res.data);
		})
	}, [])

	useEffect(() => {
		axios.get(`http://localhost:5000/locations`).then((res) => {
			setLocations(res.data);
		})
	}, [userEvents])

	return (
		<Container className='go-progress-header go-card'>
			<Row>
				<Col>
					<h3 className='text-center'>You have visited {userEvents.length} location(s) out of {locations.length}. Ready to go somewhere new?</h3>
					<ProgressBar min={0} now={userEvents.length} visuallyHidden label={`${userEvents.length} out of ${locations.length}`} max={locations.length} />
				</Col>
			</Row>
		</Container>
	);
}

export default ProgressHeader;