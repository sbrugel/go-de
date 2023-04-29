import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './App.css';

export function LocationCard(props) {
	return (
		<Container className='go-location-card go-card'>
			<Row>
				<Col xs={2}>
					<h4 className='go-location-card-title'>{props.title}</h4>
					<p>{props.description}</p>
				</Col>
				<Col xs={1}>
					<img src={props.img} alt={props.title} />
				</Col>
			</Row>
		</Container>
	);
}
