import Navingbar from "./Navbar";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Card , Form} from "react-bootstrap";
import {Image }from "react-bootstrap";
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
    function determineSearch({u}){
        console.log("rerender");
        if(u.name !== undefined){
        if(u.name.toLowerCase().includes(searchPeople.toLowerCase)||searchPeople==="" ||searchPeople.toLowerCase().includes(u.name.toLowerCase()) ){
            return true;
        } 
        }
        return false;
    }
    useEffect(() => {
        if (!users) return;
        const ulUsers = users.map((u) => {
            if((u.name.toLowerCase().includes(searchPeople.toLowerCase())||searchPeople==="" ||searchPeople.toLowerCase().includes(u.name.toLowerCase()) )){
            return <div onClick={() => navigate("/user/" + u.id)}>
                <Card className="profile-Card">
               
                    <div style={{padding:"20px", backgroundColor:"var(--BG-COLOR-SECONDARY)"}}>
                <Image thumbnail src="https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png"  />
                    <Card.Body className="profile-card-description">
                    
                <a>{ u.name }</a>
                    </Card.Body>
                    </div>
                </Card>
            </div>
            }
        })
        setUsersList(ulUsers);
    }, [users,searchPeople])

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
                    onChange={({target}) => setSearchPeople(target.value)}
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