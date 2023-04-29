import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './App.css';

export function LocationList() {
	return (
		<Container className='go-location-list go-card'>
			<Row>
				<Col>
					<h2 className='text-center'>You have visited locations. Ready to go somewhere new?</h2>
				</Col>
			</Row>
		</Container>
	);
}
