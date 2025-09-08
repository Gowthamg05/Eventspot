import { useEffect, useState } from "react";
import axios from "axios";

const MyEvents = ({ user }) => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios.get(`https://eventspot-2.onrender.com/facultyRoute/Event/${user.email}`)
      .then((res) => setEvents(res.data))
      .catch(() => console.log("Error loading events"));
  }, [user.email]);

  return (
  <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
    <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 text-gray-800">📅 My Events</h2>

    <div className="space-y-4">
      {events.length > 0 ? (
        events.map((event) => (
          <div
            key={event._id}
            className="bg-white shadow-md rounded-lg p-4 sm:p-6 border border-gray-200 hover:shadow-lg transition"
          >
            <h3 className="text-lg sm:text-xl font-semibold text-gray-800">{event.title}</h3>
            <p className="text-sm sm:text-base text-gray-600 mt-1">
              Date: {new Date(event.date).toLocaleDateString()}
            </p>
            <p className="text-sm sm:text-base text-gray-600 mt-1">
              Status: <span className={event.status === 'Completed' ? 'text-green-600' : 'text-red-600'}>{event.status}</span>
            </p>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500">No events found.</p>
      )}
    </div>
  </div>
);

};

export default MyEvents;
