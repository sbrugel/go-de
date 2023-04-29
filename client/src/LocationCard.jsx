import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './App.css';

export const LocationCard = ({ title, description, imgURL }) => {
	return (
		<Container className='go-location-card go-card'>
			<Row>
				<Col className='col-6'>
					<h4>{title}</h4>
					<p>{description}</p>
				</Col>
				<Col className='col-6'>
					<div className='go-location-card-img-wrapper'>
						<img src={imgURL} alt={title} />
					</div>
				</Col>
			</Row>
		</Container>
	);
}
