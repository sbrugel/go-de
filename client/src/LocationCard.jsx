import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import './App.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const LocationCard = ({ id }) => {
	const navigate = useNavigate();
	const [location, setLocation] = useState(null);

	useEffect(() => {
		console.log('render with ID ' + id)
		axios.get("http://localhost:5000/locations/" + id)
			.then((res) => {
				setLocation(res.data);
			})
	}, [])

	if (location) {
		return (
			<>
				<Container className='go-location-card go-card'>
					<Row>
						<Col className='col-6'>
							<h4>{location.name}</h4>
							<p>{location.description}</p>
						</Col>
						<Col className='col-6'>
							<div className='go-location-card-img-wrapper'>
								<img src={location.imgURL} alt={location.name} />
								<Button className='go-location-card-visited-btn' onClick={() => navigate("/submit/" + location.id)}>Mark Visited</Button>
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
