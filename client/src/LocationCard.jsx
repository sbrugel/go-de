import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import './App.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const LocationCard = ({ id, showButton, currentUser }) => {
	const navigate = useNavigate();
	const [location, setLocation] = useState(null);
	const [toggleButton, setToggleButton] = useState(showButton);

	const [otherVisited, setOtherVisited] = useState([]);

	useEffect(() => {
		console.log('render with ID ' + id)
		axios.get("http://localhost:5000/locations/" + id)
			.then((res) => {
				setLocation(res.data);
			})
		axios.get("http://localhost:5000/events/byuser/" + currentUser.id)
			.then((res) => {
				for (const event of res.data) {
					if (event.locationID === id) {
						console.log('nope')
						setToggleButton(false);
					}
				}
			})
		axios.get("http://localhost:5000/events/bylocation/" + id)
			.then((res) => {
				console.log('here')
				const userNames = [];
				for (const event of res.data) {
					axios.get("http://localhost:5000/users/" + event.userID)
						.then((userRes) => {
							if (currentUser.following.includes(userRes.data.id)) {
								userNames.push(userRes.data.name);
								setOtherVisited(userNames.join(', '));
							}
						})
				}
			})
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	if (location) {
		return (
			<>
				<Container className='go-location-card go-card'>
					<Row>
						<Col className='col-6 d-flex flex-column align-items-center justify-content-center px-5 py-5'>
							<h4>{location.name}</h4>
							<h5>{location.description}</h5>
							{ otherVisited.length !== 0 ? <h6><em><strong>Friends who have been here before:</strong> {otherVisited}</em></h6> : <h6><em>Be the first of your friends to visit here!</em></h6>}
						</Col>
						<Col className='col-6'>
							<div className='go-location-card-img-wrapper'>
								<img src={location.imgURL} alt={location.name} />
								<Button disabled={!toggleButton} className='go-location-card-visited-btn' onClick={() => navigate("/submit/" + location.id)}>{toggleButton ? 'Mark ' : ''}Visited</Button>
							</div>
						</Col>
					</Row>
				</Container>
			</>
		)
	} else {
		return (
			<p>Loading...</p>
		)
	}
}

LocationCard.defaultProps = {
	showButton: true
}