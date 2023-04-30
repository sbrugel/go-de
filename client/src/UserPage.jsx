import Navingbar from "./Navbar";
import { useEffect, useState } from "react";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import { Button } from "react-bootstrap";
import ProgressBar from 'react-bootstrap/ProgressBar';

const UserPage = ({ currentUser }) => {
  let { id } = useParams();
  const navigate = useNavigate();

  const [currUser, setCurrUser] = useState(currentUser);
  const [user, setUser] = useState({});
  const [userEvents, setUserEvents] = useState(null);

  const [feedDisplay, setFeedDisplay] = useState();
  const [followingDisplay, setFollowingDisplay] = useState();
  const [progressDisplay, setProgressDisplay] = useState();

  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    axios.get(`http://localhost:5000/users/${id}`).then((res) => {
      setUser(res.data);
    });
    axios.get(`http://localhost:5000/events/byuser/${id}`).then((res) => {
      setUserEvents(
        res.data.sort((a, b) => new Date(b.date) - new Date(a.date))
      );
    });
  }, [id]);

  useEffect(() => {
    setIsFollowing(currUser.following.includes(user.id));

    createFollowingDisplay().then((res) => {
      setFollowingDisplay(res);
    });
  }, [user]);
  useEffect(() => {
    if (!userEvents) return; // don't do anything when initially loading

    createFeed().then((res) => {
      setFeedDisplay(res);
    });

    let numLocations;
    axios.get("http://localhost:5000/locations")
      .then(async (res) => {
          numLocations = res.data.length;
          setProgressDisplay(
            <div style={{
              paddingLeft: "20px",
              paddingRight: "20px",
              paddingBottom: "20px"
            }}>
              <p>{userEvents.length} of {numLocations} locations visited.</p>
              <ProgressBar min={0} now={userEvents.length > numLocations ? numLocations : userEvents.length} max={numLocations} />
            </div>
          )
          // const userPromises = users.map(async (u) => {
          //     if((u.name.toLowerCase().includes(searchPeople.toLowerCase())||searchPeople==="")) {
          //         let visited = 0;
          //         await axios.get("http://localhost:5000/events/byuser/" + u.id)
          //         .then((res) => {
          //             visited = res.data.length;
          //         });
          //         return (
          //         <div onClick={() => navigate("/user/" + u.id)}>
          //             <Card className="profile-Card">
          //             <div style={{ padding: "20px", backgroundColor: "var(--BG-COLOR-SECONDARY)" }}>
          //                 <Image thumbnail src="https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png" />
          //                 <Card.Body className="profile-card-description">
          //                 <a href="#">{u.name}</a>
          //                 <p>{visited} of {numLocations} visited.</p>
          //                 <ProgressBar min={0} now={visited} max={numLocations} />
          //                 </Card.Body>
          //             </div>
          //             </Card>
          //         </div>
          //         );
          //     }
              
          //   });
          
      })
  }, [userEvents]);

  const createFeed = async () => {
    const feedItems = await Promise.all(
      userEvents.map(async (event) => {
        const userResponse = await axios.get(
          `http://localhost:5000/users/${event.userID}`
        );
        const locationResponse = await axios.get(
          `http://localhost:5000/locations/${event.locationID}`
        );
        const eventUser = userResponse.data.name;
        const eventLocation = locationResponse.data.name;
        return (
          <li key={event.id}>
            <strong>{eventUser}</strong> went to{" "}
            <strong>{eventLocation}</strong> on{" "}
            <u>
              {new Date(event.date).toLocaleDateString("en-us", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </u>
            {event.comments ? `: "${event.comments}"` : "."}
          </li>
        );
      })
    );
    return feedItems;
  };

  const createFollowingDisplay = async () => {
    console.log("user is ");
    console.log(user);
    const following = await Promise.all(
      user.following.map(async (u) => {
        const userResponse = await axios.get(
          `http://localhost:5000/users/${u}`
        );
        const eventUser = userResponse.data.name;
        return (
          <li key={u}>
            <a href="#" onClick={() => navigate("/user/" + u)}>
              {eventUser}
            </a>
          </li>
        );
      })
    );
    return following;
  };

  return (
    <>
      <Navingbar userID={currUser.id} />
      <Container>
        <Row>
          <Col className="col-8" style={{ textAlign: "center" }}>
            <h3 className="user-page-status">{user.name}'s Profile</h3>
            { progressDisplay }
            {currUser.id !== user.id ? (
              <Button
                variant={!isFollowing ? "success" : "secondary"}
                type="submit"
                onClick={async () => {
                  if (!isFollowing) {
                    axios
                      .post(
                        "http://localhost:5000/users/follow/" +
                          currUser.id +
                          "/" +
                          user.id
                      )
                      .then((res) => {
                        toast(res.data.message);
                      });
                  } else {
                    axios
                      .post(
                        "http://localhost:5000/users/unfollow/" +
                          currUser.id +
                          "/" +
                          user.id
                      )
                      .then((res) => {
                        toast(res.data.message);
                      });
                  }
                  setIsFollowing(!isFollowing);
                }}
              >
                {!isFollowing ? "Follow" : "Unfollow"}
              </Button>
            ) : (
              ""
            )}
            <hr />
            <p className="user-activities">
              <strong>{user.name}'s Recent Activity</strong>
            </p>
            <ul>{feedDisplay}</ul>
          </Col>
          <Col className="col-4">
            <div className="user-followers">
              <h1>Following</h1>
              <ul>{followingDisplay}</ul>
            </div>
          </Col>
        </Row>
      </Container>
      <ToastContainer />
    </>
  );
};

export default UserPage;
