import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ProgressBar from 'react-bootstrap/ProgressBar';
import './App.css';

export function ProgressHeader() {
	const now = 60;
	const max = 100;
	return (
		<Container className='progress-header'>
			<Row>
				<Col md="auto">
					Welcome USER!
				</Col>
				<Col>
					<ProgressBar variant='success' min={0} now={now} max={max} />
				</Col>
			</Row>
		</Container>
	);
}
