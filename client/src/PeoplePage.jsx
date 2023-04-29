import Navingbar from "./Navbar";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Card } from "react-bootstrap";
import {Image }from "react-bootstrap";
const PeoplePage = ({ currentUser }) => {
    const navigate = useNavigate();

    const [users, setUsers] = useState([]);

    const [usersList, setUsersList] = useState(null);

    useEffect(() => {
        axios.get("http://localhost:5000/users")
            .then((res) => {
                setUsers(res.data);
            })
    }, [])

    useEffect(() => {
        if (!users) return;
        
        const ulUsers = users.map((u) => {
            return <div>
                <Card className="profile-Card">
                    <div style={{padding:"20px", backgroundColor:"var(--BG-COLOR-SECONDARY)"}}>
                <Image thumbnail src="http://clipart-library.com/images_k/man-profile-silhouette/man-profile-silhouette-8.png"  />
                    <Card.Body className="profile-card-description">
                    
                <a href="#" onClick={() => navigate("/user/" + u.id)}>{ u.name }</a>
                    </Card.Body>
                    </div>
                </Card>
            </div>
        })
        setUsersList(ulUsers);
    }, [users])

    return (
        <>
            <Navingbar userID={currentUser.id} />
            <h1>Registered Users</h1>
            <ul>
                <div className="people-grid">
                { usersList }
                </div>
            </ul>
        </>
    )
}

export default PeoplePage;