import Navingbar from "./Navbar";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { LocationCard } from "./LocationCard";
import { Calendar } from 'react-calendar';
import "react-calendar/dist/Calendar.css";
import Button from 'react-bootstrap/Button';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
            <LocationCard key={locationId} id={locationId} showButton={false} />
            <hr />
            <h2>When did you visit?</h2>
            <div style={{
                display: "flex",
                justifyContent: "center"
            }}>
                <Calendar
                    onChange={(value) => {
                        setDate(value.toLocaleDateString('en-us', { year: 'numeric', month: 'long', day: 'numeric' }));
                    }}
                    maxDate={new Date()}
                />
            </div>
            <h2>Any remarks about your visit?</h2>
            <div style={{
                display: "flex",
                justifyContent: "center"
            }}>
                <textarea 
                    onChange={handleTextChange}
                    rows={10}
                    cols={50}
                />
                
            </div>
            <div style={{
                display: "flex",
                justifyContent: "center"
            }}>
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
            </div>
            <ToastContainer />
        </>
    )
}

export default LocationForm;