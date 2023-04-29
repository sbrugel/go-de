import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ProgressBar from 'react-bootstrap/ProgressBar';
import './App.css';

export const ProgressHeader = ({ current, max }) => {
	return (
		<Container className='go-progress-header go-card'>
			<Row>
				<Col>
					<h3 className='text-center'>You have visited {current} locations. Ready to go somewhere new?</h3>
					<ProgressBar min={0} now={current} visuallyHidden label={`${current} out of ${max}`} max={max} />
				</Col>
			</Row>
		</Container>
	);
}
