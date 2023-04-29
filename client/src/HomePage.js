import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Navingbar } from './Navbar';
import { ProgressHeader } from './HomePageProgressHeader';
import { LocationList } from './HomePageLocationList';
import './App.css';

function HomePage() {
	return (
		<>
			<Navingbar></Navingbar>
			<Container className='HomePage'>
				<Row>
					<Col className='col-8'>
						<ProgressHeader current={60} max={100} />
						<LocationList />
					</Col>
					<Col className='col-4'>
						<div className='go-card' style={{width: '100%', height: '100%'}}></div>
					</Col>
				</Row>
			</Container>
		</>
	);
}

export default HomePage;
