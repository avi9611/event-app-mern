import { useState } from 'react';

const API_URL = import.meta.env.MODE === "development" 
  ? "http://localhost:5002" 
  : "https://event-app-mern-back.vercel.app/";

const EventActions = ({ eventId }) => {
  const [isAttending, setIsAttending] = useState(false);

  const handleJoin = async () => {
    try {
      const response = await fetch(`${API_URL}/api/events/${eventId}/join`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });

      if (!response.ok) {
        throw new Error('Failed to join the event.');
      }

      const data = await response.json();
      console.log(data.message); 
      setIsAttending(true);
    } catch (error) {
      console.error('Error joining event:', error.message);
    }
  };


  return (
    <div>
      { (
        <button onClick={handleJoin}>Join Event</button>
      )}
    </div>
  );
};

export default EventActions;