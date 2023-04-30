import Navingbar from "./Navbar";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { LocationCard } from "./LocationCard";
import { Calendar } from 'react-calendar';
import "react-calendar/dist/Calendar.css";
import Button from 'react-bootstrap/Button';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const LocationForm = ({ currentUser }) => {
    let { id } = useParams();
    const navigate = useNavigate();
    const [location, setLocation] = useState(null);

    const [name, setName] = useState('');
    const [locationId, setLocationId] = useState(0);

    const [date, setDate] = useState(null);
    const [comments, setComments] = useState('');

    useEffect(() => {
        axios.get("http://localhost:5000/locations/" + id)
            .then((res) => {
                setLocation(res.data);
            })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if (!location) return;
        setName(location.name);
        setLocationId(location.id);
    }, [location])

    const handleTextChange = (e) => {
        setComments(e.target.value);
    }

    return (
        <>
            <Navingbar userID={currentUser.id} />
            <h1>So you've visited { name }...</h1>
            <LocationCard key={locationId} id={locationId} currentUser={currentUser} showButton={false} />
			<Container className='go-submit-form-wrapper go-card go-card-form'>
				<Row>
					<Col className="col-5">
						<h4>When did you visit?</h4>
						<div className='go-submit-form-center-wrapper'>
							<Calendar
								onChange={(value) => {
									setDate(value.toLocaleDateString('en-us', { year: 'numeric', month: 'long', day: 'numeric' }));
								}}
								maxDate={new Date()}
							/>
						</div>
					</Col>
					<Col className="col-7">
						<h4>Any remarks about your visit?</h4>
						<Form>
							<Form.Group>
								<Form.Control
									as='textarea' 
									onChange={handleTextChange}
									rows={9}
								/>
							</Form.Group>
							<Form.Group className="go-submit-form-center-wrapper">
								<Button onClick={() => {
									const postEvent = {
										userID: currentUser.id,
										locationID: locationId,
										date,
										comments
									}
									axios.post("http://localhost:5000/newevent", postEvent)
										.then(() => {
											navigate("/user/" + currentUser.id);
										})
								}}>Submit!</Button>
							</Form.Group>
						</Form>
					</Col>
				</Row>
			</Container>
            <ToastContainer />
        </>
    )
}

export default LocationForm;
