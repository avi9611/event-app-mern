import { useState } from 'react';

const EventActions = ({ eventId }) => {
  const [isAttending, setIsAttending] = useState(false);

  const handleJoin = async () => {
    try {
      const response = await fetch(`http://localhost:5002/api/events/${eventId}/join`, {
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