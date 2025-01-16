import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:5002");

const EventAttendees = ({ eventId }) => {
  const [attendees, setAttendees] = useState([]);

  useEffect(() => {
    const fetchAttendees = async () => {
      try {
        const response = await fetch(
          `http://localhost:5002/api/events/${eventId}/attendees`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            credentials: "include",
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch attendees.");
        }

        const data = await response.json();
        setAttendees(data);
      } catch (error) {
        console.error("Error fetching attendees:", error.message);
      }
    };

    fetchAttendees();

    socket.on("attendeeUpdate", (data) => {
      if (data.eventId === eventId) {
        setAttendees(data.attendees);
      }
    });

    return () => {
      socket.off("attendeeUpdate");
    };
  }, [eventId]);

  return (
    <div>
      <h3>Attendees ({attendees.length})</h3>
      <ul>
        {attendees.map((attendee) => (
          <li key={attendee._id}>
            <img src={attendee.profilePic} width="50" height="50" />
            <span>{attendee.fullName}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventAttendees;
