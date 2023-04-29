import Navingbar from './Navbar';
import { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";

const UserPage = () => {
    let { id } = useParams();
    const navigate = useNavigate();

    const [user, setUser] = useState({});
    const [userEvents, setUserEvents] = useState(null);

    const [feedDisplay, setFeedDisplay] = useState();

    useEffect(() => {
        axios.get(`http://localhost:5000/users/${id}`).then((res) => {
            setUser(res.data);
        });
        axios.get(`http://localhost:5000/events/byuser/${id}`).then((res) => {
            setUserEvents(res.data);
        });
    }, [id])

    useEffect(() => {
        if (!userEvents) return; // don't worry about this on start

        createFeed().then((res) => {
            setFeedDisplay(res);
            console.log(feedDisplay);
        })
    }, [userEvents])

    const createFeed = async () => {
        const feedItems = await Promise.all(userEvents.map(async (event) => {
            console.log('the event user ID is ' + event.userID);
            console.log('the event location ID is ' + event.locationID);
          const userResponse = await axios.get(`http://localhost:5000/users/${event.userID}`);
          const locationResponse = await axios.get(`http://localhost:5000/locations/${event.locationID}`);
          const eventUser = userResponse.data.name;
          const eventLocation = locationResponse.data.name;
          console.log(eventLocation + " is location");
          console.log(eventUser + " is the user");
          return (
            <li key={event.id}>
              {eventUser} went to {eventLocation}: "{event.comments}"
            </li>
          );
        }));
        return feedItems;
      };

    return (
        <>
            <Navingbar userID={ id } />
            <p>This is the user page of { user.name }</p>
            <hr />
            <p><strong>{ user.name }'s Feed</strong></p>
            <ul>
                { feedDisplay }
            </ul>
            <button type="submit" onClick={ () => navigate("/user/4") }>test to another apge</button>
        </>
    )
}

export default UserPage;
