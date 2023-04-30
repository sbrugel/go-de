import Navingbar from "./Navbar";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Card , Form} from "react-bootstrap";
import {Image }from "react-bootstrap";
import ProgressBar from 'react-bootstrap/ProgressBar';

const PeoplePage = ({ currentUser }) => {
    const navigate = useNavigate();

    const [users, setUsers] = useState([]);
    const [searchPeople, setSearchPeople]=useState("");
    const [usersList, setUsersList] = useState(null);

    useEffect(() => {
        axios.get("http://localhost:5000/users")
            .then((res) => {
                setUsers(res.data);
            })
    }, [])
    
    const updateSearchPeople = (e) => {
        setSearchPeople(e.target.value);
    }
    useEffect(() => {
        if (!users) return;

        let numLocations;
        axios.get("http://localhost:5000/locations")
            .then(async (res) => {
                numLocations = res.data.length;
                const userPromises = users.map(async (u) => {
                    if((u.name.toLowerCase().includes(searchPeople.toLowerCase())||searchPeople==="")) {
                        let visited = 0;
                        await axios.get("http://localhost:5000/events/byuser/" + u.id)
                        .then((res) => {
                            visited = res.data.length;
                        });
                        return (
                        <div onClick={() => navigate("/user/" + u.id)}>
                            <Card className="profile-Card">
                            <div style={{ padding: "20px", backgroundColor: "var(--BG-COLOR-SECONDARY)" }}>
                                <Image thumbnail src="https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png" />
                                <Card.Body className="profile-card-description">
                                <a href="#">{u.name}</a>
                                <p>{visited} of {numLocations} visited.</p>
                                <ProgressBar min={0} now={visited} max={numLocations} />
                                </Card.Body>
                            </div>
                            </Card>
                        </div>
                        );
                    }
                    
                  });
                
                  const resolvedUsers = await Promise.all(userPromises);
                  setUsersList(resolvedUsers);
                
            })
        
        
    }, [users, searchPeople])

    return (
        <div>
            <Navingbar userID={currentUser.id} />
            <h1>Registered Users</h1>
            <div className="searchbar-container">
            <Form.Control
                    className="searchbar"
                    type="text"
                    placeholder="Search..."
                    value={searchPeople}
                    onChange={updateSearchPeople}
                ></Form.Control>
                </div>
            <ul>
                <div className="people-grid">
                { usersList }
                </div>
            </ul>
        </div>
    )
}

export default PeoplePage;