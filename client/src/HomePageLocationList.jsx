import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './LocationCard'
import './App.css';
import { LocationCard } from './LocationCard';
import { useEffect, useState } from 'react';
import axios from 'axios';

export const LocationList = ({ currentUser }) => {
	const [locations, setLocations] = useState(null);
	const [recommendedID, setRecommendedID] = useState(1);

	useEffect(() => {
		axios.get("http://localhost:5000/locations")
			.then((res) => {
				setLocations(res.data);
			})
	}, [])

	useEffect(() => {
		if (!locations) return;
		setRecommendedID(Number.parseInt((Math.random() * locations.length) + 1));
	}, [locations])

	useEffect(() => {
		console.log(recommendedID + " is the id")
	}, [recommendedID])

	return (
		<Container className='go-location-list go-card'>
			<Row>
				<Col>
					
				</Col>
			</Row>
			<Row>
				<LocationCard key={recommendedID} id={ recommendedID } currentUser={currentUser} />
			</Row>
		</Container>
	);
}
