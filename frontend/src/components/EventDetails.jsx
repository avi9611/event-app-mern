import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import EventAttendees from "./EventAttendees";

const API_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:5002"
    : "https://event-app-mern-back-flame.vercel.app";

const EventDetails = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [error, setError] = useState("");
  const currentUser = JSON.parse(localStorage.getItem("user"));

  const isEventOwner =
    event && currentUser && event.owner._id === currentUser._id;

  const handleDeleteEvent = async () => {
    try {
      const response = await fetch(`${API_URL}/api/events/${eventId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        credentials: "include",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delete the event.");
      }

      navigate("/");
    } catch (error) {
      console.error("Error deleting event:", error.message);
      setError(error.message);
    }
  };

  const handleSaveEvent = async (updatedEvent) => {
    try {
      const response = await fetch(`${API_URL}/api/events/${eventId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        credentials: "include",
        body: JSON.stringify(updatedEvent),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update the event.");
      }

      const data = await response.json();
      setEvent(data.event);
      setIsEditing(false);
      setError("");
    } catch (error) {
      console.error("Error updating event:", error.message);
      setError(error.message);
    }
  };

  const [isJoined, setIsJoined] = useState(false);

  const handleJoinEvent = async () => {
    try {
      const response = await fetch(`${API_URL}/api/events/${eventId}/join`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        credentials: "include",
      });

      if (!response.ok) {
        const errorData = await response.json();
        if (response.status === 400) {
          setError(errorData.message);
        } else {
          throw new Error(errorData.message || "Failed to join the event.");
        }
        return;
      }

      const data = await response.json();
      setIsJoined(true);
      setError("");
      await fetchEventDetails();
      alert("Successfully joined the event!");
    } catch (error) {
      console.error("Error joining event:", error.message);
      setError(error.message);
    }
  };

  const fetchEventDetails = async () => {
    try {
      if (!eventId) {
        throw new Error("Event ID is missing.");
      }

      const response = await fetch(`${API_URL}/api/events/${eventId}`, {
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch event details.");
      }

      const data = await response.json();
      setEvent(data);
    } catch (error) {
      console.error("Error fetching event details:", error.message);
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchEventDetails();
  }, [eventId]);

  if (error) {
    return <div className="text-red-500 text-center p-4">Error: {error}</div>;
  }

  if (!event) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-40">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">{event.name}</h1>
        <p className="text-gray-600 mt-2">{event.description}</p>
      </div>

      {isEventOwner && (
        <div className="flex justify-end space-x-4 mb-6">
          <button
            onClick={handleDeleteEvent}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300"
          >
            Delete Event
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-50 p-4 rounded-lg">
          <h2 className="text-lg font-semibold text-gray-700">Date & Time</h2>
          <p className="text-gray-600 mt-2">
            📅 {new Date(event.date).toLocaleDateString()} | 🕒 {event.time}
          </p>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <h2 className="text-lg font-semibold text-gray-700">
            Category & Status
          </h2>
          <p className="text-gray-600 mt-2">
            🏷️ {event.category} |{" "}
            {event.status === "upcoming" ? (
              <span className="text-green-500">Upcoming</span>
            ) : (
              <span className="text-gray-500">Past</span>
            )}
          </p>
        </div>
      </div>

      <div className="mt-8 text-center">
        <button
          onClick={handleJoinEvent}
          className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Join Event
        </button>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Attendees</h2>
        <EventAttendees eventId={eventId} />
      </div>
    </div>
  );
};

export default EventDetails;
