import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ProgressBar from 'react-bootstrap/ProgressBar';
import './App.css';

export function ProgressHeader(props) {
	return (
		<Container className='go-progress-header go-card'>
			<Row>
				<Col>
					<h3 className='text-center'>You have visited {props.current} locations. Ready to go somewhere new?</h3>
					<ProgressBar min={0} now={props.current} visuallyHidden label={`${props.current} out of ${props.max}`} max={props.max} />
				</Col>
			</Row>
		</Container>
	);
}
