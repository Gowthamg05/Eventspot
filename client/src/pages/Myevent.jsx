import { useEffect, useState } from "react";
import axios from "axios";

const MyEvents = ({ user }) => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:3001/facultyRoute/Event/${user.email}`)
      .then((res) => setEvents(res.data))
      .catch(() => console.log("Error loading events"));
  }, [user.email]);

  return (
    <div>
      <h2>My Events</h2>
      {events.map((event) => (
        <div key={event._id} className="border p-2 mb-2">
          <h3>{event.title}</h3>
          <p>{event.date}</p>
          <p>Status: {event.status}</p>
        </div>
      ))}
    </div>
  );
};

export default MyEvents;
