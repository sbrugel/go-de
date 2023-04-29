import Navingbar from "./Navbar";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
            return <li>
                <a href="#" onClick={() => navigate("/user/" + u.id)}>{ u.name }</a>
            </li>
        })
        setUsersList(ulUsers);
    }, [users])

    return (
        <>
            <Navingbar userID={currentUser.id} />
            <h1>Registered Users</h1>
            <ul>
                { usersList }
            </ul>
        </>
    )
}

export default PeoplePage;