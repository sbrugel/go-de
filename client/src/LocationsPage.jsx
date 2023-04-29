import Navingbar from "./Navbar";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { LocationCard } from "./LocationCard";

const LocationsPage = ({ currentUser }) => {
    const [locations, setLocations] = useState(null);

    const [cardDisplay, setCardDisplay] = useState(<p>Loading...</p>);

    useEffect(() => {
		axios.get("http://localhost:5000/locations")
			.then((res) => {
				setLocations(res.data);
			})
	}, []);

    useEffect(() => {
        if (!locations) return;

        const display = locations.map((loc) => {
            return <LocationCard id={loc.id} />
        })

        setCardDisplay(display);
    }, [locations])

    return (
        <>
            <Navingbar userID={currentUser.id} />
            <h1>Locations</h1>
            { cardDisplay }
        </>
    )
}

export default LocationsPage;