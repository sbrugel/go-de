import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './LocationCard'
import './App.css';
import { LocationCard } from './LocationCard';

export const LocationList = () => {
	return (
		<Container className='go-location-list go-card'>
			<Row>
				<Col>
					
				</Col>
			</Row>
			<Row>
				<LocationCard title='Rehobeth Beach' description='This is a description.' imgURL='https://images-ext-2.discordapp.net/external/oQgk1PaIlIDCKwQPiKc2sqCCCJ_ODaU45kMSImblg7c/https/upload.wikimedia.org/wikipedia/commons/thumb/6/67/Rehoboth_Beach_boardwalk_looking_north_toward_Rehoboth_Avenue.jpg/1280px-Rehoboth_Beach_boardwalk_looking_north_toward_Rehoboth_Avenue.jpg' />
			</Row>
		</Container>
	);
}
