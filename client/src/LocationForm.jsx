import Navingbar from "./Navbar";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const LocationForm = ({ currentUser }) => {
    let { id } = useParams();
    const [location, setLocation] = useState(null);

    const [name, setName] = useState('');

    useEffect(() => {
        axios.get("http://localhost:5000/locations/" + id)
            .then((res) => {
                setName(res.data.name);
            })
    }, [])
    return (
        <>
            <Navingbar userID={currentUser.id} />
            <h1>So you've visited { name }...</h1>
            <p>When did you visit?</p>
            <p>Any remarks about your visit?</p>
        </>
    )
}

export default LocationForm;