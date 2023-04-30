import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Navingbar from './Navbar';
import ProgressHeader from './HomePageProgressHeader';
import { LocationList } from './HomePageLocationList';
import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

const HomePage = ({ currentUser }) => {
	const [currUser, setCurrUser] = useState(currentUser);
	const [eventsList, setEventsList] = useState([]);
	const [feed, setFeed] = useState();

	useEffect(() => {
		console.log('hi')
		createFeed();
	}, [])

	const createFeed = async () => {
		console.log('beep boop')
		console.log(currentUser.following)
		for (const user of currentUser.following) {
			console.log(user)
			axios.get("http://localhost:5000/events/byuser/" + user)
				.then((res) => {
					console.log('feed from ' + user);
					console.log(res.data);
					for (const event of res.data) {
						setEventsList(prevState => [...prevState, event].sort((a, b) => new Date(b.date) - new Date(a.date)));
					}
				})
		}
	};

	useEffect(() => {
		async function setupFeed() {
			const feedItems = await Promise.all(
				eventsList.map(async (event) => {
				  const userResponse = await axios.get(
					`http://localhost:5000/users/${event.userID}`
				  );
				  const locationResponse = await axios.get(
					`http://localhost:5000/locations/${event.locationID}`
				  );
				  const eventUser = userResponse.data.name;
				  const eventLocation = locationResponse.data.name;
				  console.log('in the await now')
				  return (
					<li key={event.id}>
					  <strong>{eventUser}</strong> went to{" "}
					  <strong>{eventLocation}</strong> on{" "}
					  <u>
						{new Date(event.date).toLocaleDateString("en-us", {
						  year: "numeric",
						  month: "long",
						  day: "numeric",
						})}
					  </u>
					  {event.comments ? `: "${event.comments}"` : "."}
					</li>
				  );
				})
			  );
			  setFeed(feedItems);
		}
		setupFeed();

		
	}, [eventsList])

	return (
		<>
			<Navingbar userID={ currUser.id } />
			<Container className='HomePage'>
				<Row>
					<Col className='col-8'>
						<ProgressHeader currentUser={ currentUser } />
						<LocationList currentUser={currentUser} />
					</Col>
					<Col className='col-4'>
						<div className='go-card' style={{width: '100%', height: '100%', padding: '10px'}}>
							<h2>Your Feed</h2>
							<ul>
								{ feed }
							</ul>
						</div>
					</Col>
				</Row>
			</Container>
		</>
	);
}

export default HomePage;
